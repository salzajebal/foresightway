const mezzanineMechanisms = [
  {
    step: '01',
    title: '하방 안정성',
    subtitle: 'Downside Stability',
    description: '채권의 성격을 보유하여 만기 시 원금과 정기적인 이자 수익을 확보하고, 변동성 장세에서도 자산을 안정적으로 보호합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M5 3h11l3 3v15H5z" />
        <path d="M16 3v4h4M9 11h6M9 15h4" />
        <circle cx="16.5" cy="17.5" r="2.5" />
      </svg>
    )
  },
  {
    step: '02',
    title: '상방 수익성',
    subtitle: 'Upside Potential',
    description: '주가 상승 시 주식 전환권(CB·BW·EB)을 행사하여 주식 시장 상승에 따른 자본이득(Capital Gain)을 극대화합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5M7.5 12l2-2 2 1 3-4" />
      </svg>
    )
  },
  {
    step: '03',
    title: '정밀한 리스크 관리',
    subtitle: 'Precision Risk Management',
    description: '발행 기업의 재무 건전성, 리파이낸싱 가능성, 전환가액 조정 등 다각도로 검증하여 회수 리스크를 최소화합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];

const mezzanineAdvisoryProcess = [
  {
    step: '01',
    title: '딜 발굴 및 정밀 분석',
    subtitle: 'Deal Sourcing & Analysis',
    description: '우량 발행사를 발굴하고 기업 가치, 전환 조건, 리파이낸싱 가능성과 회수 리스크를 다각도로 분석합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M5 3h11l3 3v15H5z" />
        <path d="M16 3v4h4M9 11h6M9 15h4" />
        <circle cx="16.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    step: '02',
    title: '맞춤형 구조화 및 자문',
    subtitle: 'Customized Structuring',
    description: '고객의 투자 성향과 자금 운용 기간을 고려해 최적의 CB·BW·EB 종목과 투자 구조를 설계합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5M7.5 12l2-2 2 1 3-4" />
      </svg>
    ),
  },
  {
    step: '03',
    title: '사후 관리 및 엑시트 지원',
    subtitle: 'Monitoring & Exit Support',
    description: '발행사를 상시 모니터링하고 리픽싱을 관리하며, 시장 상황에 따른 최적의 매도·회수 시점과 전략을 제안합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function Mezzanine() {
  return (
    <main className="mezzanine-page">
      {/* Hero Section */}
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">MEZZANINE INVESTMENT</p>
          <h1>메자닌</h1>
          <nav aria-label="현재 위치">
            <a href={import.meta.env.BASE_URL}>홈</a>
            <span>/</span>
            <span>사업영역</span>
            <span>/</span>
            <strong>메자닌</strong>
          </nav>
        </div>
      </section>

      {/* Intro Section */}
      <section className="mezzanine-intro">
        <div className="mezzanine-intro-inner">
          <div className="mezzanine-intro-heading">
            <p className="mezzanine-eyebrow">MEZZANINE INVESTMENT</p>
            <h2>
              하방 방어와 입체적인 가치 상승의 <strong>결합</strong>
            </h2>
          </div>
          <div className="mezzanine-intro-visual">
            <img src={`${import.meta.env.BASE_URL}images/hero-poster.jpg`} alt="" />
            <span>STABILITY &amp; UPSIDE POTENTIAL</span>
          </div>
          <div className="mezzanine-intro-copy">
            <p>
              메자닌(Mezzanine)은 채권의 안정성과 주식의 수익성을 동시에 추구하는 하이브리드 투자 자산입니다. 전환사채(CB), 신주인수권부사채(BW), 교환사채(EB) 등을 통해 주가 하락 시에는 원금과 이자를 보장받고, 주가 상승 시에는 주식으로 전환하여 높은 자본 차익을 누릴 수 있습니다.
            </p>
            <p>
              포사이트투자자문은 철저한 기업 분석과 독점적인 딜 파이프라인을 바탕으로 우량 메자닌 자산을 발굴합니다. 발행 기업의 펀더멘털과 상환 능력을 엄격하게 검증하여 리스크를 통제하고, 시장 상황에 맞는 최적의 전환 및 매도 타이밍을 포착해 입체적인 가치 상승을 실현합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section className="mezzanine-mechanisms">
        <div className="mezzanine-mechanisms-inner">
          <header className="mezzanine-mechanisms-header">
            <p>CORE VALUE</p>
            <h2>메자닌의 핵심 가치</h2>
            <span>안정적인 하방 방어부터 주식 전환을 통한 상방 수익까지 균형 있게 설계합니다.</span>
          </header>
          <div className="mezzanine-mechanisms-grid">
            {mezzanineMechanisms.map((mech) => (
              <article className="mezzanine-mechanism-card" key={mech.step}>
                <div className="mezzanine-mechanism-icon">{mech.icon}</div>
                <span className="mezzanine-mechanism-step">STEP {mech.step}</span>
                <h3>{mech.title}</h3>
                <span className="mezzanine-mechanism-subtitle">{mech.subtitle}</span>
                <p>{mech.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mezzanine-process">
        <div className="mezzanine-mechanisms-inner">
          <header className="mezzanine-mechanisms-header">
            <p>ADVISORY PROCESS</p>
            <h2>메자닌 자문 프로세스</h2>
            <span>딜 발굴부터 구조화와 사후 관리, 성공적인 엑시트까지 전 과정을 함께합니다.</span>
          </header>
          <div className="mezzanine-mechanisms-grid">
            {mezzanineAdvisoryProcess.map((process) => (
              <article className="mezzanine-mechanism-card" key={process.step}>
                <div className="mezzanine-mechanism-icon">{process.icon}</div>
                <span className="mezzanine-mechanism-step">STEP {process.step}</span>
                <h3>{process.title}</h3>
                <span className="mezzanine-mechanism-subtitle">{process.subtitle}</span>
                <p>{process.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="investment-example" className="mezzanine-example">
        <div className="mezzanine-example-inner">
          <header className="mezzanine-services-header">
            <p>INVESTMENT EXAMPLE</p>
            <h2>메자닌 투자 예시</h2>
            <span>주가 변화에 따른 전환사채의 수익 구조를 세 가지 시나리오로 살펴봅니다.</span>
          </header>

          <div className="mezzanine-example-layout">
            <div className="mezzanine-example-scenarios">
              <article>
                <span>A</span>
                <div>
                  <h3>주가 상승</h3>
                  <dl>
                    <div><dt>전환가</dt><dd>20,000원</dd></div>
                    <div><dt>매도가</dt><dd>25,000원</dd></div>
                    <div><dt>투자수익률</dt><dd>25%</dd></div>
                  </dl>
                </div>
              </article>
              <article>
                <span>B</span>
                <div>
                  <h3>주가 하락 후 상승</h3>
                  <dl>
                    <div><dt>조정 전환가</dt><dd>14,000원</dd></div>
                    <div><dt>매도가</dt><dd>25,000원</dd></div>
                    <div><dt>투자수익률</dt><dd>78.6%</dd></div>
                  </dl>
                </div>
              </article>
              <article>
                <span>C</span>
                <div>
                  <h3>주가 지속 하락</h3>
                  <dl>
                    <div><dt>만기 상환</dt><dd>원금 회수</dd></div>
                    <div><dt>만기 수익</dt><dd>YTM 2.5%</dd></div>
                  </dl>
                </div>
              </article>
            </div>

            <div className="mezzanine-payoff-chart" aria-label="주가 변화에 따른 메자닌 투자 수익 구조 그래프">
              <svg viewBox="0 0 650 390" role="img">
                <title>전환사채 투자 시나리오별 수익 구조</title>
                <g className="chart-grid">
                  <path d="M75 48H585M75 180H585M75 320H585" />
                  <path d="M75 48V320M330 48V320M585 48V320" />
                </g>
                <g className="chart-axis">
                  <path d="M75 48V320H585" />
                </g>
                <g className="chart-labels">
                  <text x="12" y="53">25,000원</text>
                  <text x="12" y="185">20,000원</text>
                  <text x="12" y="325">14,000원</text>
                  <text x="565" y="348">주가</text>
                </g>
                <path className="chart-line chart-line-a" d="M75 180L585 48" />
                <path className="chart-line chart-line-b" d="M75 180C190 265 280 320 345 282C430 232 455 95 475 48" />
                <path className="chart-line chart-line-c" d="M75 180L345 320" />
                <path className="chart-guide" d="M475 48V320" />
                <g className="chart-points">
                  <circle cx="585" cy="48" r="6" />
                  <circle cx="475" cy="48" r="6" />
                  <circle cx="345" cy="320" r="6" />
                </g>
                <g className="chart-annotations">
                  <text x="490" y="82">A. 주가 상승 시</text>
                  <text x="490" y="103">수익률 25%</text>
                  <text x="365" y="184">B. 하락 후 상승</text>
                  <text x="365" y="205">수익률 78.6%</text>
                  <text x="365" y="287">C. 지속 하락 시</text>
                  <text x="365" y="308">YTM 2.5% 확보</text>
                </g>
              </svg>
            </div>
          </div>

          <aside className="mezzanine-example-callout">
            <strong>안정성 위에 수익성을 더하는 정교한 자산 설계</strong>
            <p>메자닌 특유의 비대칭적 수익 구조를 활용하여 시장 환경에 구애받지 않고, 확실한 하방 방어와 자본이득을 동시에 실현합니다.</p>
          </aside>
        </div>
      </section>

    </main>
  );
}
