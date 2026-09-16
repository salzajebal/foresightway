import { useEffect, useRef } from 'react';

const ipoStrengths = [
  {
    number: '01',
    title: '기업가치 분석',
    description: '산업과 사업 모델, 재무 데이터를 종합적으로 분석해 기업의 본질적인 가치와 성장 가능성을 평가합니다.',
  },
  {
    number: '02',
    title: '성장 단계별 전략',
    description: '기업의 현재 성장 단계와 자금 수요를 고려하여 상장 전후에 적합한 투자전략을 설계합니다.',
  },
  {
    number: '03',
    title: '철저한 리스크 검증',
    description: '시장 환경과 사업 위험, 회수 가능성을 다각도로 검토하여 투자 의사결정의 안정성을 높입니다.',
  },
];

const trackRecords = [
  {
    type: 'year',
    value: '2022',
    unit: '년 9월',
    label: '조합 설립연도',
    image: 'images/ipo-track-founded.jpg',
  },
  {
    type: 'aum',
    value: '2,780',
    unit: '억원',
    label: '누적 AUM',
    image: 'images/ipo-track-aum.jpg',
  },
  {
    type: 'members',
    value: '462',
    unit: '명',
    label: '조합원',
    image: 'images/ipo-track-members.jpg',
  },
];

function TrackRecordIcon({ type }: { type: string }) {
  if (type === 'aum') {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 18h22v20H13zM18 18v-4a6 6 0 0 1 12 0v4" /><path d="M24 23v10M20 27h8M20 31h8" /></svg>;
  }
  if (type === 'members') {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="7" /><path d="M12 39c1-8 5-12 12-12s11 4 12 12M9 21a5 5 0 0 0-5 5v9M39 21a5 5 0 0 1 5 5v9" /></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40h32M12 40V15h24v25M18 21h4v4h-4zM26 21h4v4h-4zM18 29h4v4h-4zM26 29h4v4h-4z" /></svg>;
}

const investmentSteps = [
  {
    type: 'vc',
    step: 'STEP 01',
    label: 'VC · 벤처캐피탈',
    title: '우량 IPO 주식 확보',
    points: ['상장 예정 기업 지분 보유', 'IPO 종목 투자자문사에 매도'],
    image: 'images/ipo-track-founded.jpg',
  },
  {
    type: 'fund',
    step: 'STEP 02',
    label: '투자자문사 · 투자조합',
    title: '투자조합 설립 및 운용',
    points: ['VC로부터 IPO 주식 매입', '투자조합 결성 및 운용', '운용비용 및 일정 마진 가산'],
    image: 'images/ipo-track-aum.jpg',
  },
  {
    type: 'customer',
    step: 'STEP 03',
    label: '고객 · 투자조합원',
    title: 'IPO 주식 배정',
    points: ['투자조합 가입', '최종 IPO 주식 매수', '상장 후 엑시트'],
    image: 'images/ipo-track-members.jpg',
  },
];

const ipoServices = [
  {
    number: '01',
    title: '기업가치 극대화',
    description: '사업 모델과 재무구조, 성장성을 종합적으로 분석하여 상장 전 기업가치를 높일 수 있는 전략을 설계합니다.',
    image: 'images/ipo-track-founded.jpg',
  },
  {
    number: '02',
    title: 'IPO 리스크 사전 진단',
    description: '재무·법률·사업·내부통제 등 상장 과정에서 발생할 수 있는 위험요인을 사전에 분석하고 대응방안을 제시합니다.',
    image: 'images/ipo-track-aum.jpg',
  },
  {
    number: '03',
    title: 'IPO 프로젝트 통합 자문',
    description: '상장 준비부터 투자조합 운용과 엑시트까지 전 과정을 체계적으로 관리하는 통합 자문을 제공합니다.',
    image: 'images/ipo-track-members.jpg',
  },
  {
    number: '04',
    title: '차별화된 투자 스토리 구축',
    description: '기업의 비전과 경쟁우위, 성장 전략을 바탕으로 시장과 투자자가 공감할 수 있는 투자 스토리를 완성합니다.',
    image: 'images/hero-city-clean.png',
  },
  {
    number: '05',
    title: '우량 VC 네트워크 기반 딜 파이프라인',
    description: '주요 VC 및 전문기관과의 긴밀한 협업을 통해 독점적인 상장 예정 기업을 확보하고 조합원에게 시장성을 갖춘 우량 IPO 투자 기회를 선제적으로 제공합니다.',
    image: 'images/hero-poster.jpg',
    featured: true,
  },
];

function InvestmentIcon({ type }: { type: string }) {
  if (type === 'fund') {
    return <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="19" r="8" /><circle cx="14" cy="31" r="6" /><circle cx="42" cy="31" r="6" /><path d="M16 48c1-9 5-14 12-14s11 5 12 14M5 48c1-7 4-11 9-11M51 48c-1-7-4-11-9-11" /></svg>;
  }
  if (type === 'customer') {
    return <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="18" r="9" /><path d="M13 49c1-12 6-18 15-18s14 6 15 18" /><path d="m40 12 4 2 4-2v6c0 4-2 6-4 7-2-1-4-3-4-7v-6Z" /></svg>;
  }
  return <svg viewBox="0 0 56 56" aria-hidden="true"><path d="M9 48h38M13 48V16h30v32M20 23h5v5h-5zM31 23h5v5h-5zM20 34h5v5h-5zM31 34h5v5h-5z" /><path d="m34 12 5-5 5 5" /></svg>;
}

export function Ipo() {
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = servicesRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ipo-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">BUSINESS</p>
          <h1>IPO</h1>
          <nav aria-label="현재 위치">
            <a href={import.meta.env.BASE_URL}>홈</a>
            <span>/</span>
            <span>사업영역</span>
            <span>/</span>
            <strong>IPO</strong>
          </nav>
        </div>
      </section>

      <section className="ipo-intro">
        <div className="ipo-intro-inner">
          <p className="ipo-eyebrow">IPO &amp; PRIVATE FUND</p>
          <h2>
            조합투자는 끝이 아닌,<br />
            기업의 가치를 시장으로 확장하고<br />
            확실한 결실을 맺는 <strong>시작</strong>입니다.
          </h2>

          <div className="ipo-intro-copy">
            <p>
              성공적인 투자조합은 단순히 상장 예정 기업을 발굴하는 것으로
              이루어지지 않습니다. 상장을 앞둔 기업의 경영력과 성장 가능성을
              면밀하게 검증하고, IPO 이후 명확한 엑시트 전략을 통해 투자자에게
              확실한 성과를 증명할 때 비로소 완성됩니다.
            </p>
            <p>
              포사이트투자자문은 기업의 현재를 진단하는 데 그치지 않고 성장 전
              과정까지 함께 설계합니다. 풍부한 실무 경험과 시장에 대한 깊은
              이해를 바탕으로 기업의 잠재력을 극대화하고 성공적인 투자조합
              운용과 최적의 엑시트 전략을 제공합니다.
            </p>
          </div>

          <div className="ipo-strength-grid">
            {ipoStrengths.map((strength) => (
              <article key={strength.number}>
                <span>{strength.number}</span>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ipo-track-record">
        <div className="ipo-intro-inner">
          <header className="ipo-track-header">
            <p>TRACK RECORD</p>
            <h2>조합 결성부터 성공적인 엑시트까지,<br />함께 만들어온 성장의 기록입니다.</h2>
          </header>

          <div className="ipo-track-grid">
            {trackRecords.map((record) => (
              <article key={record.label}>
                <div className="ipo-track-visual">
                  <img src={`${import.meta.env.BASE_URL}${record.image}`} alt="" />
                  <TrackRecordIcon type={record.type} />
                  <span aria-hidden="true" />
                </div>
                <div className="ipo-track-value">
                  <strong>{record.value}</strong>
                  <small>{record.unit}</small>
                </div>
                <p>{record.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ipo-structure">
        <div className="ipo-intro-inner">
          <header className="ipo-structure-header">
            <p>IPO INVESTMENT STRUCTURE</p>
            <h2>VC에서 최종 고객까지,<br />IPO 주식 유통과 투자조합 구조</h2>
            <span>VC 지분 확보부터 투자조합을 통한 고객 공급까지 전 과정을 체계적으로 연결합니다.</span>
          </header>

          <div className="ipo-structure-map">
            {investmentSteps.map((item, index) => (
              <div className="ipo-structure-stage" key={item.step}>
                <article>
                  <div className="ipo-structure-image">
                    <img src={`${import.meta.env.BASE_URL}${item.image}`} alt="" />
                    <div className="ipo-structure-icon"><InvestmentIcon type={item.type} /></div>
                  </div>
                  <span>{item.step}</span>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </article>
                {index < investmentSteps.length - 1 && (
                  <div className="ipo-structure-arrow" aria-hidden="true">
                    <small>{index === 0 ? 'IPO 주식 매도' : '마진 가산 후 공급'}</small>
                    <i />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ipo-structure-summary">
            <strong>검증된 VC 네트워크로 우량 IPO 종목을 선제적으로 확보합니다.</strong>
            <p>고객에게 합리적인 비용과 명확한 가치로 최적의 투자 기회를 제공합니다.</p>
          </div>
        </div>
      </section>

      <section className="ipo-services" id="ipo-services" ref={servicesRef}>
        <div className="ipo-intro-inner">
          <header className="ipo-services-header">
            <p>SERVICE</p>
            <h2>다섯 가지 핵심 조합 영역</h2>
            <span>기업 발굴부터 가치 제고와 성공적인 엑시트까지, 전 과정에 필요한 전문성을 제공합니다.</span>
          </header>

          <div className="ipo-services-grid">
            {ipoServices.map((service) => (
              <article className={service.featured ? 'is-featured' : ''} key={service.number}>
                <div className="ipo-service-visual">
                  <img src={`${import.meta.env.BASE_URL}${service.image}`} alt="" />
                  <b aria-hidden="true">{service.number}</b>
                </div>
                <div className="ipo-service-content">
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="ipo-services-closing">
            <strong>성공적인 IPO는 준비된 기업에게 기회가 됩니다.</strong>
            <p>
              포사이트투자자문은 단순한 지분 공급을 넘어 조합원의 자산 가치를
              극대화하는 핵심 파트너로서, IPO 전 과정에 걸쳐 최적의 딜 파이프라인과
              엑시트 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}