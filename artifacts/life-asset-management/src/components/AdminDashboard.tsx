import { useEffect, useState, type FormEvent } from 'react';
import {
  getPerformanceMezzanine,
  updateAdminPerformanceMezzanine,
  type PerformanceAi,
  type PerformanceBonds,
  type PerformanceIpo,
  type PerformanceMezzanine,
} from '@workspace/api-client-react';

type Inquiry = {
  id: number; name: string; phone: string; email: string;
  inquiryType: string; message: string; createdAt: string;
};

type PerformanceForm = {
  months: { month: string; returnValue: string; cumulativeReturnValue: string }[];
  recentTrades: { stockName: string; tradeDetail: string; returnValue: string }[];
  annualAverageReturn: string;
  annualAverageStockCount: string;
  annualWinRate: string;
};

type IpoForm = {
  investments: {
    stockName: string;
    purchasePrice: string;
    purchasePeriod: string;
    listingDate: string;
    returnValue: string;
    imageUrl: string;
  }[];
};

type BondForm = {
  holdings: {
    bondName: string;
    duration: string;
    weight: string;
  }[];
};

type MezzanineForm = {
  holdings: {
    company: string;
    type: string;
    investmentPeriod: string;
    exitPeriod: string;
    returnRate: string;
  }[];
};

function toPerformanceForm(data: PerformanceAi): PerformanceForm {
  return {
    months: data.months.map((item) => ({
      month: item.month,
      returnValue: String(item.return),
      cumulativeReturnValue: item.cumulativeReturn === undefined ? '' : String(item.cumulativeReturn),
    })),
    recentTrades: data.recentTrades.map((item) => ({
      stockName: item.stockName,
      tradeDetail: item.tradeDetail,
      returnValue: String(item.return),
    })),
    annualAverageReturn: String(data.annualAverageReturn),
    annualAverageStockCount: String(data.annualAverageStockCount),
    annualWinRate: String(data.annualWinRate),
  };
}

function toIpoForm(data: PerformanceIpo): IpoForm {
  return {
    investments: data.investments.map((item) => ({
      stockName: item.stockName,
      purchasePrice: item.purchasePrice,
      purchasePeriod: item.purchasePeriod,
      listingDate: item.listingDate,
      returnValue: String(item.return),
      imageUrl: item.imageUrl ?? '',
    })),
  };
}

function toBondForm(data: PerformanceBonds): BondForm {
  return {
    holdings: data.holdings.map((item) => ({
      bondName: item.bondName,
      duration: String(item.duration),
      weight: String(item.weight),
    })),
  };
}

function toMezzanineForm(data: PerformanceMezzanine): MezzanineForm {
  return {
    holdings: data.holdings.map((item) => ({
      company: item.company,
      type: item.type,
      investmentPeriod: item.investmentPeriod,
      exitPeriod: item.exitPeriod,
      returnRate: item.returnRate,
    })),
  };
}

export function AdminDashboard() {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [activeSection, setActiveSection] = useState<'inquiries' | 'performance' | 'ipo' | 'bonds' | 'mezzanine'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [performanceForm, setPerformanceForm] = useState<PerformanceForm | null>(null);
  const [ipoForm, setIpoForm] = useState<IpoForm | null>(null);
  const [bondForm, setBondForm] = useState<BondForm | null>(null);
  const [mezzanineForm, setMezzanineForm] = useState<MezzanineForm | null>(null);
  const [error, setError] = useState('');
  const [inquiriesError, setInquiriesError] = useState('');
  const [performanceError, setPerformanceError] = useState('');
  const [ipoError, setIpoError] = useState('');
  const [bondError, setBondError] = useState('');
  const [mezzanineError, setMezzanineError] = useState('');
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [ipoLoading, setIpoLoading] = useState(false);
  const [bondLoading, setBondLoading] = useState(false);
  const [mezzanineLoading, setMezzanineLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [ipoSaveStatus, setIpoSaveStatus] = useState('');
  const [bondSaveStatus, setBondSaveStatus] = useState('');
  const [mezzanineSaveStatus, setMezzanineSaveStatus] = useState('');

  async function loadInquiries() {
    setInquiriesLoading(true);
    setInquiriesError('');
    try {
      const response = await fetch('/api/admin/inquiries', { credentials: 'include' });
      if (!response.ok) throw new Error('inquiries request failed');
      setInquiries(await response.json() as Inquiry[]);
    } catch {
      setInquiries(null);
      setInquiriesError('상담 신청 내역을 불러오지 못했습니다.');
    } finally {
      setInquiriesLoading(false);
    }
  }

  async function loadPerformance() {
    setPerformanceLoading(true);
    setPerformanceError('');
    try {
      const response = await fetch('/api/performance-ai');
      if (!response.ok) throw new Error('performance request failed');
      const data = await response.json() as PerformanceAi;
      if (
        !Array.isArray(data.months)
        || data.months.length !== 12
        || !Array.isArray(data.recentTrades)
        || data.recentTrades.length !== 5
        || data.recentTrades.some((item) => (
          !item
          || typeof item.stockName !== 'string'
          || item.stockName.trim().length === 0
          || typeof item.tradeDetail !== 'string'
          || item.tradeDetail.trim().length === 0
          || typeof item.return !== 'number'
          || !Number.isFinite(item.return)
        ))
      ) throw new Error('invalid performance response');
      setPerformanceForm(toPerformanceForm(data));
    } catch {
      setPerformanceForm(null);
      setPerformanceError('AI 매매 성과를 불러오지 못했습니다.');
    } finally {
      setPerformanceLoading(false);
    }
  }

  async function loadIpo() {
    setIpoLoading(true);
    setIpoError('');
    setIpoSaveStatus('');
    try {
      const response = await fetch('/api/performance-ipo');
      if (!response.ok) throw new Error('IPO performance request failed');
      const data = await response.json() as PerformanceIpo;
      if (
        !Array.isArray(data.investments)
        || data.investments.length !== 13
        || data.investments.some((item) => (
          !item
          || typeof item.stockName !== 'string'
          || !item.stockName.trim()
          || typeof item.purchasePrice !== 'string'
          || !item.purchasePrice.trim()
          || typeof item.purchasePeriod !== 'string'
          || !item.purchasePeriod.trim()
          || typeof item.listingDate !== 'string'
          || !item.listingDate.trim()
          || typeof item.return !== 'number'
          || !Number.isFinite(item.return)
        ))
      ) throw new Error('invalid IPO performance response');
      setIpoForm(toIpoForm(data));
    } catch {
      setIpoForm(null);
      setIpoError('IPO 투자 내역을 불러오지 못했습니다.');
    } finally {
      setIpoLoading(false);
    }
  }

  async function loadBonds() {
    setBondLoading(true);
    setBondError('');
    setBondSaveStatus('');
    try {
      const response = await fetch('/api/performance-bonds');
      if (!response.ok) throw new Error('bond holdings request failed');
      const data = await response.json() as PerformanceBonds;
      if (
        !Array.isArray(data.holdings)
        || data.holdings.length !== 10
        || data.holdings.some((item) => (
          !item
          || typeof item.bondName !== 'string'
          || !item.bondName.trim()
          || typeof item.duration !== 'number'
          || !Number.isFinite(item.duration)
          || typeof item.weight !== 'number'
          || !Number.isFinite(item.weight)
        ))
      ) throw new Error('invalid bond holdings response');
      setBondForm(toBondForm(data));
    } catch {
      setBondForm(null);
      setBondError('채권 보유 현황을 불러오지 못했습니다.');
    } finally {
      setBondLoading(false);
    }
  }

  async function loadMezzanine() {
    setMezzanineLoading(true);
    setMezzanineError('');
    setMezzanineSaveStatus('');
    try {
      const data = await getPerformanceMezzanine({ credentials: 'include' });
      if (
        !Array.isArray(data.holdings)
        || data.holdings.length !== 5
        || data.holdings.some((item) => (
          !item
          || typeof item.company !== 'string'
          || !item.company.trim()
          || typeof item.type !== 'string'
          || !item.type.trim()
          || typeof item.investmentPeriod !== 'string'
          || !item.investmentPeriod.trim()
          || typeof item.exitPeriod !== 'string'
          || !item.exitPeriod.trim()
          || typeof item.returnRate !== 'string'
          || !item.returnRate.trim()
        ))
      ) throw new Error('invalid mezzanine performance response');
      setMezzanineForm(toMezzanineForm(data));
    } catch {
      setMezzanineForm(null);
      setMezzanineError('메자닌 투자 내역을 불러오지 못했습니다.');
    } finally {
      setMezzanineLoading(false);
    }
  }

  useEffect(() => {
    void fetch('/api/admin/session', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) throw new Error('session request failed');
        return response.json() as Promise<{ authenticated: boolean }>;
      })
      .then((session) => {
        if (!session.authenticated) {
          setAuthStatus('unauthenticated');
          return;
        }
        setAuthStatus('authenticated');
        void loadInquiries();
        void loadPerformance();
        void loadIpo();
        void loadBonds();
        void loadMezzanine();
      })
      .catch(() => {
        setError('관리자 세션을 확인하지 못했습니다.');
        setAuthStatus('unauthenticated');
      });
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    const response = await fetch('/api/admin/login', {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) { setError('비밀번호가 올바르지 않습니다.'); return; }
    setError('');
    setAuthStatus('authenticated');
    void loadInquiries();
    void loadPerformance();
    void loadIpo();
    void loadBonds();
    void loadMezzanine();
  }

  function updateMonth(index: number, field: 'month' | 'returnValue' | 'cumulativeReturnValue', value: string) {
    setPerformanceForm((current) => {
      if (!current) return current;
      const months = current.months.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      ));
      return { ...current, months };
    });
  }

  function updateTrade(index: number, field: 'stockName' | 'tradeDetail' | 'returnValue', value: string) {
    setPerformanceForm((current) => {
      if (!current) return current;
      const recentTrades = current.recentTrades.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      ));
      return { ...current, recentTrades };
    });
  }

  async function savePerformance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!performanceForm || performanceForm.months.length !== 12 || performanceForm.recentTrades.length !== 5) {
      setSaveStatus('월별 성과 12개와 최근 매매 기록 5개 항목이 필요합니다.');
      return;
    }

    const months = performanceForm.months.map((item) => ({
      month: item.month.trim(),
      return: Number(item.returnValue),
      ...(item.cumulativeReturnValue.trim() !== ''
        ? { cumulativeReturn: Number(item.cumulativeReturnValue) }
        : {}),
    }));
    const recentTrades = performanceForm.recentTrades.map((item) => ({
      stockName: item.stockName.trim(),
      tradeDetail: item.tradeDetail.trim(),
      return: Number(item.returnValue),
    }));
    const payload = {
      months,
      recentTrades,
      annualAverageReturn: Number(performanceForm.annualAverageReturn),
      annualAverageStockCount: Number(performanceForm.annualAverageStockCount),
      annualWinRate: Number(performanceForm.annualWinRate),
    };
    if (
      months.some((item) => (
        !item.month
        || !Number.isFinite(item.return)
        || (item.cumulativeReturn !== undefined && !Number.isFinite(item.cumulativeReturn))
      ))
      || recentTrades.some((item) => (
        !item.stockName
        || !item.tradeDetail
        || !Number.isFinite(item.return)
      ))
      || !Number.isFinite(payload.annualAverageReturn)
      || !Number.isInteger(payload.annualAverageStockCount)
      || payload.annualAverageStockCount <= 0
      || !Number.isFinite(payload.annualWinRate)
    ) {
      setSaveStatus('모든 항목에 유효한 숫자와 월 라벨을 입력해 주세요.');
      return;
    }

    setSaveStatus('저장하는 중입니다.');
    try {
      const response = await fetch('/api/admin/performance-ai', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('save request failed');
      const saved = await response.json() as PerformanceAi;
      setPerformanceForm(toPerformanceForm(saved));
      setSaveStatus('저장되었습니다.');
    } catch {
      setSaveStatus('저장하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.');
    }
  }

  function updateIpo(index: number, field: 'stockName' | 'purchasePrice' | 'purchasePeriod' | 'listingDate' | 'returnValue' | 'imageUrl', value: string) {
    setIpoForm((current) => {
      if (!current) return current;
      const investments = current.investments.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      ));
      return { ...current, investments };
    });
  }

  async function uploadIpoImage(index: number, file: File) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setIpoSaveStatus('JPG, PNG 또는 WebP 이미지를 선택해 주세요.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setIpoSaveStatus('이미지는 5MB 이하만 업로드할 수 있습니다.');
      return;
    }

    setIpoSaveStatus(`투자 ${String(index + 1).padStart(2, '0')} 이미지를 업로드하는 중입니다.`);
    try {
      const bitmap = await createImageBitmap(file);
      if (bitmap.width < 1 || bitmap.height < 1) {
        bitmap.close();
        throw new Error('Invalid image dimensions');
      }
      bitmap.close();

      const response = await fetch('/api/admin/ipo-images', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const payload = await response.json() as { imageUrl?: unknown; error?: unknown };
      if (!response.ok) {
        throw new Error(typeof payload.error === 'string' ? payload.error : 'IPO image upload failed');
      }
      if (
        typeof payload.imageUrl !== 'string'
        || !/^\/api\/ipo-images\/[a-f0-9-]+\.(jpg|png|webp)$/.test(payload.imageUrl)
      ) {
        throw new Error('Invalid IPO image response');
      }
      updateIpo(index, 'imageUrl', payload.imageUrl);
      setIpoSaveStatus('이미지가 업로드되었습니다. IPO 내역 저장을 눌러 적용해 주세요.');
    } catch (error) {
      setIpoSaveStatus(
        error instanceof Error && error.message.includes('안전하게 저장')
          ? error.message
          : '이미지 파일이 손상되었거나 올바른 형식이 아닙니다. 다른 파일로 다시 시도해 주세요.',
      );
    }
  }

  async function saveIpo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ipoForm || ipoForm.investments.length !== 13) {
      setIpoSaveStatus('IPO 투자 내역 13개 항목이 필요합니다.');
      return;
    }

    const investments = ipoForm.investments.map((item) => ({
      stockName: item.stockName.trim(),
      purchasePrice: item.purchasePrice.trim(),
      purchasePeriod: item.purchasePeriod.trim(),
      listingDate: item.listingDate.trim(),
      return: Number(item.returnValue),
      ...(item.imageUrl ? { imageUrl: item.imageUrl } : {}),
    }));
    if (investments.some((item) => (
      !item.stockName
      || !item.purchasePrice
      || !item.purchasePeriod
      || !item.listingDate
      || !Number.isFinite(item.return)
    ))) {
      setIpoSaveStatus('모든 항목에 텍스트와 유효한 수익률을 입력해 주세요.');
      return;
    }

    setIpoSaveStatus('저장하는 중입니다.');
    try {
      const response = await fetch('/api/admin/performance-ipo', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investments }),
      });
      if (!response.ok) throw new Error('IPO save request failed');
      const saved = await response.json() as PerformanceIpo;
      setIpoForm(toIpoForm(saved));
      setIpoSaveStatus('저장되었습니다.');
    } catch {
      setIpoSaveStatus('저장하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.');
    }
  }

  function updateBond(index: number, field: 'bondName' | 'duration' | 'weight', value: string) {
    setBondForm((current) => {
      if (!current) return current;
      const holdings = current.holdings.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      ));
      return { ...current, holdings };
    });
  }

  async function saveBonds(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bondForm || bondForm.holdings.length !== 10) {
      setBondSaveStatus('채권 보유 현황 10개 항목이 필요합니다.');
      return;
    }

    const holdings = bondForm.holdings.map((item) => ({
      bondName: item.bondName.trim(),
      duration: Number(item.duration),
      weight: Number(item.weight),
    }));
    if (holdings.some((item) => (
      !item.bondName
      || !Number.isFinite(item.duration)
      || item.duration < 0
      || !Number.isFinite(item.weight)
      || item.weight < 0
    ))) {
      setBondSaveStatus('모든 항목에 종목명과 유효한 숫자를 입력해 주세요.');
      return;
    }

    setBondSaveStatus('저장하는 중입니다.');
    try {
      const response = await fetch('/api/admin/performance-bonds', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdings }),
      });
      if (!response.ok) throw new Error('bond holdings save request failed');
      const saved = await response.json() as PerformanceBonds;
      setBondForm(toBondForm(saved));
      setBondSaveStatus('저장되었습니다.');
    } catch {
      setBondSaveStatus('저장하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.');
    }
  }

  function updateMezzanine(index: number, field: 'company' | 'type' | 'investmentPeriod' | 'exitPeriod' | 'returnRate', value: string) {
    setMezzanineForm((current) => {
      if (!current) return current;
      const holdings = current.holdings.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      ));
      return { ...current, holdings };
    });
  }

  async function saveMezzanine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mezzanineForm || mezzanineForm.holdings.length !== 5) {
      setMezzanineSaveStatus('메자닌 투자 내역 5개 항목이 필요합니다.');
      return;
    }

    const holdings = mezzanineForm.holdings.map((item) => ({
      company: item.company.trim(),
      type: item.type.trim(),
      investmentPeriod: item.investmentPeriod.trim(),
      exitPeriod: item.exitPeriod.trim(),
      returnRate: item.returnRate.trim(),
    }));
    if (holdings.some((item) => (
      !item.company || !item.type || !item.investmentPeriod || !item.exitPeriod || !item.returnRate
    ))) {
      setMezzanineSaveStatus('모든 항목에 텍스트를 입력해 주세요.');
      return;
    }

    setMezzanineSaveStatus('저장하는 중입니다.');
    try {
      const saved = await updateAdminPerformanceMezzanine(
        { holdings },
        { credentials: 'include' },
      );
      setMezzanineForm(toMezzanineForm(saved));
      setMezzanineSaveStatus('저장되었습니다.');
    } catch {
      setMezzanineSaveStatus('저장하지 못했습니다. 입력 내용을 확인하고 다시 시도해 주세요.');
    }
  }

  if (authStatus === 'loading') {
    return <main className="admin-page"><p className="admin-state">관리자 세션을 확인하는 중입니다.</p></main>;
  }

  if (authStatus === 'unauthenticated') {
    return <main className="admin-page"><form className="admin-login" onSubmit={login}>
      <p>FORESIGHT ADMIN</p><h1>관리자 로그인</h1>
      <input className="visually-hidden" name="username" value="admin" autoComplete="username" readOnly tabIndex={-1} />
      <label>비밀번호<input name="password" type="password" autoComplete="current-password" required autoFocus /></label>
      <button type="submit">로그인</button>{error && <span>{error}</span>}
    </form></main>;
  }

  return <main className="admin-page">
    <div className="admin-dashboard">
      <header>
        <div><p>FORESIGHT ADMIN</p><h1>관리자 대시보드</h1></div>
        <button onClick={async () => {
          await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
          setAuthStatus('unauthenticated');
          setInquiries(null);
           setPerformanceForm(null);
           setIpoForm(null);
           setBondForm(null);
           setMezzanineForm(null);
           setInquiriesError('');
           setPerformanceError('');
           setIpoError('');
           setBondError('');
           setMezzanineError('');
           setIpoSaveStatus('');
           setBondSaveStatus('');
           setMezzanineSaveStatus('');
        }}>로그아웃</button>
      </header>

      <nav className="admin-tabs" aria-label="관리자 메뉴">
        <button className={activeSection === 'inquiries' ? 'is-active' : ''} onClick={() => setActiveSection('inquiries')}>
          상담 신청 내역
        </button>
        <button className={activeSection === 'performance' ? 'is-active' : ''} onClick={() => setActiveSection('performance')}>
          AI 매매 성과 관리
        </button>
        <button className={activeSection === 'ipo' ? 'is-active' : ''} onClick={() => setActiveSection('ipo')}>
          IPO 투자 내역 관리
        </button>
        <button className={activeSection === 'bonds' ? 'is-active' : ''} onClick={() => setActiveSection('bonds')}>
          채권 보유 현황 관리
        </button>
        <button className={activeSection === 'mezzanine' ? 'is-active' : ''} onClick={() => setActiveSection('mezzanine')}>
          메자닌 투자내역 관리
        </button>
      </nav>

      {error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}

      {activeSection === 'inquiries' && <section className="admin-section">
        <div className="admin-section-heading"><div><p>CONSULTATION INQUIRIES</p><h2>상담 신청 내역</h2></div>
          <button className="admin-secondary-button" onClick={() => void loadInquiries()}>새로고침</button>
        </div>
        {inquiriesLoading && <p className="admin-state">상담 신청 내역을 불러오는 중입니다.</p>}
        {!inquiriesLoading && inquiriesError && <p className="admin-feedback admin-feedback-error" role="alert">{inquiriesError}</p>}
        {!inquiriesLoading && inquiries && <div className="admin-table-wrap"><table><thead><tr>
          <th>접수일</th><th>이름</th><th>연락처</th><th>이메일</th><th>유형</th><th>문의 내용</th>
        </tr></thead><tbody>{inquiries.map((item) => <tr key={item.id}>
          <td>{new Date(item.createdAt).toLocaleString('ko-KR')}</td><td>{item.name}</td>
          <td>{item.phone}</td><td>{item.email}</td><td>{item.inquiryType}</td><td>{item.message}</td>
        </tr>)}</tbody></table>{inquiries.length === 0 && <p className="admin-empty">접수된 상담 신청이 없습니다.</p>}</div>}
      </section>}

      {activeSection === 'performance' && <section className="admin-section">
        <div className="admin-section-heading"><div><p>AI TRADING PERFORMANCE</p><h2>AI 매매 성과 관리</h2></div>
          <button className="admin-secondary-button" onClick={() => void loadPerformance()}>새로고침</button>
        </div>
        {performanceLoading && <p className="admin-state">AI 매매 성과를 불러오는 중입니다.</p>}
        {!performanceLoading && performanceError && <p className="admin-feedback admin-feedback-error" role="alert">{performanceError}</p>}
        {!performanceLoading && performanceForm && <form className="admin-performance-form" onSubmit={savePerformance}>
          <div className="admin-performance-grid">
            {performanceForm.months.map((item, index) => <label key={index}>
              <span>월 {index + 1}</span>
              <input value={item.month} onChange={(event) => updateMonth(index, 'month', event.target.value)} aria-label={`${index + 1}번째 월 라벨`} required />
              <div className="admin-return-input"><input type="number" step="0.1" value={item.returnValue} onChange={(event) => updateMonth(index, 'returnValue', event.target.value)} aria-label={`${index + 1}번째 월간 수익률`} placeholder="월간 수익률" required /><b>%</b></div>
              <div className="admin-return-input"><input type="number" step="0.1" value={item.cumulativeReturnValue} onChange={(event) => updateMonth(index, 'cumulativeReturnValue', event.target.value)} aria-label={`${index + 1}번째 누적 수익률`} placeholder="누적 수익률 (선택)" /><b>%</b></div>
            </label>)}
          </div>
          <fieldset className="admin-trades-fields">
            <legend>최근 매매 기록</legend>
            <p>실제 매도가 완료된 최근 거래 내역을 입력해 주세요.</p>
            <div className="admin-trades-grid">
              {performanceForm.recentTrades.map((item, index) => <div className="admin-trade-fields" key={index}>
                <span>거래 {index + 1}</span>
                <label>종목명<input value={item.stockName} onChange={(event) => updateTrade(index, 'stockName', event.target.value)} required /></label>
                <label>거래 내용<input value={item.tradeDetail} onChange={(event) => updateTrade(index, 'tradeDetail', event.target.value)} required /></label>
                <label>수익률<div className="admin-return-input"><input type="number" step="0.1" value={item.returnValue} onChange={(event) => updateTrade(index, 'returnValue', event.target.value)} required /><b>%</b></div></label>
              </div>)}
            </div>
          </fieldset>
          <div className="admin-summary-fields">
            <label>연평균 계좌 수익률<input type="number" step="0.1" value={performanceForm.annualAverageReturn} onChange={(event) => setPerformanceForm({ ...performanceForm, annualAverageReturn: event.target.value })} required /><b>%</b></label>
            <label>평균 종목 수<input type="number" step="1" value={performanceForm.annualAverageStockCount} onChange={(event) => setPerformanceForm({ ...performanceForm, annualAverageStockCount: event.target.value })} required /><b>개</b></label>
            <label>연간 승률<input type="number" step="0.1" value={performanceForm.annualWinRate} onChange={(event) => setPerformanceForm({ ...performanceForm, annualWinRate: event.target.value })} required /><b>%</b></label>
          </div>
          <div className="admin-form-actions"><button type="submit">성과 저장</button>{saveStatus && <span className="admin-feedback">{saveStatus}</span>}</div>
        </form>}
      </section>}

      {activeSection === 'ipo' && <section className="admin-section">
        <div className="admin-section-heading"><div><p>IPO INVESTMENT PERFORMANCE</p><h2>IPO 투자 내역 관리</h2></div>
          <button className="admin-secondary-button" onClick={() => void loadIpo()}>새로고침</button>
        </div>
        {ipoLoading && <p className="admin-state">IPO 투자 내역을 불러오는 중입니다.</p>}
        {!ipoLoading && ipoError && <p className="admin-feedback admin-feedback-error" role="alert">{ipoError}</p>}
        {!ipoLoading && !ipoError && ipoForm && <form className="admin-performance-form admin-ipo-form" onSubmit={saveIpo}>
          <p className="admin-ipo-help">공개 페이지에 표시되는 IPO 투자 내역 13개 항목을 관리합니다.</p>
          <div className="admin-ipo-grid">
            {ipoForm.investments.map((item, index) => <fieldset className="admin-ipo-fields" key={index}>
              <legend>투자 {String(index + 1).padStart(2, '0')}</legend>
              <label>투자종목<input value={item.stockName} onChange={(event) => updateIpo(index, 'stockName', event.target.value)} required /></label>
              <label>매수가격<input value={item.purchasePrice} onChange={(event) => updateIpo(index, 'purchasePrice', event.target.value)} required /></label>
              <label>매수시기<input value={item.purchasePeriod} onChange={(event) => updateIpo(index, 'purchasePeriod', event.target.value)} required /></label>
              <label>상장일<input value={item.listingDate} onChange={(event) => updateIpo(index, 'listingDate', event.target.value)} required /></label>
              <label>투자수익률<div className="admin-return-input"><input type="number" step="0.1" value={item.returnValue} onChange={(event) => updateIpo(index, 'returnValue', event.target.value)} required /><b>%</b></div></label>
              <label className="admin-ipo-image-field">
                기업 이미지
                <small>600×240px 투명 PNG 또는 WebP 권장 (가로 5:2)</small>
                {item.imageUrl ? <img src={`${item.imageUrl}?v=2`} alt={`${item.stockName} 미리보기`} /> : <span>등록된 이미지 없음</span>}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void uploadIpoImage(index, file);
                    event.target.value = '';
                  }}
                />
                {item.imageUrl && <button type="button" onClick={() => updateIpo(index, 'imageUrl', '')}>이미지 삭제</button>}
              </label>
            </fieldset>)}
          </div>
          <div className="admin-form-actions"><button type="submit">IPO 내역 저장</button>{ipoSaveStatus && <span className="admin-feedback">{ipoSaveStatus}</span>}</div>
        </form>}
      </section>}

      {activeSection === 'bonds' && <section className="admin-section">
        <div className="admin-section-heading"><div><p>BOND HOLDINGS</p><h2>채권 보유 현황 관리</h2></div>
          <button className="admin-secondary-button" onClick={() => void loadBonds()}>새로고침</button>
        </div>
        {bondLoading && <p className="admin-state">채권 보유 현황을 불러오는 중입니다.</p>}
        {!bondLoading && bondError && <p className="admin-feedback admin-feedback-error" role="alert">{bondError}</p>}
        {!bondLoading && !bondError && bondForm && <form className="admin-performance-form admin-bonds-form" onSubmit={saveBonds}>
          <p className="admin-ipo-help">공개 페이지에 표시되는 채권 보유 현황 10개 항목을 관리합니다.</p>
          <div className="admin-bonds-grid">
            {bondForm.holdings.map((item, index) => <fieldset className="admin-bond-fields" key={index}>
              <legend>채권 {String(index + 1).padStart(2, '0')}</legend>
              <label>종목명<input value={item.bondName} onChange={(event) => updateBond(index, 'bondName', event.target.value)} required /></label>
              <label>듀레이션<input type="number" min="0" step="any" value={item.duration} onChange={(event) => updateBond(index, 'duration', event.target.value)} required /></label>
              <label>비중(%)<input type="number" min="0" step="any" value={item.weight} onChange={(event) => updateBond(index, 'weight', event.target.value)} required /></label>
            </fieldset>)}
          </div>
          <div className="admin-form-actions"><button type="submit">채권 현황 저장</button>{bondSaveStatus && <span className="admin-feedback">{bondSaveStatus}</span>}</div>
        </form>}
      </section>}

      {activeSection === 'mezzanine' && <section className="admin-section">
        <div className="admin-section-heading"><div><p>MEZZANINE INVESTMENT PERFORMANCE</p><h2>메자닌 투자내역 관리</h2></div>
          <button className="admin-secondary-button" onClick={() => void loadMezzanine()}>새로고침</button>
        </div>
        {mezzanineLoading && <p className="admin-state">메자닌 투자 내역을 불러오는 중입니다.</p>}
        {!mezzanineLoading && mezzanineError && <p className="admin-feedback admin-feedback-error" role="alert">{mezzanineError}</p>}
        {!mezzanineLoading && !mezzanineError && mezzanineForm && <form className="admin-performance-form admin-mezzanine-form" onSubmit={saveMezzanine}>
          <p className="admin-ipo-help">공개 페이지에 표시되는 메자닌 투자 내역 5개 항목을 관리합니다.</p>
          <div className="admin-mezzanine-grid">
            {mezzanineForm.holdings.map((item, index) => <fieldset className="admin-mezzanine-fields" key={index}>
              <legend>투자 {String(index + 1).padStart(2, '0')}</legend>
              <label>종목명<input value={item.company} onChange={(event) => updateMezzanine(index, 'company', event.target.value)} required /></label>
              <label>구분<input value={item.type} onChange={(event) => updateMezzanine(index, 'type', event.target.value)} required /></label>
              <label>투자시기<input value={item.investmentPeriod} onChange={(event) => updateMezzanine(index, 'investmentPeriod', event.target.value)} required /></label>
              <label>회수시기<input value={item.exitPeriod} onChange={(event) => updateMezzanine(index, 'exitPeriod', event.target.value)} required /></label>
              <label>수익률<input value={item.returnRate} onChange={(event) => updateMezzanine(index, 'returnRate', event.target.value)} required /></label>
            </fieldset>)}
          </div>
          <div className="admin-form-actions"><button type="submit">메자닌 내역 저장</button>{mezzanineSaveStatus && <span className="admin-feedback">{mezzanineSaveStatus}</span>}</div>
        </form>}
      </section>}
    </div>
  </main>;
}