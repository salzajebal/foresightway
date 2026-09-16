const companyDetails = [
  { term: '회사명', description: '포사이트투자자문' },
  { term: '대표이사', description: '김관국' },
  { term: '설립일', description: '2020년 7월 10일' },
  { term: '자본금', description: '26.5억원' },
  { term: '사업자등록번호', description: '660-87-01893' },
  {
    term: '주소',
    description: '서울특별시 영등포구 국제금융로8길 11, 1161호 (여의도동, 대영빌딩)',
  },
  { term: '대표번호', description: '070-8018-6409' },
];

export function CompanyOverview() {
  return (
    <main className="company-overview-page">
      <section className="ceo-hero">
        <div className="ceo-hero-inner">
          <p className="ceo-eyebrow">COMPANY</p>
          <h1>회사 개요</h1>
          <nav aria-label="현재 위치">
            <a href={import.meta.env.BASE_URL}>홈</a>
            <span>/</span>
            <span>회사소개</span>
            <span>/</span>
            <strong>회사 개요</strong>
          </nav>
        </div>
      </section>

      <section className="company-overview">
        <div className="company-overview-inner">
          <header className="company-overview-heading">
            <p>COMPANY OVERVIEW</p>
            <h2>
              원칙과 신뢰를 바탕으로<br />
              <strong>고객의 미래</strong>를 설계합니다.
            </h2>
          </header>

          <div className="company-overview-content">
            <dl className="company-profile">
              {companyDetails.map((detail) => (
                <div key={detail.term}>
                  <dt>{detail.term}</dt>
                  <dd>{detail.description}</dd>
                </div>
              ))}
            </dl>

            <aside className="ownership-card">
              <div>
                <p>주주구성</p>
                <strong>100<span>%</span></strong>
                <small>포사이트투자자문</small>
              </div>
              <dl>
                <div>
                  <dt>주주명</dt>
                  <dd>포사이트투자자문</dd>
                </div>
                <div>
                  <dt>지분율</dt>
                  <dd>100%</dd>
                </div>
                <div>
                  <dt>자본금</dt>
                  <dd>26.5억원</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}