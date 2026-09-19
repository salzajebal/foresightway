export const homeContent = {
  header: {
    navLinks: [
      {
        text: "회사소개",
        href: "#company",
        children: [
          { text: "CEO 인사말", href: "ceo-greeting" },
          { text: "회사 개요", href: "company-overview" }
        ]
      },
      {
        text: "사업영역",
        href: "#business",
        children: [
          { text: "AI 매매", href: "ai-trading" },
          { text: "IPO", href: "ipo" },
          { text: "채권", href: "bonds" },
          { text: "메자닌", href: "mezzanine" },
          { text: "FA", href: "fa" }
        ]
      },
      {
        text: "투자전략",
        href: "#strategy",
        children: [
          { text: "투자철학", href: "investment-philosophy" },
          { text: "리스크관리", href: "risk-management" }
        ]
      },
      {
        text: "운용성과",
        href: "#performance",
        children: [
          { text: "AI 매매", href: "performance-ai" },
          { text: "IPO", href: "performance-ipo" },
          { text: "채권", href: "performance-bonds" },
          { text: "메자닌", href: "performance-mezzanine" }
        ]
      },
      {
        text: "고객지원",
        href: "#support",
        children: [
          { text: "상담문의", href: "#contact-inquiry" }
        ]
      }
    ]
  },
  hero: {
    phrases: [
      "미래를 가늠하는 선견,\n투자의 새로운 지평을 엽니다",
      "변화하는 시장 속에서도 흔들리지 않는 포지셔닝으로\n고객 자산이 나아갈 명확한 방향을 제시합니다.",
      "데이터와 원칙으로 설계하는\n“포사이트투자자문”"
    ]
  },
  companyIntro: {
    summary: "올바른 전략은 데이터 기반의 객관적 분석과 시장의 흐름을 읽는 혜안이 함께할 때 비로소 진정한 가치를 발휘합니다.",
    description: "포사이트투자자문은 급변하는 시장 환경 속에서도 고객 자산이 나아갈 방향을 명확하게 제시합니다. AI 알고리즘을 활용한 상시 운용부터 우량 IPO 종목 전략까지, 어떤 환경에서도 자산이 지속적으로 성장할 수 있는 최적의 솔루션을 제공합니다.",
    points: [
      "자본시장법에 정식 등록된 제도권 금융 투자자문사",
      "정밀 데이터 분석 기반의 입체적 올인원 자문 서비스",
      "개인 및 법인 맞춤형 자산 최적화 포지셔닝"
    ]
  },
  businessAreas: [
    {
      id: "ai-trading",
      title: "AI 트레이딩",
      englishTitle: "AI Trading & Systematic",
      description: "데이터와 알고리즘 기반의 정교한 매매 시스템을 통해 코어 계좌의 안정적인 수익을 다집니다.",
      audience: "일반 고객",
      tags: "AI / 알고리즘"
    },
    {
      id: "ipo",
      title: "IPO",
      englishTitle: "IPO & Private Fund",
      description: "우량 기업의 성장 전 단계에 조합 형태로 참여하여, IPO 출구 전략을 통한 최적의 중장기 수익 포지션을 확보합니다.",
      audience: "일반 고객",
      tags: "조합투자 / IPO"
    },
    {
      id: "bonds",
      title: "채권",
      englishTitle: "Bond & Fixed Income",
      description: "국공채부터 회사채까지 금리와 신용도를 다각도로 분석하여 안정적인 채권 포트폴리오를 제공합니다.",
      audience: "법인 고객",
      tags: "국공채 / 회사채"
    },
    {
      id: "mezzanine",
      title: "메자닌",
      englishTitle: "Mezzanine Investment",
      description: "CB·BW 등 채권의 하방 안정성과 주식의 상방 수익성을 동시에 겨냥하는 입체적 투자를 집행합니다.",
      audience: "전문 고객",
      tags: "전환사채 / 메자닌"
    }
  ],
  investmentPhilosophy: {
    title: "세 가지 투자 원칙.",
    subtitle: "시장은 예측할 수 없지만,\n판단하는 방식은 정할 수 있습니다.",
    principles: [
      {
        title: "정량적 데이터 검증",
        englishTitle: "Data-Driven Analysis",
        description: "주관적인 감정이나 추측을 배제하고, AI 기반의 정밀한 데이터와 알고리즘 검증을 거친 투자만을 집행합니다."
      },
      {
        title: "입체적 자산 배분",
        englishTitle: "Multi-Asset Allocation",
        description: "AI 상시 매매, Pre-IPO, 채권, 메자닌 등 시장 환경에 따른 다각화된 전략으로 최적의 위험 대비 수익률을 도출합니다."
      },
      {
        title: "이벤트 드리븐",
        englishTitle: "Event-Driven",
        description: "시장의 전반적인 상승·하락 방향성에 의존하지 않고, 확실한 모멘텀이 존재하는 이벤트 시나리오에 집중하여 안정적인 알파수익을 도출합니다."
      }
    ]
  },
  performance: {
    title: "운용성과",
    subtitle: "입체적 전략과 원칙으로 축적된 성공적인 운용 사례를 소개합니다.",
    cases: [
      {
        id: "performance-ai",
        tag: "AI TRADING",
        title: "AI 알고리즘 매매 성과",
        description: "정밀한 데이터 분석과 고도화된 매매 시스템을 통해 시장 변동성을 방어하고 안정적인 상시 수익을 달성한 운용 사례입니다."
      },
      {
        id: "performance-ipo",
        tag: "IPO",
        title: "공모주 사모조합 투자 내역",
        description: "상장 전(IPO) 우량 기업 발굴 및 공모주 조합 참여를 통해 최적의 엑시트(Exit) 전략을 성공적으로 실행한 중장기 성과입니다."
      },
      {
        id: "performance-bonds",
        tag: "BOND",
        title: "맞춤형 채권 포트폴리오",
        description: "국공채부터 우량 회사채까지 금리 환경과 신용도를 다각도로 분석하여 안정적인 이자 수익과 자본 차익을 실현한 사례입니다."
      },
      {
        id: "performance-mezzanine",
        tag: "MEZZANINE",
        title: "메자닌 투자 성과",
        description: "전환사채(CB), 신주인수권부사채(BW) 등 채권의 하방 안정성과 주식의 상방 수익성을 동시에 확보한 입체적 투자 사례입니다."
      }
    ]
  },
  trackRecord: {
    title: "포사이트가 증명하는 수치상의 신뢰.",
    items: [
      {
        title: "일반 투자자문",
        metrics: [
          "수익 잔고: 580억 원 +",
          "총 계약수: 1,240건 +"
        ],
        description: "개인 투자자를 위한 AI 데이터 기반의 1:1 맞춤형 자산 관리"
      },
      {
        title: "투자조합",
        metrics: [
          "누적투자 유치: 2,780억 원 +",
          "투자 기업수: 14건"
        ],
        description: "유망 성장 기업 발굴부터 상장 단계까지 이르는 사모 투자조합 결성 및 운용"
      },
      {
        title: "기관 투자자문",
        metrics: [
          "수임 잔고: 300억 원 +",
          "총 계약수: 4건"
        ],
        description: "법인 및 기관 자금의 안정적인 유동성·채권 운용"
      },
      {
        title: "전문 투자자문",
        metrics: [
          "자문 잔고: 180억 원 +",
          "총 계약수: 10건"
        ],
        description: "전환사채(CB) 및 메자닌 구조화 전략 중심의 전문 자문"
      }
    ]
  },
  faq: [
    {
      question: "어떤 투자 전략을 제공하나요?",
      answers: [
        "포사이트투자자문은 AI 트레이딩, Pre-IPO·사모조합, 채권, 메자닌의 4가지 핵심 영역에서 차별화된 투자 전략을 제공합니다.",
        "운용의 바탕이 되는 핵심 원칙은 정량적 데이터 검증, 입체적 자산 배분, 고객 맞춤형 포지셔닝입니다. 단기 시장 테마나 주관적 추측을 배제하고 AI 기반의 정밀한 데이터와 다각화된 포트폴리오로 시장 변동성을 뛰어넘는 안정적인 수익을 추구합니다. 모든 전략은 개인·전문·법인 고객의 투자 성향과 재무 목표에 맞춰 1:1 전용으로 설계됩니다."
      ]
    },
    {
      question: "투자자문은 어떤 방식으로 진행되나요?",
      answers: [
        "전문 자문역과의 1:1 진단을 통해 고객의 자산 규모와 투자 목적을 다각도로 분석합니다. 이후 포사이트의 핵심 4대 전략인 AI 트레이딩, Pre-IPO, 채권, 메자닌 중 최적의 포트폴리오를 구성하여 제공하며, 주기적인 리포트와 상시 피드백을 통해 자산이 안정적으로 운용되도록 밀착 관리합니다."
      ]
    },
    {
      question: "초보 투자자도 이용할 수 있나요?",
      answers: [
        "네, 가능합니다. 포사이트투자자문은 복잡하고 어려운 금융 시장을 데이터와 시스템 기반으로 쉽게 풀어냅니다. 전문 지식이 부족하더라도 맞춤형 전략 컨설팅과 정기적인 운용 브리핑을 통해 누구나 안심하고 체계적인 자산 관리를 시작할 수 있습니다."
      ]
    },
    {
      question: "투자 성향에 맞는 상담이 가능한가요?",
      answers: [
        "가능합니다. 포사이트투자자문은 일반 개인 투자자부터 전문 및 법인 투자자까지 각 고객층의 목표 수익률과 유동성 요구 수준을 세밀히 파악합니다. 안정적인 이자 수익을 원하는 고객에게는 채권 포트폴리오를, 높은 성장성을 기대하는 고객에게는 Pre-IPO 및 메자닌·AI 트레이딩을 결합한 1:1 전용 포지셔닝을 제안합니다."
      ]
    }
  ],
  sections: [
    {
      id: "different",
      title: "What make us different?",
      subtitle: "AI",
      heading: "AI 기반의\n투자 프로세스",
      paragraphs: [
        "데이터와 알고리즘 기반의 정교한 매매로\n상시 계좌의 안정적인 수익을 다집니다."
      ]
    },
    {
      id: "engagement",
      subtitle: "RISK CONTROL",
      heading: "체계적인\n리스크 관리",
      paragraphs: [
        "단순한 수익 추구보다 자산 보호와\n리스크 관리 원칙을 우선합니다."
      ]
    },
    {
      id: "culture",
      subtitle: "CUSTOMIZED ADVISORY",
      heading: "빈틈없는\n맞춤형 투자자문",
      paragraphs: [
        "고객의 성향과 목적에 맞춘 올인원\n포지셔닝으로 최적의 자산 관리를 제공합니다."
      ]
    }
  ],
  footer: {
    partners: [
      { name: "금융감독원", url: "https://www.fss.or.kr/", logo: "fss.png" },
      { name: "금융위원회", url: "https://www.fsc.go.kr/", logo: "fsc.png" },
      { name: "금융투자협회", url: "https://www.kofia.or.kr/", logo: "kofia.ico" },
      { name: "DART", url: "https://dart.fss.or.kr/", logo: "dart.png" },
      { name: "파인(FINE)", url: "https://fine.fss.or.kr/", logo: "fine.ico" },
      { name: "KOSCOM", url: "https://www.koscom.co.kr/", logo: "koscom.png" },
      { name: "키움증권", url: "https://www.kiwoom.com/", logo: "kiwoom.png" },
      { name: "카카오페이증권", url: "https://www.kakaopaysec.com/", logo: "kakaopaysec.png" },
      { name: "DB금융투자", url: "https://www.db-fi.com/", logo: "dbfi.png" },
      { name: "삼성증권", url: "https://www.samsungpop.com/", logo: "samsung.ico" },
      { name: "미래에셋증권", url: "https://securities.miraeasset.com/", logo: "mirae.png" },
      { name: "KB증권", url: "https://www.kbsec.com/", logo: "kbsec.ico" }
    ],
    tagline: "데이터와 원칙으로 고객 자산의 방향을 제시합니다.",
    companyName: "주식회사 포사이트투자자문",
    representative: "김관국",
    businessNumber: "660-87-01893",
    address: "서울특별시 영등포구 국제금융로8길 11, 1161호 (여의도동, 대영빌딩)",
    phone: "070-8018-6409",
    email: "info@foresightway.com",
    copyright: "© 2020 FORESIGHT INVESTMENT ADVISORY. All rights reserved."
  }
};
