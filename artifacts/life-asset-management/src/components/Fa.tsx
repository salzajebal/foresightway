import { useEffect } from 'react';
import { Building2, Users, Wallet, User, Landmark, ExternalLink } from 'lucide-react';
import './FaPremium.css';
import faIntroImg from '@assets/generated_images/fa-intro.jpg';

const partners = [
  { name: '키움증권', url: 'https://www.kiwoom.com/', en: 'KIWOOM' },
  { name: '카카오페이증권', url: 'https://www.kakaopaysec.com/', en: 'KAKAOPAY SEC' },
  { name: 'DB금융투자', url: 'https://www.db-fi.com/', en: 'DB FINANCIAL INVESTMENT' },
  { name: '삼성증권', url: 'https://www.samsungpop.com/', en: 'SAMSUNG SECURITIES' },
  { name: '미래에셋증권', url: 'https://securities.miraeasset.com/', en: 'MIRAE ASSET' },
  { name: 'KB증권', url: 'https://www.kbsec.com/', en: 'KB SECURITIES' }
];

export function Fa() {
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
    <main className="fa-premium-page">
      {/* Hero Section */}
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">ADVISORY & ARRANGEMENT</p>
          <h1>FA 자문계약</h1>
          <nav aria-label="현재 위치">
            <a href={baseUrl}>홈</a>
            <span>/</span>
            <span>사업영역</span>
            <span>/</span>
            <strong>FA</strong>
          </nav>
        </div>
      </section>

      {/* Intro Section */}
      <section className="fa-intro">
        <div className="fa-intro-inner">
          <div className="fa-intro-content reveal-on-scroll">
            <span className="fa-section-eyebrow">STRATEGIC PARTNERSHIP</span>
            <h2 className="fa-intro-heading">
              모든 고객의 금융 목표를<br />
              현실로 연결하는 <strong>최상의 전략 파트너.</strong>
            </h2>
            <div className="fa-intro-text">
              <p>
                포사이트투자자문은 단편적인 금융 상품 제안을 넘어, 고객의 성격과 목표에 부합하는 정교한 맞춤형 자문 솔루션을 제공합니다.
              </p>
              <p>
                철저한 리스크 관리와 신뢰할 수 있는 시장 분석을 바탕으로 개인의 자산 증식, 기업의 자본 구조화, 기관 및 전문 투자자의 알파 수익 창출을 다각도로 지원합니다.
              </p>
            </div>
          </div>
          <div className="fa-intro-visual-wrapper reveal-on-scroll delay-1">
            <img src={faIntroImg} alt="전략적 파트너십과 금융 구조화를 상징하는 추상적인 기하학 그래픽" />
            <div className="fa-intro-caption">ADVISORY & ARRANGEMENT</div>
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section className="fa-track-record">
        <div className="fa-track-record-inner">
          <header className="fa-track-record-header reveal-on-scroll">
            <span className="fa-section-eyebrow">TRACK RECORD</span>
            <h2>
              <span className="fa-mobile-heading-line">고객과 함께 만들어온</span>{' '}
              <span className="fa-mobile-heading-line">자문 성과의 기록입니다.</span>
            </h2>
          </header>
          
          <div className="fa-tr-grid">
            <article className="fa-tr-card reveal-on-scroll">
              <div className="fa-tr-icon-wrapper">
                <Building2 className="fa-tr-icon" />
              </div>
              <div className="fa-tr-content">
                <div className="fa-tr-value">
                  <strong>2020</strong><span>년 9월</span>
                </div>
                <div className="fa-tr-label">설립연도</div>
              </div>
            </article>

            <article className="fa-tr-card reveal-on-scroll delay-1">
              <div className="fa-tr-icon-wrapper">
                <Wallet className="fa-tr-icon" />
              </div>
              <div className="fa-tr-content">
                <div className="fa-tr-value">
                  <strong>1,060</strong><span>억원</span>
                </div>
                <div className="fa-tr-label">AUM</div>
              </div>
            </article>

            <article className="fa-tr-card reveal-on-scroll delay-2">
              <div className="fa-tr-icon-wrapper">
                <Users className="fa-tr-icon" />
              </div>
              <div className="fa-tr-content">
                <div className="fa-tr-value">
                  <strong>1,254</strong><span>명</span>
                </div>
                <div className="fa-tr-label">자문고객</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Advisory Fee Section */}
      <section className="fa-fee">
        <div className="fa-fee-inner">
          <header className="fa-fee-header reveal-on-scroll">
            <span className="fa-section-eyebrow">ADVISORY FEE</span>
            <h2>
              <span className="fa-mobile-heading-line">고객의 부담은 없애고 투자 전문성은</span>{' '}
              <span className="fa-mobile-heading-line">극대화한 투명한 자문 구조.</span>
            </h2>
          </header>

          <div className="fa-fee-diagram reveal-on-scroll delay-1">
            <div className="fa-fee-u-line">
              <div className="fa-fee-u-label">수수료 정산</div>
            </div>

            <div className="fa-fee-node fa-node">
              <div className="fa-fee-icon-wrap"><Building2 className="fa-fee-icon"/></div>
              <h4>투자자문사 (FA)</h4>
              <p>포사이트투자자문</p>
            </div>

            <div className="fa-fee-link fa-client-link">
              <span className="fa-fee-label-top">전문 자문 서비스</span>
              <div className="fa-fee-line-wrap">
                <div className="fa-fee-arrow left desktop-only"></div>
                <div className="fa-fee-arrow up mobile-only"></div>
                <div className="fa-fee-line"></div>
                <div className="fa-fee-arrow right desktop-only"></div>
                <div className="fa-fee-arrow down mobile-only"></div>
              </div>
              <span className="fa-fee-label-bottom">자문 데이터 및 거래 의뢰</span>
            </div>

            <div className="fa-fee-node client-node">
              <div className="fa-fee-icon-wrap active"><User className="fa-fee-icon"/></div>
              <h4>고객</h4>
              <p>최적의 투자 솔루션</p>
            </div>

            <div className="fa-fee-link client-sec-link">
              <span className="fa-fee-label-top">고객 자산 운용 및 거래</span>
              <div className="fa-fee-line-wrap">
                <div className="fa-fee-arrow left desktop-only"></div>
                <div className="fa-fee-arrow up mobile-only"></div>
                <div className="fa-fee-line"></div>
                <div className="fa-fee-arrow right desktop-only"></div>
                <div className="fa-fee-arrow down mobile-only"></div>
              </div>
              <span className="fa-fee-label-bottom">계좌 관리 및 체결</span>
            </div>

            <div className="fa-fee-node sec-node">
              <div className="fa-fee-icon-wrap"><Landmark className="fa-fee-icon"/></div>
              <h4>증권사</h4>
              <p>제휴 금융기관</p>
            </div>
            
            {/* Mobile only link */}
            <div className="fa-fee-link sec-fa-link mobile-only-flex">
              <span className="fa-fee-label-top">수수료 정산</span>
              <div className="fa-fee-line-wrap">
                <div className="fa-fee-arrow up mobile-only"></div>
                <div className="fa-fee-line"></div>
                <div className="fa-fee-arrow down mobile-only"></div>
              </div>
            </div>
          </div>

          <div className="fa-fee-footer reveal-on-scroll delay-2">
            <p>자문 수수료는 제휴 증권사를 통해 정산되므로, <strong>별도의 비용 발생 없이 전문적인 자문 서비스</strong>를 제공받을 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="fa-partners">
        <div className="fa-partners-inner">
          <header className="fa-partners-header reveal-on-scroll">
            <span className="fa-section-eyebrow">PARTNERS</span>
            <h2>포사이트투자자문 제휴 증권사</h2>
            <p>증권사를 선택하면 공식 홈페이지로 이동합니다.</p>
          </header>
          
          <div className="fa-partners-grid">
            {partners.map((partner, idx) => (
              <a 
                key={idx} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`fa-partner-card reveal-on-scroll delay-${idx % 3}`}
              >
                <div className="fa-partner-name">
                  <span className="fa-partner-en">{partner.en}</span>
                  <strong>{partner.name}</strong>
                </div>
                <ExternalLink className="fa-partner-icon" />
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}