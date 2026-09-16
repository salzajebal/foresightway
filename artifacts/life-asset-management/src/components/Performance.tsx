import { homeContent } from '../content';

export function Performance() {
  const { performance } = homeContent;

  return (
    <section id="performance" className="performance" data-testid="section-performance">
      <div className="performance-inner">
        <header className="performance-header">
          <h2>
            Performance<span>.</span>
          </h2>
          <h3>{performance.title}</h3>
          <p className="performance-summary">{performance.subtitle}</p>
        </header>

        <div className="performance-grid">
          {performance.cases.map((item) => {
            const isPage = item.id === 'performance-ai' || item.id === 'performance-ipo' || item.id === 'performance-bonds' || item.id === 'performance-mezzanine';
            const targetUrl = isPage ? `${import.meta.env.BASE_URL}${item.id}` : `#${item.id}`;
            return (
              <article id={item.id} className="performance-card" key={item.id}>
                <span className="performance-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={targetUrl} aria-label={`${item.title} 자세히 보기`}>
                  <span>VIEW MORE</span>
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            );
          })}
        </div>

        <a className="performance-view-all" href="#performance">
          운용성과 전체보기 <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}