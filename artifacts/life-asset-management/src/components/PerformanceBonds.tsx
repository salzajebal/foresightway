import { useEffect, useState } from 'react';
import type { PerformanceBonds as PerformanceBondsData } from '@workspace/api-client-react';
import './PerformanceBonds.css';

function isPerformanceBondsData(value: unknown): value is PerformanceBondsData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<PerformanceBondsData>;
  return Array.isArray(data.holdings)
    && data.holdings.length === 10
    && data.holdings.every((holding) => (
      !!holding
      && typeof holding.bondName === 'string'
      && holding.bondName.trim().length > 0
      && typeof holding.duration === 'number'
      && Number.isFinite(holding.duration)
      && typeof holding.weight === 'number'
      && Number.isFinite(holding.weight)
    ))
    && typeof data.updatedAt === 'string';
}

export function PerformanceBonds() {
  const baseUrl = import.meta.env.BASE_URL;
  const [performance, setPerformance] = useState<PerformanceBondsData | null>(null);
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

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadPerformance() {
      try {
        const response = await fetch('/api/performance-bonds');
        if (!response.ok) throw new Error('bond holdings request failed');
        const data: unknown = await response.json();
        if (!isPerformanceBondsData(data)) throw new Error('invalid bond holdings response');
        if (!cancelled) setPerformance(data);
      } catch {
        if (!cancelled) setError('채권 보유 현황을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadPerformance();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="performance-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">PERFORMANCE</p>
          <h1>채권</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>운용성과</span>
            <span>/</span>
            <strong>채권</strong>
          </nav>
        </div>
      </section>

      <section className="performance-intro reveal-on-scroll">
        <div className="performance-inner">
          <p className="performance-eyebrow">PERFORMANCE</p>
          <h2><strong>채권</strong> 투자내역</h2>
          <div className="performance-intro-copy">
            <p>채권 & 메자닌 투자 내역입니다.</p>
          </div>
        </div>
      </section>

      <section className="performance-section reveal-on-scroll" aria-labelledby="pbonds-overview-heading">
        <div className="performance-inner">
          <header className="performance-header">
            <div>
              <p>PORTFOLIO OVERVIEW</p>
              <h2 id="pbonds-overview-heading">채권 보유 현황</h2>
              <span className="performance-header-desc">기준일 현재 채권 보유 현황을 종목별로 확인하실 수 있습니다.</span>
            </div>
          </header>

          {isLoading && <p className="performance-status" role="status">채권 보유 현황을 불러오는 중입니다.</p>}
          {!isLoading && error && <p className="performance-status performance-status-error" role="alert">{error}</p>}
          {!isLoading && !error && performance && (
            <>
              <div className="performance-table-wrap">
                <table className="performance-table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60%' }}>종목명</th>
                      <th scope="col">듀레이션</th>
                      <th scope="col" className="perf-text-right">비중(%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.holdings.map((holding, index) => (
                      <tr key={`${holding.bondName}-${index}`}>
                        <th scope="row"><span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>{holding.bondName}</th>
                        <td>{holding.duration}</td>
                        <td className="perf-text-right"><strong className="perf-value-positive">{holding.weight.toFixed(2)}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="performance-mobile-cards">
                {performance.holdings.map((holding, index) => (
                  <article className="performance-mobile-card" key={`${holding.bondName}-card-${index}`}>
                    <div className="performance-card-header">
                      <span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{holding.bondName}</h3>
                    </div>
                    <dl className="performance-card-dl">
                      <div><dt>듀레이션</dt><dd>{holding.duration}</dd></div>
                      <div><dt>비중(%)</dt><dd><strong className="perf-value-positive">{holding.weight.toFixed(2)}</strong></dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}