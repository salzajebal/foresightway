import { useEffect, useState } from 'react';
import type { PerformanceAi as PerformanceAiData } from '@workspace/api-client-react';
import './PerformanceAi.css';

const getReturnClass = (value: number) => {
  if (value > 0) return 'perf-value-positive';
  if (value < 0) return 'perf-value-negative';
  return 'perf-value-neutral';
};

function isPerformanceAiData(value: unknown): value is PerformanceAiData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<PerformanceAiData>;
  return Array.isArray(data.months)
    && data.months.length === 12
    && data.months.every((month) => (
      !!month
      && typeof month.month === 'string'
      && month.month.length > 0
      && typeof month.return === 'number'
      && Number.isFinite(month.return)
       && month.return >= -1000
       && month.return <= 1000
    ))
     && Array.isArray(data.recentTrades)
     && data.recentTrades.length === 5
     && data.recentTrades.every((trade) => (
       !!trade
       && typeof trade.stockName === 'string'
       && trade.stockName.length > 0
       && typeof trade.tradeDetail === 'string'
       && trade.tradeDetail.length > 0
       && typeof trade.return === 'number'
       && Number.isFinite(trade.return)
       && trade.return >= -1000
       && trade.return <= 1000
     ))
    && typeof data.annualAverageReturn === 'number'
    && Number.isFinite(data.annualAverageReturn)
     && data.annualAverageReturn >= -1000
     && data.annualAverageReturn <= 1000
    && typeof data.annualAverageStockCount === 'number'
    && Number.isInteger(data.annualAverageStockCount)
    && data.annualAverageStockCount > 0
    && typeof data.annualWinRate === 'number'
     && Number.isFinite(data.annualWinRate)
     && data.annualWinRate >= 0
     && data.annualWinRate <= 100;
}

export function PerformanceAi() {
  const baseUrl = import.meta.env.BASE_URL;
  const [performance, setPerformance] = useState<PerformanceAiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadPerformance() {
      try {
        const response = await fetch('/api/performance-ai');
        if (!response.ok) throw new Error('performance request failed');
        const data: unknown = await response.json();
        if (!isPerformanceAiData(data)) throw new Error('invalid performance response');
        if (!cancelled) setPerformance(data);
      } catch {
        if (!cancelled) setError('운용성과를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadPerformance();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="performance-page performance-ai-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">PERFORMANCE</p>
          <h1>AI 매매</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>운용성과</span>
            <span>/</span>
            <strong>AI 매매</strong>
          </nav>
        </div>
      </section>

      <section className="performance-intro reveal-on-scroll">
        <div className="performance-inner">
          <p className="performance-eyebrow">PERFORMANCE</p>
          <h2>
            <strong>AI TRADING</strong> 운용성과
          </h2>
          <div className="performance-intro-copy">
            <p>
              알고리즘과 정량 분석 원칙 아래 일궈낸 AI 트레이딩 운용성과 입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="performance-section reveal-on-scroll" aria-labelledby="pai-monthly-heading">
        <div className="performance-inner">
          <header className="performance-header">
            <div>
              <p>AI TRADING</p>
              <h2 id="pai-monthly-heading">월별 성과</h2>
            </div>
            <span className="performance-badge">최근 12개월</span>
          </header>

          {isLoading && <p className="performance-status" role="status">운용성과를 불러오는 중입니다.</p>}
          {!isLoading && error && <p className="performance-status performance-status-error" role="alert">{error}</p>}
          {!isLoading && !error && performance && (
            <>
              <div className="perf-ai-monthly-grid">
                {performance.months.map((item) => (
                  <article
                    className="perf-ai-month-card"
                    key={item.month}
                  >
                    <span className="perf-ai-month-label">{item.month}</span>
                    <strong className={getReturnClass(item.return)}>
                      {item.return >= 0 ? '+' : ''}{item.return.toFixed(1)}%
                    </strong>
                    <span className="perf-ai-month-caption">월간 수익률</span>
                  </article>
                ))}
              </div>
              <dl className="perf-ai-summary">
                <div>
                  <dt>연평균 수익률</dt>
                  <dd className={getReturnClass(performance.annualAverageReturn)}>
                    {performance.annualAverageReturn >= 0 ? '+' : ''}{performance.annualAverageReturn.toFixed(1)}%
                  </dd>
                </div>
                <div>
                  <dt>평균 종목 수</dt>
                  <dd>{performance.annualAverageStockCount.toLocaleString('ko-KR')}개</dd>
                </div>
                <div>
                  <dt>연간 승률</dt>
                  <dd>{performance.annualWinRate.toFixed(0)}%</dd>
                </div>
              </dl>
            </>
          )}
        </div>
      </section>

      {!isLoading && !error && performance && (
        <section className="performance-section" aria-labelledby="pai-trades-heading">
          <div className="performance-inner">
            <header className="performance-header">
              <div>
                <p>AI TRADING</p>
                <h2 id="pai-trades-heading">최근 매매 기록</h2>
                <span className="performance-header-desc">실제 매도가 완료된 최근 거래 내역입니다.</span>
              </div>
            </header>
            <div className="perf-ai-trades-list">
              {performance.recentTrades.map((trade, index) => (
                <article className="perf-ai-trade-row" key={`${trade.stockName}-${index}`}>
                  <span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="perf-ai-trade-info">
                    <h3>{trade.stockName}</h3>
                    <p>{trade.tradeDetail}</p>
                  </div>
                  <strong className={`perf-ai-trade-return ${getReturnClass(trade.return)}`}>
                    {trade.return >= 0 ? '+' : ''}{trade.return.toFixed(1)}%
                  </strong>
                </article>
              ))}
            </div>
            <aside className="performance-callout">
              <div>
                <h3>AI 트레이딩 운용 성과입니다.</h3>
                <p>알고리즘 전략의 주요 매매 및 운용 사례를 확인하실 수 있습니다.</p>
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}
