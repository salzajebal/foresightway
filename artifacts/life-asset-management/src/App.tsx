import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyIntro } from './components/CompanyIntro';
import { InvestmentFeatures } from './components/InvestmentFeatures';
import { BusinessAreas } from './components/BusinessAreas';
import { InvestmentPhilosophy } from './components/InvestmentPhilosophy';
import { Performance } from './components/Performance';
import { TrackRecord } from './components/TrackRecord';
import { Consulting } from './components/Consulting';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { CeoGreeting } from './components/CeoGreeting';
import { CompanyOverview } from './components/CompanyOverview';
import { AiTrading } from './components/AiTrading';
import { Ipo } from './components/Ipo';
import { Bonds } from './components/Bonds';
import { Mezzanine } from './components/Mezzanine';
import { Fa } from './components/Fa';
import { InvestmentPhilosophyPage } from './components/InvestmentPhilosophyPage';
import { RiskManagement } from './components/RiskManagement';
import { PerformanceAi } from './components/PerformanceAi';
import { PerformanceIpo } from './components/PerformanceIpo';
import { PerformanceBonds } from './components/PerformanceBonds';
import { PerformanceMezzanine } from './components/PerformanceMezzanine';

export default function App() {
  if (window.location.pathname.endsWith('/admin')) {
    return <AdminDashboard />;
  }

  if (window.location.pathname.endsWith('/risk-management')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <RiskManagement />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/ceo-greeting')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <CeoGreeting />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/company-overview')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <CompanyOverview />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/ai-trading')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <AiTrading />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/ipo')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <Ipo />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/bonds')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <Bonds />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/mezzanine')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <Mezzanine />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/fa')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <Fa />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/investment-philosophy')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <InvestmentPhilosophyPage />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/performance-ai')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <PerformanceAi />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/performance-ipo')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <PerformanceIpo />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/performance-bonds')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <PerformanceBonds />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname.endsWith('/performance-mezzanine')) {
    return (
      <div className="app-wrapper">
        <Header variant="solid" />
        <PerformanceMezzanine />
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView();
    });
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <Hero />
      
      <main>
        <InvestmentFeatures />
        <CompanyIntro />
        <BusinessAreas />
        <InvestmentPhilosophy />
        <Performance />
        <TrackRecord />
        <Consulting />
        <Faq />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
