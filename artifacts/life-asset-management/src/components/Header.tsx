import { useEffect, useState } from 'react';
import { homeContent } from '../content';

type HeaderProps = {
  variant?: 'overlay' | 'solid';
};

export function Header({ variant = 'overlay' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = window.location.pathname === import.meta.env.BASE_URL
    || window.location.pathname.endsWith('/life-asset-management/');

  const resolveHref = (href: string) => {
    if (href.startsWith('#')) {
      return isHome ? href : `${import.meta.env.BASE_URL}${href}`;
    }

    return `${import.meta.env.BASE_URL}${href.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`header header--${variant}`} data-testid="header">
      <div className="header-inner">
        <a
          className="logo-container"
          href={import.meta.env.BASE_URL}
          aria-label="포사이트 투자자문 홈"
          data-testid="link-logo"
        >
          <img
            className="logo-image"
            src={`${import.meta.env.BASE_URL}images/${
              variant === 'overlay'
                ? 'foresight-hero-logo.png'
                : 'foresight-brand-logo.png'
            }`}
            alt="FORESIGHT INVESTMENT 포사이트 투자자문"
            data-testid="img-logo"
          />
        </a>
        
        <nav className="nav-desktop" data-testid="nav-desktop">
          {homeContent.header.navLinks.map((link, index) => (
            <div className="nav-item" key={link.text}>
              <a
                className="nav-link"
                href={resolveHref(link.href)}
                data-testid={`nav-link-${index}`}
              >
                {link.text}
                <span className="nav-chevron" aria-hidden="true">⌄</span>
              </a>
              <div className="nav-dropdown" data-testid={`nav-dropdown-${index}`}>
                {link.children.map((child) => (
                  <a key={child.text} href={resolveHref(child.href)}>
                    {child.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="전체 메뉴 열기"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu-layer${isMobileMenuOpen ? ' is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="전체 메뉴 닫기"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="모바일 전체 메뉴">
          <div className="mobile-navigation-header">
            <strong>전체 메뉴</strong>
            <button type="button" aria-label="전체 메뉴 닫기" onClick={() => setIsMobileMenuOpen(false)}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="mobile-navigation-list">
            {homeContent.header.navLinks.map((link) => (
              <section key={link.text} className="mobile-navigation-group">
                <a className="mobile-navigation-parent" href={resolveHref(link.href)} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.text}
                </a>
                <div className="mobile-navigation-children">
                  {link.children.map((child) => (
                    <a key={child.text} href={resolveHref(child.href)} onClick={() => setIsMobileMenuOpen(false)}>
                      {child.text}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
