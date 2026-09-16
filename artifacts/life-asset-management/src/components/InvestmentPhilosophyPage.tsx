import { useEffect } from 'react';
import { homeContent } from '../content';
import './InvestmentPhilosophyPage.css';

export function InvestmentPhilosophyPage() {
  const baseUrl = import.meta.env.BASE_URL;
  const { investmentPhilosophy } = homeContent;

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

  return (
    <main className="philosophy-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">INVESTMENT PHILOSOPHY</p>
          <h1>투자철학</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>투자전략</span>
            <span>/</span>
            <strong>투자철학</strong>
          </nav>
        </div>
      </section>

      <section className="philosophy-intro reveal-on-scroll">
        <div className="philosophy-inner">
          <p className="philosophy-eyebrow">INVESTMENT PHILOSOPHY</p>
          <h2>
            세 가지 <strong>투자 원칙</strong>
          </h2>
          <div className="philosophy-intro-copy">
            <p>시장의 변동성은 예측의 영역이 아닌, 정교한 전략으로 통제해야 할 대상입니다.</p>
            <p>{investmentPhilosophy.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="philosophy-overview reveal-on-scroll">
        <div className="philosophy-inner">
          <header className="philosophy-header">
            <p>CORE PRINCIPLES</p>
            <h2>핵심 전략 요약</h2>
          </header>
          <div className="philosophy-table-wrap">
            <table className="philosophy-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>STRATEGY</th>
                  <th>APPROACH</th>
                  <th>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {investmentPhilosophy.principles.map((principle, idx) => (
                  <tr key={principle.title}>
                    <td data-label="NO">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                    </td>
                    <td data-label="STRATEGY">
                      <strong>{principle.englishTitle}</strong>
                    </td>
                    <td data-label="APPROACH">
                      {principle.title}
                    </td>
                    <td data-label="DESCRIPTION">
                      <p>{principle.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="philosophy-details reveal-on-scroll">
        <div className="philosophy-inner">
          <div className="philosophy-detail-list">
            <article className="philosophy-detail-row">
              <div className="philosophy-detail-sidebar">
                <span>01</span>
                <h3>Data-Driven Analysis</h3>
                <h2>정량적 데이터 검증</h2>
              </div>
              <div className="philosophy-detail-content">
                <strong>주관적 감정을 배제하고, 철저한 데이터와 알고리즘으로 검증합니다.</strong>
                <div className="philosophy-detail-body">
                  <p>
                    금융 시장의 불확실성을 극복하는 가장 확실한 기준은 객관적인 데이터입니다. 포사이트투자자문은 인간의 직관이나 자의적 판단에서 발생하는 편향을 철저히 통제하고, AI 기반의 고도화된 정량 데이터 모델을 통해 모든 투자 기회를 분석합니다.
                  </p>
                  <p>
                    수치화된 정밀 데이터와 다각도의 백테스팅 및 알고리즘 검증을 거쳐 위험 요소를 사전에 걸러내며, 오직 수치로 검증된 최적의 자문 전략만을 수립하고 집행합니다.
                  </p>
                </div>
                <div className="philosophy-callout">
                  <p>
                    우리는 주관적 추측을 배제하고, 객관적 데이터가 증명하는 확실성만을 추구합니다.
                  </p>
                </div>
              </div>
            </article>

            <article className="philosophy-detail-row">
              <div className="philosophy-detail-sidebar">
                <span>02</span>
                <h3>Multi-Asset Allocation</h3>
                <h2>입체적 자산 배분</h2>
              </div>
              <div className="philosophy-detail-content">
                <strong>단일 자산의 한계를 넘어, 시장 국면에 맞춘 포트폴리오를 구축합니다.</strong>
                <div className="philosophy-detail-body">
                  <p>
                    급변하는 글로벌 금융 환경에서 특정 자산군에만 의존하는 전략은 커다란 리스크를 동반합니다. 포사이트투자자문은 AI 상시 매매 시스템부터 Pre-IPO, 채권, 메자닌(CB·BW·EB)에 이르기까지 다각화된 자산군을 입체적으로 결합합니다.
                  </p>
                  <p>
                    자산 간 상관관계와 시장 흐름을 면밀히 분석하여 하락 리스크를 정교하게 방어하는 동시에, 최적의 위험 대비 수익률(Risk-Adjusted Return)을 도출하는 밸런스 있는 구조를 설계합니다.
                  </p>
                </div>
                <div className="philosophy-callout">
                  <p>
                    우리는 시장의 모든 파고 속에서도 자산을 안정적으로 지키고 증식시키는 최적의 조합을 제시합니다.
                  </p>
                </div>
              </div>
            </article>

            <article className="philosophy-detail-row">
              <div className="philosophy-detail-sidebar">
                <span>03</span>
                <h3>Event-Driven Strategy</h3>
                <h2>이벤트 드리븐</h2>
              </div>
              <div className="philosophy-detail-content">
                <strong>시장의 방향성에 구애받지 않고, 확실한 모멘텀 기반의 알파 수익을 포착합니다.</strong>
                <div className="philosophy-detail-body">
                  <p>
                    기업의 M&amp;A, 자본 구조 변화, 지배구조 개편 등 특수 상황(Special Situations)에서 발생하는 가격 왜곡은 명확한 투자 기회를 제공합니다. 포사이트투자자문은 시장 전체의 상승이나 하락이라는 단순한 방향성에 자산을 맡기지 않습니다.
                  </p>
                  <p>
                    명확한 촉매제(Catalyst)를 지닌 이벤트 시나리오를 선제적으로 분석하고 정밀하게 추적함으로써, 증시 환경과 무관하게 안정적이고 정교한 알파(Alpha) 수익을 창출합니다.
                  </p>
                </div>
                <div className="philosophy-callout">
                  <p>
                    우리는 단순 주가 예측을 넘어, 기업의 구조적 변화 속에서 독자적인 절대 수익을 발굴합니다.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
