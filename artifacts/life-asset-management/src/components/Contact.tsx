import { useState, type FormEvent } from 'react';

export function Contact() {
  const [status, setStatus] = useState('');

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('전송 중입니다.');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setStatus('입력 내용을 확인한 뒤 다시 시도해 주세요.');
      return;
    }
    form.reset();
    setStatus('상담 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
  }

  return (
    <section id="contact-inquiry" className="contact" data-testid="section-contact">
      <div className="contact-inner">
        <header className="contact-header">
          <h2>
            Contact <span>us.</span>
          </h2>
          <h3>포사이트투자자문에 문의하세요.</h3>
        </header>

        <div className="contact-content">
          <form className="inquiry-form" onSubmit={submitInquiry}>
            <div className="inquiry-form-grid">
              <label>이름<input name="name" required minLength={2} /></label>
              <label>연락처<input name="phone" type="tel" required /></label>
              <label>이메일<input name="email" type="email" required /></label>
              <label>문의 유형
                <select name="inquiryType" required defaultValue="">
                  <option value="" disabled>선택해 주세요</option>
                  <option>AI 트레이딩</option><option>IPO</option><option>채권</option>
                  <option>메자닌</option><option>기타</option>
                </select>
              </label>
            </div>
            <label>문의 내용<textarea name="message" required minLength={10} rows={6} /></label>
            <label className="privacy-check">
              <input type="checkbox" required /> 개인정보 수집 및 이용에 동의합니다.
            </label>
            <button type="submit">문의 보내기 <span aria-hidden="true">→</span></button>
            <p className="inquiry-status" aria-live="polite">{status}</p>
          </form>

          <dl className="contact-details">
            <div><dt>주소</dt><dd>서울특별시 영등포구 국제금융로8길 11, 1161호<br />(여의도동, 대영빌딩)</dd></div>
            <div><dt>대표번호</dt><dd><a href="tel:07080186409">070-8018-6409</a></dd></div>
            <div><dt>이메일</dt><dd><a href="mailto:info@foresightway.com">info@foresightway.com</a></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}