import { homeContent } from '../content';

export function TrackRecord() {
  const { trackRecord } = homeContent;

  return (
    <section id="track-record" className="track-record" data-testid="section-track-record">
      <div className="track-record-inner">
        <header className="track-record-header">
          <h2>
            Track record<span>.</span>
          </h2>
          <h3>{trackRecord.title}</h3>
        </header>

        <div className="track-record-grid">
          {trackRecord.items.map((item, index) => (
            <article className="track-record-card" key={item.title}>
              <span className="track-record-number">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <h4>{item.title}</h4>
              <ul>
                {item.metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}