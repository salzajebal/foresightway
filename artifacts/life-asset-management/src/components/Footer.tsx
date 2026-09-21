import { homeContent } from '../content';

export function Footer() {
  const { footer } = homeContent;

  return (
    <footer id="footer" className="footer" data-testid="footer">
      <div className="partner-marquee" aria-label="관련 기관 및 증권사">
        <div className="partner-track">
          {[...footer.partners, ...footer.partners].map((partner, index) => (
            <a
              className={`partner-item${partner.logo === 'dart.png' ? ' partner-item--dart' : ''}`}
              href={partner.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${partner.name} 홈페이지 새 창 열기`}
              aria-hidden={index >= footer.partners.length}
              tabIndex={index >= footer.partners.length ? -1 : 0}
              key={`${partner.name}-${index}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/partners/${partner.logo}`}
                alt=""
              />
              <span>{partner.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src={`${import.meta.env.BASE_URL}images/foresight-brand-logo.png`}
              alt="FORESIGHT INVESTMENT 포사이트 투자자문"
            />
            <p>{footer.tagline}</p>
            <span>FORESIGHT INVESTMENT ADVISORY</span>
          </div>

          <dl className="footer-details">
            <div>
              <dt>회사정보</dt>
              <dd>
                상호: {footer.companyName}
                <br />
                대표자: {footer.representative}
                <br />
                사업자등록번호: {footer.businessNumber}
              </dd>
            </div>
            <div>
              <dt>오시는 길</dt>
              <dd>{footer.address}</dd>
            </div>
            <div>
              <dt>문의 안내</dt>
              <dd>
                <a className="footer-phone" href="tel:07080186409">{footer.phone}</a>
                <br />
                <a href={`mailto:${footer.email}`}>{footer.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright" data-testid="footer-copyright">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
