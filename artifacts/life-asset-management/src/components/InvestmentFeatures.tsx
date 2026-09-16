import { homeContent } from '../content';

export function InvestmentFeatures() {
  return (
    <section id="different" className="investment-features" data-testid="section-different">
      <div className="investment-features-inner">
        <div className="text-center">
          <h2 className="section-supertitle">
            What make us <span className="highlight">different?</span>
          </h2>
        </div>

        <div className="investment-features-grid">
          {homeContent.sections.map((feature) => (
            <article className="investment-feature" key={feature.id}>
              <div className="investment-feature-heading">
                <div className="investment-feature-label">{feature.subtitle}</div>
                <h3>{feature.heading}</h3>
              </div>
              <div className="investment-feature-copy">
                <p>{feature.paragraphs[0]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}