import { homeContent } from '../content';

export function Faq() {
  return (
    <section id="faq" className="faq" data-testid="section-faq">
      <div className="faq-inner">
        <header className="faq-header">
          <h2>
            Frequently asked <span>questions.</span>
          </h2>
          <h3>자주 묻는 질문</h3>
          <p>상담 전에 많이 묻는 내용을 모았습니다.</p>
        </header>

        <div className="faq-list">
          {homeContent.faq.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0}>
              <summary>
                <span className="faq-number">Q{String(index + 1).padStart(2, '0')}</span>
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer">
                {item.answers.map((answer) => (
                  <p key={answer}>{answer}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}