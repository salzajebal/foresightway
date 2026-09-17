import { homeContent } from '../content';

export function CompanyIntro() {
  const { companyIntro } = homeContent;

  return (
    <section id="company" className="company-intro" data-testid="section-company">
      <div className="company-intro-inner">
        <div className="company-intro-lead">
          <img
            className="company-intro-logo"
            src={`${import.meta.env.BASE_URL}images/foresight-brand-logo.png`}
            alt="FORESIGHT INVESTMENT 포사이트 투자자문"
          />
        </div>

        <div className="company-intro-details">
          <div className="company-intro-eyebrow">ABOUT US</div>
          <h2 className="company-intro-title">
            자산의 성장은
            <br />
            <strong>올바른 전략</strong>에서 시작됩니다
          </h2>
          <p className="company-intro-summary">{companyIntro.summary}</p>
          <p className="company-intro-description">{companyIntro.description}</p>

          <ol className="company-intro-points">
            {companyIntro.points.map((point, index) => (
              <li key={point}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}