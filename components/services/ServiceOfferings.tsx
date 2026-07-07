import { SERVICE_OFFERINGS } from "@/lib/services-data";

export default function ServiceOfferings() {
  return (
    <section className="service-offerings">
      <div className="service-section-wrap">
        <div className="service-offerings-head">
          <div>
            <span className="service-badge">What We Do</span>
            <h2 className="service-section-title service-section-title--left">
              Design Solutions Tailored to Your Business
            </h2>
          </div>
          <p className="service-offerings-intro">
            From idea to execution, we help build brands through modern software,
            intuitive design, and strategic product thinking that drives real
            business results.
          </p>
        </div>

        <div className="service-offerings-grid">
          {SERVICE_OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`service-offering-card service-offering-card--${item.variant}`}
              >
                <div className="service-offering-icon">
                  <Icon strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="service-offering-title">{item.title}</h3>
                <p className="service-offering-desc">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
