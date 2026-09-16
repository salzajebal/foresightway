import { useEffect } from 'react';
import './BondsPremium.css';
import bondIntroImg from '@assets/generated_images/bond-intro.jpg';

const buyProcess = [
  {
    title: '포트폴리오 분석',
    items: [
      '듀레이션, 신용등급, YTM 등 분석에 기반',
    ],
  },
  {
    title: '시장 모니터링',
    items: [
      '종목 탐색 및 시장 움직임 파악',
      '등급별 개별 신용 스프레드 분석',
      '호가 탐색 및 매수 시 영향분석',
    ],
  },
  {
    title: '투자 의사 결정',
    items: [
      '각 섹터 애널리스트 및 펀드매니저 투자 의사결정',
    ],
  },
];

const sellProcess = [
  {
    title: '포트폴리오 리밸런싱',
    items: [
      '신용등급, 업종, 듀레이션, YTM, 벤치마크 대비 조정',
    ],
  },
  {
    title: '기대수익률 달성 및 고평가',
    items: [
      '투자 당시 기대수익률 달성 및 시장 고평가 판단',
    ],
  },
  {
    title: '신용도 악화 예상',
    items: [
      '투자 시점 대비 악화 시 선제적 매도 기회 탐색',
    ],
  },
];

const bondServices = [
  {
    number: '01',
    keyword: 'GOVERNMENT & AGENCY BONDS',
    title: '국공채 및 우량 특수채 자문',
    description: '국가 및 공공기관이 발행하는 채권을 중심으로, 철저한 거시 경제 분석을 통해 가장 안정적이고 확실한 이자 수익 포지션을 구축합니다.',
  },
  {
    number: '02',
    keyword: 'CORPORATE CREDIT ANALYSIS',
    title: '크레딧 채권(회사채) 분석',
    description: '기업의 재무 안정성과 현금흐름, 산업 리스크를 깊이 있게 분석하여, 제한된 위험 속에서 높은 알파 수익을 창출할 수 있는 우량 회사채를 선별합니다.',
  },
  {
    number: '03',
    keyword: 'BESPOKE PORTFOLIO',
    title: '맞춤형 포트폴리오 설계',
    description: '고객의 투자 성향, 목표 수익률, 그리고 필요 듀레이션(자금 회수 기간)을 종합적으로 고려하여 1:1 맞춤형 채권 포트폴리오를 설계합니다.',
  },
  {
    number: '04',
    keyword: 'RISK MANAGEMENT',
    title: '상시 리스크 모니터링',
    description: '급변하는 금리 환경과 시장 변동성 속에서 포트폴리오의 신용 스프레드와 가치를 실시간으로 점검하고, 선제적 리밸런싱을 단행합니다.',
  },
];

export function Bonds() {
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
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
    <main className="bonds-premium-page">
      {/* Hero Section */}
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">BOND ADVISORY</p>
          <h1>채권</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>사업영역</span>
            <span>/</span>
            <strong>채권</strong>
          </nav>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bp-intro">
        <div className="bp-intro-inner">
          <div className="bp-intro-content reveal-on-scroll">
            <span className="bp-intro-eyebrow">MARKET INSIGHT</span>
            <h2 className="bp-intro-heading">
              안정적인 자산 운용은<br />
              정확한 시장 분석에서 <strong>시작됩니다</strong>
            </h2>
            <div className="bp-intro-text">
              <p>
                채권은 변동성이 큰 금융시장 속에서도 안정적인 수익과 위험 관리의 핵심 수단입니다. 성공적인 채권 운용을 위해서는 금리 환경, 신용도, 유동성, 시장 흐름에 대한 종합적인 분석과 전략적인 판단이 필수적입니다.
              </p>
              <p>
                저희는 다양한 시장 경험과 전문성을 바탕으로 국공채, 금융채, 특수채, 회사채 등 다양한 채권 상품에 대한 맞춤형 자문 서비스를 제공합니다. 시장 상황과 투자 목적을 종합적으로 고려하여 고객에게 가장 적합한 투자 전략과 운용 방향을 제안합니다.
              </p>
            </div>
          </div>
          <div className="bp-intro-visual-wrapper reveal-on-scroll delay-1">
            <div className="bp-intro-visual">
              <img src={bondIntroImg} alt="채권 시장과 기관 금융을 상징하는 깊은 남색과 청록색 톤의 기하학적 추상 라인 예술 이미지" />
              <div className="bp-intro-caption">STABILITY · YIELD · RISK CONTROL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bp-process">
        <div className="bp-process-inner">
          <header className="bp-process-header reveal-on-scroll">
            <span className="bp-section-label">INVESTMENT PROCESS</span>
            <h2>투자 프로세스</h2>
            <p>철저한 분석에 기반한 매수/매도 전략</p>
          </header>

          <div className="bp-process-wrapper">
            {/* Buy Strategy */}
            <div className="bp-process-col reveal-on-scroll">
              <div className="bp-process-col-header">
                <h3>01. BUY STRATEGY</h3>
                <span>매수 프로세스</span>
              </div>
              <div className="bp-process-timeline">
                {buyProcess.map((step, idx) => (
                  <article className="bp-pt-item" key={`buy-${idx}`}>
                    <div className="bp-pt-node"></div>
                    <div className="bp-pt-content">
                      <h4>{step.title}</h4>
                      <ul>
                        {step.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sell Strategy */}
            <div className="bp-process-col reveal-on-scroll delay-1">
              <div className="bp-process-col-header">
                <h3>02. SELL STRATEGY</h3>
                <span>매도 프로세스</span>
              </div>
              <div className="bp-process-timeline">
                {sellProcess.map((step, idx) => (
                  <article className="bp-pt-item" key={`sell-${idx}`}>
                    <div className="bp-pt-node"></div>
                    <div className="bp-pt-content">
                      <h4>{step.title}</h4>
                      <ul>
                        {step.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Text Only) */}
      <section className="bp-services">
        <div className="bp-services-inner">
          <header className="bp-services-header reveal-on-scroll">
            <span className="bp-section-label">CORE ADVISORY</span>
            <h2>네 가지 핵심 자문 영역</h2>
            <p>채권 시장의 본질을 꿰뚫는 전문성으로 안정적인 수익 모델을 제시합니다.</p>
          </header>

          <div className="bp-services-list">
            {bondServices.map((service, idx) => (
              <article 
                className="bp-service-row reveal-on-scroll" 
                key={service.number}
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="bp-sr-number">{service.number}</div>
                <div className="bp-sr-details">
                  <span className="bp-sr-keyword">{service.keyword}</span>
                  <h3 className="bp-sr-title">{service.title}</h3>
                </div>
                <div className="bp-sr-description">
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
