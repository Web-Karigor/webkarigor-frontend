import React from "react";

const images = [
  "/s1.png",
  "/s2.png",
  "/s3.png",
  "/s4.png",
];

const HeroSlider = () => {
  return (
    <section className="slanted-wrapper lg:-mt-[260px] md:-mt-[180px] -mt-[160px]">
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
