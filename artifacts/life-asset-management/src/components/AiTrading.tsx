const aiModels = [
  {
    icon: 'model',
    title: '머신러닝 기반 자산배분',
    description: '딥러닝과 강화학습 알고리즘을 활용하여 시장 상황에 따른 최적의 자산배분 비율을 도출합니다.',
    points: ['수천 가지 시장 시나리오 시뮬레이션', '실시간 리스크 요인 분석', '동적 포트폴리오 최적화'],
  },
  {
    icon: 'language',
    title: '자연어 처리(NLP) 센티먼트 분석',
    description: '뉴스, 공시, SNS 등 텍스트 데이터를 분석하여 시장 심리를 파악하고 투자 의사결정에 반영합니다.',
    points: ['실시간 뉴스 및 공시 모니터링', '긍정·부정 감성 지수 산출', '이벤트 기반 투자 신호 생성'],
  },
  {
    icon: 'factor',
    title: '퀀트 팩터 모델',
    description: '가치, 모멘텀, 퀄리티 등 검증된 투자 팩터를 기반으로 체계적인 종목 선정을 수행합니다.',
    points: ['멀티팩터 스코어링 시스템', '팩터 노출도 실시간 모니터링', '백테스트 기반 전략 검증'],
  },
];

const aiSteps = [
  {
    number: '01',
    title: '데이터 수집',
    description: '글로벌 시장 데이터, 재무제표, 뉴스, 대안데이터 등 다양한 소스에서 실시간 데이터를 수집합니다.',
  },
  {
    number: '02',
    title: '데이터 전처리',
    description: '수집된 데이터의 정제, 정규화, 결측치 처리를 통한 분석 가능한 형태로 변환합니다.',
  },
  {
    number: '03',
    title: '모델 분석',
    description: '머신러닝 모델을 통해 시장 예측, 팩터 분석, 센티먼트 분석을 수행합니다.',
  },
];

const tradingSystems = [
  {
    icon: 'risk',
    title: '리스크 관리 시스템',
    description: 'VaR, CVaR 등 리스크 지표를 실시간으로 모니터링하고 손실 제한 메커니즘을 운영합니다.',
    points: ['포트폴리오 변동성 실시간 추적', '드로다운 제한 및 자동 헤지', '스트레스 테스트 정기 수행'],
  },
  {
    icon: 'execution',
    title: '자동 실행',
    description: '시장 상황 변화에 따라 AI가 포트폴리오를 분석하고 검증된 전략을 자동으로 실행합니다.',
    points: ['일일 자산 비중 모니터링', '임계값 기반 자동 조정', '거래비용 최소화 알고리즘'],
  },
  {
    icon: 'monitoring',
    title: '실시간 모니터링',
    description: '투자 성과와 리스크 지표를 실시간으로 추적하고 이상 징후 발생 시 즉각 대응합니다.',
    points: ['24시간 시스템 감시', '이상 거래 자동 탐지', '성과 대시보드 제공'],
  },
];

const tradingSteps = [
  {
    number: '04',
    title: '포트폴리오 최적화',
    description: '리스크 대비 최적화 알고리즘을 통해 자산배분 비율을 결정합니다.',
  },
  {
    number: '05',
    title: '자동 실행',
    description: '결정된 전략에 따른 자동 매매 신호를 발송하고 주문을 실행합니다.',
  },
  {
    number: '06',
    title: '성과 모니터링',
    description: '실시간 성과 추적 및 리스크 지표 모니터링과 전략 피드백을 수행합니다.',
  },
];

function ModelIcon({ type }: { type: string }) {
  if (type === 'language') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10H9l-4 3v-13Z" /><path d="M8 9h8M8 12h5" /></svg>;
  }
  if (type === 'factor') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V12h3v7H5Zm6 0V7h3v12h-3Zm6 0V4h3v15h-3Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4h6M10 4v5l-5 8.5A1.7 1.7 0 0 0 6.5 20h11a1.7 1.7 0 0 0 1.5-2.5L14 9V4" /><path d="M8 15h8" /></svg>;
}

function TradingIcon({ type }: { type: string }) {
  if (type === 'execution') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8a7 7 0 0 0-12-2L5 8" /><path d="M5 4v4h4M5 16a7 7 0 0 0 12 2l2-2" /><path d="M19 20v-4h-4" /></svg>;
  }
  if (type === 'monitoring') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H4zM8 21h8M12 17v4" /><path d="m7 13 3-3 2 2 4-4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
}

export function AiTrading() {
  return (
    <main className="ai-trading-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">BUSINESS</p>
          <h1>AI 매매</h1>
          <nav aria-label="현재 위치">
            <a href={import.meta.env.BASE_URL}>홈</a>
            <span>/</span>
            <span>사업영역</span>
            <span>/</span>
            <strong>AI 매매</strong>
          </nav>
        </div>
      </section>

      <section className="ai-intro">
        <div className="ai-intro-inner">
          <p className="ai-intro-eyebrow">AI TRADING &amp; SYSTEMATIC</p>
          <h2>
            감정이 아닌 데이터와 알고리즘 기반의<br />
            과학적인 <strong>AI 투자전략</strong>으로 자산을 관리합니다.
          </h2>
          <div className="ai-intro-copy">
            <p>
              AI 트레이딩은 급변하는 금융시장 속에서도 감정을 배제하고 정밀한
              알고리즘을 통해 리스크를 제어하는 현대 자산 관리의 핵심 수단입니다.
              성공적인 AI 운용을 위해서는 방대한 시장 데이터의 입체적 분석,
              실시간 매매 타이밍 포착, 그리고 철저한 리스크 제어 원칙이 필수적입니다.
            </p>
            <p>
              포사이트투자자문은 고도화된 정량 데이터와 알고리즘 시스템을 바탕으로
              시장 변동성에 흔들리지 않는 상시 운용 솔루션을 제공합니다. 단기적
              모멘텀이나 추측을 배제하고 객관적인 데이터 검증을 거쳐 고객의 투자
              성향과 목적에 적합한 맞춤형 AI 투자전략을 제안합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="ai-process">
        <div className="ai-process-inner">
          <header className="ai-modeling-header">
            <p>AI MODELING</p>
            <h2>데이터를 수집하고 분석하여<br />최적의 투자 전략을 설계합니다.</h2>
          </header>

          <div className="ai-model-grid">
            {aiModels.map((model) => (
              <article key={model.title}>
                <div className="ai-model-icon"><ModelIcon type={model.icon} /></div>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <ul>
                  {model.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="ai-process-grid">
            {aiSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-execution">
        <div className="ai-process-inner">
          <header className="ai-modeling-header">
            <p>AI TRADING</p>
            <h2>설계된 전략을 자동으로 실행하고<br />지속적으로 모니터링합니다.</h2>
          </header>

          <div className="ai-model-grid ai-trading-grid">
            {tradingSystems.map((system) => (
              <article key={system.title}>
                <div className="ai-model-icon"><TradingIcon type={system.icon} /></div>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <ul>
                  {system.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="ai-process-grid">
            {tradingSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-architecture">
        <div className="ai-process-inner">
          <header className="ai-architecture-header">
            <p>ARCHITECTURE</p>
            <h2>AI 투자 아키텍처</h2>
            <strong>데이터 모델링부터 AI 트레이딩까지, 자동화된 투자 파이프라인</strong>
          </header>

          <div className="architecture-map">
            <div className="architecture-platform">
              <span>FORESIGHT AI PLATFORM</span>
              <small>데이터와 전략, 실행을 하나의 시스템으로 연결합니다.</small>
            </div>

            <div className="architecture-flow" aria-hidden="true">
              <i /><i /><i /><i />
            </div>

            <div className="architecture-columns">
              <article>
                <p>QUANDA ENGINE</p>
                <h3>Data Modeling</h3>
                <div><span>Data Model</span><span>Quant Library</span><span>Structured Data Library</span></div>
                <small>Market · Economic · Financial · News Data</small>
              </article>
              <article>
                <p>C₂ ENGINE</p>
                <h3>Strategy Modeling</h3>
                <div><span>Fund Strategy</span><span>Portfolio Strategy</span><span>Alpha Strategy</span></div>
                <small>검증된 투자 전략 설계 및 최적화</small>
              </article>
              <article>
                <p>L₂ ENGINE</p>
                <h3>AI Trading</h3>
                <div><span>Trading Strategy</span><span>Execution Strategy</span><span>Liquidity Strategy</span></div>
                <small>실시간 자동 실행 및 리스크 관리</small>
              </article>
            </div>
          </div>

          <div className="architecture-statement">
            <strong>단순한 데이터 분석을 넘어, 자산 가치를 정교하게 완성하는 혁신 파트너.</strong>
            <p>객관적인 데이터, AI 기반의 리밸런싱 가이드, 그리고 입체적인 알고리즘을 바탕으로 최적의 AI 트레이딩 솔루션을 제공합니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
}