import { homeContent } from '../content';

export function BusinessAreas() {
  return (
    <section id="business" className="business-areas" aria-label="사업영역">
      <header className="business-areas-header">
        <p className="business-areas-eyebrow">BUSINESS AREA</p>
        <h2>
          고객에 따라 <strong>다르게</strong>
          <br className="mobile-text-break" /> 설계합니다
        </h2>
        <p className="business-areas-summary">
          기업의 성장 단계와 고객의 투자 목적에
          <br className="mobile-text-break" /> 맞춘 네 가지 전문 영역.
        </p>
      </header>

      <div className="business-areas-inner">
        {homeContent.businessAreas.map((area, index) => {
          const isPage = ['ipo', 'ai-trading', 'bonds', 'mezzanine'].includes(area.id);
          const href = isPage ? `${import.meta.env.BASE_URL}${area.id}` : `#${area.id}`;
          return (
            <a
              id={area.id}
              className="business-area-card"
              href={href}
              key={area.id}
            >
              <span className="business-area-number">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <h2>{area.title}</h2>
              <p className="business-area-english">{area.englishTitle}</p>
              <p className="business-area-description">{area.description}</p>
              <dl>
                <div>
                  <dt>대상</dt>
                  <dd>{area.audience}</dd>
                </div>
                <div>
                  <dt>태그</dt>
                  <dd>{area.tags}</dd>
                </div>
              </dl>
              <span className="business-area-link">VIEW MORE</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}