import { useEffect, useState, useMemo } from 'react';
import type { PerformanceIpo as PerformanceIpoData } from '@workspace/api-client-react';
import './PerformanceIpo.css';

const IPO_IMAGE_URL_PATTERN = /^\/api\/ipo-images\/[a-f0-9-]+\.(jpg|png|webp)$/;

function CompanyLogo({ imageUrl, stockName }: { imageUrl?: string; stockName: string }) {
  const [isAvailable, setIsAvailable] = useState(
    typeof imageUrl === 'string' && IPO_IMAGE_URL_PATTERN.test(imageUrl),
  );

  useEffect(() => {
    setIsAvailable(typeof imageUrl === 'string' && IPO_IMAGE_URL_PATTERN.test(imageUrl));
  }, [imageUrl]);

  if (!isAvailable || !imageUrl) {
    return (
      <span className="perf-ipo-marker" aria-hidden="true">
        {stockName.substring(0, 1)}
      </span>
    );
  }

  return (
    <img
      className="perf-ipo-company-image"
      src={`${imageUrl}?v=2`}
      alt={`${stockName} 로고`}
      onError={() => setIsAvailable(false)}
    />
  );
}

function isPerformanceIpoData(value: unknown): value is PerformanceIpoData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<PerformanceIpoData>;
  return Array.isArray(data.investments)
    && data.investments.length === 13
    && data.investments.every((investment) => (
      !!investment
      && typeof investment.stockName === 'string'
      && investment.stockName.trim().length > 0
      && typeof investment.purchasePrice === 'string'
      && investment.purchasePrice.trim().length > 0
      && typeof investment.purchasePeriod === 'string'
      && investment.purchasePeriod.trim().length > 0
      && typeof investment.listingDate === 'string'
      && investment.listingDate.trim().length > 0
      && typeof investment.return === 'number'
      && Number.isFinite(investment.return)
      && (
        investment.imageUrl === undefined
        || (typeof investment.imageUrl === 'string' && IPO_IMAGE_URL_PATTERN.test(investment.imageUrl))
      )
    ))
    && typeof data.updatedAt === 'string';
}

export function PerformanceIpo() {
  const baseUrl = import.meta.env.BASE_URL;
  const [performance, setPerformance] = useState<PerformanceIpoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const groupedInvestments = useMemo(() => {
    if (!performance) return {};
    const groups: Record<string, typeof performance.investments> = {};
    
    performance.investments.forEach((inv) => {
      const yearMatch = inv.listingDate.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : '기타';
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(inv);
    });
    
    return groups;
  }, [performance]);

  const sortedYears = useMemo(() => {
    return Object.keys(groupedInvestments).sort((a, b) => {
      if (a === '기타') return 1;
      if (b === '기타') return -1;
      return a.localeCompare(b);
    });
  }, [groupedInvestments]);

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
        const response = await fetch('/api/performance-ipo');
        if (!response.ok) throw new Error('performance request failed');
        const data: unknown = await response.json();
        if (!isPerformanceIpoData(data)) throw new Error('invalid performance response');
        if (!cancelled) setPerformance(data);
      } catch {
        if (!cancelled) setError('IPO 투자 내역을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadPerformance();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="performance-page performance-ipo-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">PERFORMANCE</p>
          <h1>IPO</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>운용성과</span>
            <span>/</span>
            <strong>IPO</strong>
          </nav>
        </div>
      </section>

      <section className="performance-intro reveal-on-scroll">
        <div className="performance-inner">
          <p className="performance-eyebrow">PERFORMANCE</p>
          <h2><strong>IPO</strong> 투자내역</h2>
          <div className="performance-intro-copy">
            <p>투자조합 결성을 통해 성공적으로 이끌어낸 주요 IPO 투자 내역을 공개합니다.</p>
          </div>
        </div>
      </section>

      <section className="performance-section reveal-on-scroll" aria-labelledby="pipo-overview-heading">
        <div className="performance-inner">
          <header className="performance-header">
            <div>
              <p>IPO INVESTMENT</p>
              <h2 id="pipo-overview-heading">주요 IPO 투자 성과</h2>
              <span className="performance-header-desc">공모주 투자 이후 상장일까지의 주요 운용 사례입니다.</span>
            </div>
          </header>

          {isLoading && <p className="performance-status" role="status">IPO 투자 내역을 불러오는 중입니다.</p>}
          {!isLoading && error && <p className="performance-status performance-status-error" role="alert">{error}</p>}
          {!isLoading && !error && performance && (
            <>
              <div className="performance-table-wrap">
                <table className="performance-table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '25%' }}>투자종목</th>
                      <th scope="col">매수가격</th>
                      <th scope="col">매수시기</th>
                      <th scope="col">상장일</th>
                      <th scope="col" className="perf-text-right">투자수익률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.investments.map((investment, index) => (
                      <tr key={`${investment.stockName}-${index}`}>
                        <th scope="row"><span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>{investment.stockName}</th>
                        <td>{investment.purchasePrice}</td>
                        <td>{investment.purchasePeriod}</td>
                        <td>{investment.listingDate}</td>
                        <td className={`perf-text-right ${investment.return >= 0 ? 'perf-value-positive' : 'perf-value-negative'}`}>
                          {investment.return >= 0 ? '+' : ''}{investment.return.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="performance-mobile-cards">
                {performance.investments.map((investment, index) => (
                  <article className="performance-mobile-card" key={`${investment.stockName}-card-${index}`}>
                    <div className="performance-card-header">
                      <span className="perf-row-number">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{investment.stockName}</h3>
                    </div>
                    <dl className="performance-card-dl">
                      <div><dt>매수가격</dt><dd>{investment.purchasePrice}</dd></div>
                      <div><dt>매수시기</dt><dd>{investment.purchasePeriod}</dd></div>
                      <div><dt>상장일</dt><dd>{investment.listingDate}</dd></div>
                      <div>
                        <dt>투자수익률</dt>
                        <dd className={investment.return >= 0 ? 'perf-value-positive' : 'perf-value-negative'}>
                          {investment.return >= 0 ? '+' : ''}{investment.return.toFixed(1)}%
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="performance-section reveal-on-scroll" aria-labelledby="pipo-portfolio-heading">
        <div className="performance-inner">
          <header className="performance-header">
            <div>
              <p>PORTFOLIO</p>
              <h2 id="pipo-portfolio-heading">연도별 IPO 포트폴리오</h2>
              <span className="performance-header-desc">주요 IPO 기업의 연도별 투자 및 상장 현황입니다.</span>
            </div>
          </header>

          {isLoading && <p className="performance-status" role="status">포트폴리오를 불러오는 중입니다.</p>}
          {!isLoading && error && <p className="performance-status performance-status-error" role="alert">{error}</p>}
          {!isLoading && !error && performance && (
            <>
              <div className="perf-ipo-board">
                {sortedYears.map((year) => (
                  <div key={year} className="perf-ipo-column">
                    <h3 className="perf-ipo-year">{year}</h3>
                    <div className="perf-ipo-cards">
                      {groupedInvestments[year].map((inv, idx) => (
                        <article key={`${inv.stockName}-${idx}`} className="perf-ipo-card">
                          <div className="perf-ipo-card-header">
                            <CompanyLogo imageUrl={inv.imageUrl} stockName={inv.stockName} />
                            <h4 className="perf-ipo-name">{inv.stockName}</h4>
                          </div>
                          <dl className="perf-ipo-dl">
                            <div className="perf-ipo-stat-primary">
                              <dt>수익률</dt>
                              <dd className={inv.return >= 0 ? 'perf-value-positive' : 'perf-value-negative'}>
                                {inv.return >= 0 ? '+' : ''}{inv.return.toFixed(1)}%
                              </dd>
                            </div>
                            <div className="perf-ipo-stat-secondary">
                              <dt>매수가격</dt>
                              <dd>{inv.purchasePrice}</dd>
                            </div>
                            <div className="perf-ipo-stat-secondary">
                              <dt>상장일</dt>
                              <dd>{inv.listingDate}</dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <aside className="performance-callout">
                <div>
                  <h3>IPO 투자 내역입니다.</h3>
                  <p>각 기업의 투자 및 상장 전후 사례를 확인하실 수 있습니다.</p>
                </div>
              </aside>
              <div className="performance-ipo-guide-action">
                <a href={`${baseUrl}otc-stock-guide`}>장외주식 확인 방법</a>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}