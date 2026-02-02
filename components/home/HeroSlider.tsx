import React from "react";

const images = [
  "/s1.png",
  "/s2.png",
  "/s3.png",
  "/s4.png",
];

const HeroSlider = () => {
  return (
    <section className="slanted-wrapper -mt-[260px]">
      <div className="slanted-container">
        {images.map((src, index) => (
          <div key={index} className={`slanted-card card-${index + 1}`}>
            <img src={src} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
