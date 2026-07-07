import { CLIENT_LOGOS } from "@/lib/services-data";

export default function ServiceClients() {
  return (
    <section className="service-clients">
      <div className="service-section-wrap">
        <div className="service-section-head service-section-head--center">
          <span className="service-badge">Our Clients</span>
          <h2 className="service-section-title">Trusted by Growing Brands</h2>
          <p className="service-section-desc">
            We partner with ambitious teams worldwide to design, build, and scale
            products that users love and businesses rely on.
          </p>
        </div>

        <div className="service-client-grid">
          {CLIENT_LOGOS.map((name) => (
            <div key={name} className="service-client-card">
              <span className="service-client-name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
