import React from "react";

const images = ["/s1.png", "/s2.png", "/s3.png", "/s4.png"];

const TrustedFounders: React.FC = () => {
  return (
    <section className="trusted-wrapper">
      <div className="trusted-layout">
        
        {/* LEFT TEXT */}
        <div className="trusted-text -mb-[280px] ml-[100px]">
          <span className="trusted-badge">Testimonials</span>
          <h2 className="trusted-heading text-[72px] font-bold">
            Trusted <br />
            by <br />
            <span className="text-[#BABABA] font-museoModerno font-bold">Founders</span>
          </h2>
        </div>

        {/* RIGHT IMAGES */}
        <div className="trusted-image-row">
          {images.map((src, index) => (
            <div
              key={index}
              className={`trusted-image-card size-${index + 1}`}
            >
              <img src={src} alt={`slide-${index}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedFounders;
