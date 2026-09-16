import { homeContent } from '../content';

type HeaderProps = {
  variant?: 'overlay' | 'solid';
};

export function Header({ variant = 'overlay' }: HeaderProps) {
  const isHome = window.location.pathname === import.meta.env.BASE_URL
    || window.location.pathname.endsWith('/life-asset-management/');

  const resolveHref = (href: string) => {
    if (href.startsWith('#')) {
      return isHome ? href : `${import.meta.env.BASE_URL}${href}`;
    }

    return `${import.meta.env.BASE_URL}${href.replace(/^\/+/, '')}`;
  };

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
            src={`${import.meta.env.BASE_URL}images/foresight-logo-final.png`}
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
        
        <div className="header-right">
          <div className="lang-switch" data-testid="lang-switch">
            {homeContent.header.languages.map((lang, index) => (
              <a key={index} href="#" data-testid={`lang-link-${index}`} style={{ fontWeight: index === 0 ? 700 : 400 }}>
                {lang}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
