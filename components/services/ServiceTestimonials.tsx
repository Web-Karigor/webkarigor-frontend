import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/services-data";

function Stars({ count }: { count: number }) {
  return (
    <div className="service-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} className="service-star-icon" fill="currentColor" aria-hidden />
      ))}
    </div>
  );
}

export default function ServiceTestimonials() {
  return (
    <section className="service-testimonials">
      <div className="service-section-wrap">
        <div className="service-section-head service-section-head--center">
          <span className="service-badge">Testimonials</span>
          <h2 className="service-section-title">What Our Clients Say</h2>
        </div>

        <div className="service-testimonials-grid">
          <article className="service-rating-card">
            <span className="service-rating-value">4.9</span>
            <Stars count={5} />
            <p className="service-rating-label">Average Rating</p>
            <p className="service-rating-sub">
              Based on 200+ completed projects worldwide
            </p>
          </article>

          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="service-testimonial-card">
              <Stars count={item.rating} />
              <p className="service-testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <div>
                <p className="service-testimonial-name">{item.name}</p>
                <p className="service-testimonial-role">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
