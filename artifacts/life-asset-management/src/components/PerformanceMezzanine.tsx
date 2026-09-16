import { useEffect, useState } from 'react';
import { getPerformanceMezzanine, type PerformanceMezzanine as PerformanceMezzanineData } from '@workspace/api-client-react';
import './PerformanceMezzanine.css';

function isPerformanceMezzanineData(value: unknown): value is PerformanceMezzanineData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<PerformanceMezzanineData>;
  return Array.isArray(data.holdings)
    && data.holdings.length === 5
    && data.holdings.every((holding) => (
      !!holding
      && typeof holding.company === 'string'
      && holding.company.trim().length > 0
      && typeof holding.type === 'string'
      && holding.type.trim().length > 0
      && typeof holding.investmentPeriod === 'string'
      && holding.investmentPeriod.trim().length > 0
      && typeof holding.exitPeriod === 'string'
      && holding.exitPeriod.trim().length > 0
      && typeof holding.returnRate === 'string'
      && holding.returnRate.trim().length > 0
    ))
    && typeof data.updatedAt === 'string';
}

export function PerformanceMezzanine() {
  const baseUrl = import.meta.env.BASE_URL;
  const [performance, setPerformance] = useState<PerformanceMezzanineData | null>(null);
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadPerformance() {
      try {
        const data: unknown = await getPerformanceMezzanine();
        if (!isPerformanceMezzanineData(data)) throw new Error('invalid mezzanine performance response');
        if (!cancelled) setPerformance(data);
      } catch {
        if (!cancelled) setError('메자닌 투자 및 보유 현황을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
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
          <h1>메자닌</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>운용성과</span>
            <span>/</span>
            <strong>메자닌</strong>
          </nav>
        </div>
      </section>

      <section className="performance-intro reveal-on-scroll">
        <div className="performance-inner">
          <p className="performance-eyebrow">PERFORMANCE</p>
          <h2>메자닌 투자 및 보유 현황</h2>
          <div className="performance-intro-copy">
            <p>메자닌 투자 및 보유 현황을 종목별로 확인하실 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="performance-section reveal-on-scroll" aria-labelledby="pmezz-overview-heading">
        <div className="performance-inner">
          <header className="performance-header">
            <div>
              <p>MEZZANINE INVESTMENT</p>
              <h2 id="pmezz-overview-heading">메자닌 투자 및 보유 현황</h2>
            </div>
          </header>

          {isLoading && <p className="performance-status" role="status">메자닌 투자 및 보유 현황을 불러오는 중입니다.</p>}
          {!isLoading && error && <p className="performance-status performance-status-error" role="alert">{error}</p>}
          {!isLoading && !error && performance && (
            <>
              <div className="performance-table-wrap">
                <table className="performance-table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '25%' }}>종목명</th>
                      <th scope="col" style={{ width: '15%' }}>구분</th>
                      <th scope="col" style={{ width: '20%' }}>투자시기</th>
                      <th scope="col" style={{ width: '20%' }}>회수시기</th>
                      <th scope="col" style={{ width: '20%' }} className="perf-text-right">수익률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.holdings.map((holding, index) => {
                      const isHeld = holding.exitPeriod === '보유중' || holding.returnRate === '보유중';
                      return (
                        <tr key={`${holding.company}-${index}`}>
                          <th scope="row"><span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>{holding.company}</th>
                          <td>{holding.type}</td>
                          <td>{holding.investmentPeriod}</td>
                          <td className={holding.exitPeriod === '보유중' ? 'perf-value-neutral' : undefined}>{holding.exitPeriod}</td>
                          <td className="perf-text-right">
                            <strong className={isHeld ? 'perf-value-neutral' : 'perf-value-positive'}>{holding.returnRate}</strong>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="performance-mobile-cards">
                {performance.holdings.map((holding, index) => {
                  const isHeld = holding.exitPeriod === '보유중' || holding.returnRate === '보유중';
                  return (
                    <article className="performance-mobile-card" key={`${holding.company}-card-${index}`}>
                      <div className="performance-card-header">
                        <span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>
                        <h3>{holding.company}</h3>
                      </div>
                      <dl className="performance-card-dl">
                        <div><dt>구분</dt><dd>{holding.type}</dd></div>
                        <div><dt>투자시기</dt><dd>{holding.investmentPeriod}</dd></div>
                        <div><dt>회수시기</dt><dd className={holding.exitPeriod === '보유중' ? 'perf-value-neutral' : undefined}>{holding.exitPeriod}</dd></div>
                        <div>
                          <dt>수익률</dt>
                          <dd className={isHeld ? 'perf-value-neutral' : 'perf-value-positive'}>
                            <strong>{holding.returnRate}</strong>
                          </dd>
                        </div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}