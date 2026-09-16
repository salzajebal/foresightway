import { type ReactNode } from 'react';

interface SectionProps {
  id: string;
  subtitle?: string;
  heading?: string;
  paragraphs: string[];
  supertitle?: string;
  altBg?: boolean;
  darkBg?: boolean;
  reverse?: boolean;
}

export function Section({ id, subtitle, heading, paragraphs, supertitle, altBg, darkBg, reverse }: SectionProps) {
  const isDifferent = supertitle?.includes('different?');
  
  return (
    <section 
      id={id} 
      className={`section ${altBg ? 'section-alt' : ''} ${darkBg ? 'section-dark' : ''}`}
      data-testid={`section-${id}`}
    >
      {supertitle && (
        <div className="text-center">
          <h2 className="section-supertitle" data-testid={`supertitle-${id}`}>
            {isDifferent ? (
              <>
                What make us <span className="highlight">different?</span>
              </>
            ) : supertitle}
          </h2>
        </div>
      )}
      
      <div className={`section-content ${reverse ? 'section-reverse' : ''}`}>
        <div className="section-header">
          {subtitle && (
            <div className="section-subtitle" data-testid={`subtitle-${id}`}>
              {subtitle}
            </div>
          )}
          {heading && (
            <h3 className="section-heading" data-testid={`heading-${id}`}>
              {heading}
            </h3>
          )}
        </div>
        
        <div className="section-body" data-testid={`body-${id}`}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
