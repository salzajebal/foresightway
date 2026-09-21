import guideReference from '../../../../attached_assets/image_1789950345268.png';
import './OtcStockGuide.css';

type SecuritiesFirm = {
  name: string;
  logoPosition: string;
  appMenu: string;
  detail: string;
};

const firms: SecuritiesFirm[] = [
  { name: '키움증권', logoPosition: '-48px -95px', appMenu: '메뉴', detail: '뱅킹/업무 → 잔고 → 권리/청약 → 비상장주식' },
  { name: 'NH나무증권', logoPosition: '-266px -95px', appMenu: 'MY자산', detail: '보유종목 → 잔고 → 비상장주식' },
  { name: '삼성증권', logoPosition: '-483px -95px', appMenu: 'MY자산', detail: '잔고 → 자산현황 → 비상장주식' },
  { name: '미래에셋증권', logoPosition: '-48px -183px', appMenu: '서비스', detail: '자산 → 보유종목 → 비상장주식' },
  { name: '신한투자증권', logoPosition: '-266px -183px', appMenu: '자산', detail: '잔고 → 주식잔고 → 비상장주식' },
  { name: '한국투자증권', logoPosition: '-483px -183px', appMenu: '자산/뱅킹', detail: '잔고 → 주식 → 비상장주식' },
  { name: '하나증권', logoPosition: '-48px -271px', appMenu: '자산', detail: '잔고조회 → 국내주식 → 비상장주식' },
  { name: '유안타증권', logoPosition: '-266px -271px', appMenu: '뱅킹', detail: '계좌 → 잔고 → 비상장주식' },
  { name: '유진투자증권', logoPosition: '-483px -271px', appMenu: '메뉴', detail: '자산/뱅킹 → 잔고조회 → 비상장주식' },
  { name: '메리츠증권', logoPosition: '-48px -369px', appMenu: 'SMART', detail: '자산 → 잔고 → 비상장주식' },
  { name: '대신증권', logoPosition: '-266px -369px', appMenu: '자산', detail: '잔고 → 주식잔고 → 비상장주식' },
  { name: '유진투자증권 SMART CHAMPION', logoPosition: '-483px -369px', appMenu: '자산', detail: '잔고 → 비상장주식' },
  { name: 'DB금융투자', logoPosition: '-48px -467px', appMenu: '자산', detail: '잔고조회 → 비상장주식' },
  { name: 'IBK투자증권', logoPosition: '-266px -467px', appMenu: '자산', detail: '잔고 → 국내주식 → 비상장주식' },
  { name: 'KB증권', logoPosition: '-483px -467px', appMenu: '자산평가', detail: '잔고 → 주식잔고 → 비상장주식' },
  { name: '한화투자증권', logoPosition: '-48px -555px', appMenu: '자산', detail: '잔고조회 → 주식잔고 → 비상장주식' },
  { name: '카카오페이증권', logoPosition: '-266px -555px', appMenu: '증권', detail: '보유주식 → 비상장주식' },
  { name: '토스증권', logoPosition: '-483px -555px', appMenu: '내 주식', detail: '보유종목 → 비상장주식' },
  { name: 'SK증권', logoPosition: '-48px -653px', appMenu: '자산', detail: '잔고 → 주식잔고 → 비상장주식' },
  { name: '현대차증권', logoPosition: '-266px -653px', appMenu: '자산', detail: '잔고 → 비상장주식' },
];

export function OtcStockGuide() {
  return (
    <main className="otc-guide-page">
      <section className="otc-guide-hero" aria-labelledby="otc-guide-heading">
        <div className="otc-guide-inner">
          <header className="otc-guide-header">
            <p><span aria-hidden="true" /> SECURITIES FIRMS</p>
            <h1 id="otc-guide-heading">증권사별 확인 방법</h1>
            <span>보유 중인 장외주식은 이용하시는 증권사 앱에서 확인하실 수 있습니다.</span>
          </header>

          <div className="otc-guide-grid">
            {firms.map((firm) => (
              <article className="otc-guide-card" key={firm.name}>
                <div
                  className="otc-guide-logo"
                  role="img"
                  aria-label={`${firm.name} 로고`}
                  style={{
                    backgroundImage: `url(${guideReference})`,
                    backgroundPosition: firm.logoPosition,
                  }}
                />
                <div className="otc-guide-card-copy">
                  <h2>{firm.name}</h2>
                  <p>
                    증권사 앱의 <strong>[{firm.appMenu}]</strong> 메뉴에서
                    <br />
                    <strong>[{firm.detail}]</strong> 순서로 확인해 주세요.
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="otc-guide-note">
            <span aria-hidden="true">※</span> 메뉴 명칭과 위치는 증권사 앱 업데이트에 따라 달라질 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}