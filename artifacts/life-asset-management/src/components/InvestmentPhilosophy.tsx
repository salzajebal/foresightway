import { homeContent } from '../content';

export function InvestmentPhilosophy() {
  const { investmentPhilosophy } = homeContent;

  return (
    <section
      id="investment-philosophy"
      className="investment-philosophy"
      data-testid="section-investment-philosophy"
    >
      <div className="investment-philosophy-inner">
        <header className="investment-philosophy-header">
          <h2>
            Investment <span>philosophy.</span>
          </h2>
          <h3>{investmentPhilosophy.title}</h3>
          <p>{investmentPhilosophy.subtitle}</p>
        </header>

        <div className="investment-principles">
          {investmentPhilosophy.principles.map((principle, index) => (
            <article className="investment-principle" key={principle.title}>
              <div className="investment-principle-heading">
                <div className="investment-principle-label">
                  {String(index + 1).padStart(2, '0')} · {principle.englishTitle}
                </div>
                <h4>{principle.title}</h4>
              </div>
              <div className="investment-principle-copy">
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}