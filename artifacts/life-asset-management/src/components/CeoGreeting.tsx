export function CeoGreeting() {
  return (
    <main className="ceo-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">COMPANY</p>
          <h1>CEO 인사말</h1>
          <nav aria-label="현재 위치">
            <a href={import.meta.env.BASE_URL}>홈</a>
            <span>/</span>
            <span>회사소개</span>
            <span>/</span>
            <strong>CEO 인사말</strong>
          </nav>
        </div>
      </section>

      <section className="ceo-message">
        <div className="ceo-message-inner">
          <aside className="ceo-brand-panel">
            <img
              src={`${import.meta.env.BASE_URL}images/foresight-logo-footer.png`}
              alt="FORESIGHT INVESTMENT 포사이트 투자자문"
            />
            <p>데이터와 원칙으로<br />고객 자산의 방향을 제시합니다.</p>
            <span>YOUR TRUSTED PATH TO GROWTH</span>
          </aside>

          <article className="ceo-copy">
            <p className="ceo-copy-label">CEO MESSAGE</p>
            <h2>
              기업의 성장은<br />
              <strong>올바른 선택</strong>에서 시작됩니다.
            </h2>
            <p className="ceo-lead">
              올바른 선택은 정확한 데이터와 객관적인 분석, 그리고 미래를 바라보는
              시각이 함께할 때 더욱 큰 가치를 만들어냅니다.
            </p>
            <div className="ceo-body">
              <p>
                포사이트투자자문은 고객의 목표와 투자 환경을 세심하게 이해하고,
                변화하는 시장 속에서도 흔들리지 않는 투자 방향을 제시하기 위해
                설립되었습니다.
              </p>
              <p>
                단기적인 시장의 움직임보다 검증된 데이터와 원칙을 중요하게 생각하며,
                AI 기반의 정밀한 분석과 전문적인 투자 경험을 바탕으로 고객에게 적합한
                자산관리 전략을 제공합니다.
              </p>
              <p>
                고객의 신뢰를 가장 중요한 가치로 삼고 투명하고 책임 있는 자문을
                이어가겠습니다. 포사이트투자자문이 고객의 더 나은 미래를 위한
                든든한 동반자가 되겠습니다.
              </p>
              <p>감사합니다.</p>
            </div>
            <div className="ceo-signature">
              <span>주식회사 포사이트투자자문 대표이사</span>
              <strong>김관국</strong>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}