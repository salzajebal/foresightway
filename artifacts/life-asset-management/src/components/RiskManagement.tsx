import { useEffect } from 'react';
import './RiskManagement.css';

export function RiskManagement() {
  const baseUrl = import.meta.env.BASE_URL;

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
    <main className="risk-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">RISK MANAGEMENT</p>
          <h1>리스크관리</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>투자전략</span>
            <span>/</span>
            <strong>리스크관리</strong>
          </nav>
        </div>
      </section>

      <section className="risk-intro reveal-on-scroll">
        <div className="risk-inner">
          <p className="risk-eyebrow">CORE PRINCIPLE</p>
          <h2>
            <span className="risk-heading-copy risk-heading-copy--desktop">
              지속 가능한 성과는<br />
              철저한 <strong>위험 관리</strong>에서 시작됩니다.
            </span>
            <span className="risk-heading-copy risk-heading-copy--mobile">
              <span>지속 가능한 성과는</span>
              <span>철저한 <strong>위험 관리</strong>에서</span>
              <span>시작됩니다.</span>
            </span>
          </h2>
          <div className="risk-intro-copy">
            <p>
              투자의 본질은 수익 추구이지만, 장기적인 성과를 위해서는 위험을 명확히 이해하고 관리하는 과정이 필수적입니다.
            </p>
            <p>
              포사이트투자자문에게 리스크 관리는 단순한 손실 방어를 넘어, 안정적이고 지속적인 성과 창출을 위한 가장 핵심적인 운용 원칙입니다. 우리는 기관급의 정교한 데이터 분석과 확고한 원칙을 바탕으로, 모든 투자 여정에서 고객의 자산을 견고하게 보호합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="risk-control reveal-on-scroll">
        <div className="risk-inner">
          <header className="risk-header">
            <p>RISK CONTROL SYSTEM</p>
            <h2>
              <span className="risk-heading-copy risk-heading-copy--desktop">
                세 단계로 완성하는 <strong>빈틈없는 위험 통제</strong>
              </span>
              <span className="risk-heading-copy risk-heading-copy--mobile">
                <span>세 단계로 완성하는</span>
                <span><strong>빈틈없는 위험 통제</strong></span>
              </span>
            </h2>
          </header>

          <div className="risk-grid">
            <article className="risk-grid-item">
              <div className="risk-grid-step">
                <span>01</span>
                <h3>AI 실시간 관제 및<br />포트폴리오 제어</h3>
              </div>
              <ul className="risk-grid-details">
                <li>개별 종목 초고속 추적</li>
                <li>글로벌 수급·마켓 센티먼트 감지</li>
                <li>AI 유니버스 상시 리밸런싱</li>
              </ul>
            </article>

            <article className="risk-grid-item" style={{ transitionDelay: '0.12s' }}>
              <div className="risk-grid-step">
                <span>02</span>
                <h3>투자 자산<br />선택 제한</h3>
              </div>
              <ul className="risk-grid-details">
                <li>자산 분류에 따른 철저한 분산 투자</li>
                <li>관리종목·높은 부채비율·불성실공시기업 투자 제한</li>
                <li>경영진 리스크를 감안한 투자</li>
              </ul>
            </article>

            <article className="risk-grid-item" style={{ transitionDelay: '0.24s' }}>
              <div className="risk-grid-step">
                <span>03</span>
                <h3>내부통제<br />관리</h3>
              </div>
              <ul className="risk-grid-details">
                <li>금융자산 자문 고객 간 이해상충 관리</li>
                <li>임직원의 금융투자상품 매매 관리</li>
                <li>당사 내부통제기준 준수 여부 모니터링</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="risk-areas reveal-on-scroll">
        <div className="risk-inner">
          <header className="risk-header">
            <p>RISK MANAGEMENT AREAS</p>
            <h2>네 가지 핵심 <strong>위험관리 영역</strong></h2>
          </header>

          <div className="risk-grid">
            <article className="risk-grid-item">
              <div className="risk-grid-step">
                <span>01</span>
                <h3>구성 단계부터 위험 분석</h3>
                <p>포트폴리오 구성 단계부터 시장 환경, 산업 변화, 기업 펀더멘털, 재무 건전성 등 다양한 위험 요소를 면밀히 분석합니다.</p>
              </div>
            </article>

            <article className="risk-grid-item" style={{ transitionDelay: '0.08s' }}>
              <div className="risk-grid-step">
                <span>02</span>
                <h3>주요 리스크 요인 상시 점검</h3>
                <p>금리, 신용, 유동성, 시장 변동성 등 주요 리스크 요인을 지속적으로 점검하여 변화하는 환경에 선제적으로 대응합니다.</p>
              </div>
            </article>

            <article className="risk-grid-item" style={{ transitionDelay: '0.16s' }}>
              <div className="risk-grid-step">
                <span>03</span>
                <h3>정량·정성 분석 병행</h3>
                <p>투자 과정에서 정량적 분석과 정성적 판단을 함께 활용하며, 다양한 시장 상황을 고려한 시나리오 분석을 수행합니다.</p>
              </div>
            </article>

            <article className="risk-grid-item" style={{ transitionDelay: '0.24s' }}>
              <div className="risk-grid-step">
                <span>04</span>
                <h3>체계적인 모니터링</h3>
                <p>지속적인 모니터링을 통해 포트폴리오의 균형을 유지하고, 예상치 못한 시장 변화 속에서도 안정적인 운용 기반을 확보합니다.</p>
              </div>
            </article>
          </div>

          <div className="risk-callout">
            <span className="risk-callout-label">OUR PRINCIPLE</span>
            <h3>
              <span className="risk-heading-copy risk-heading-copy--desktop">
                우리는 위험을 피하는 것이 아니라, 이해하고 관리합니다.
              </span>
              <span className="risk-heading-copy risk-heading-copy--mobile">
                <span>우리는 위험을 피하는 것이 아니라,</span>
                <span>이해하고 관리합니다.</span>
              </span>
            </h3>
            <p>철저한 리스크 관리와 원칙 중심의 운용을 바탕으로 단기적인 시장 변동에 흔들리지 않는 투자 전략을 구축하며, 고객 자산의 안정적인 성장과 장기적인 가치 증대를 함께 만들어가겠습니다.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
