import React from "react";

const ConnectedFeatures = () => {
  return (
    <section className="solution-wrapper">
      <p className="solution-pill">Center of Solution</p>
      <h2 className="solution-title">
        <span>Path to</span> Your Solution
      </h2>

      <div className="solution-area">

        {/* SVG CONNECTIONS */}
        <svg
          className="solution-lines"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          {/* top left */}
          <path d="M500 350 C350 300, 250 220, 200 160" />
          {/* top center */}
          <path d="M500 350 C500 260, 500 220, 500 160" />
          {/* top right */}
          <path d="M500 350 C650 300, 750 220, 800 160" />

          {/* bottom left */}
          <path d="M500 350 C350 420, 250 500, 200 560" />
          {/* bottom center */}
          <path d="M500 350 C500 440, 500 500, 500 560" />
          {/* bottom right */}
          <path d="M500 350 C650 420, 750 500, 800 560" />
        </svg>

        {/* TOP CARDS */}
        <div className="card top left">Front-End Excellence</div>
        <div className="card top center">AI-Driven Smart Solutions</div>
        <div className="card top right">Scalable Back-End Technology</div>

        {/* CENTER NODE */}
        <div className="center-node">UI.</div>

        {/* BOTTOM CARDS */}
        <div className="card bottom left">Long-Term Product Thinking</div>
        <div className="card bottom center">Cross-Platform Consistency</div>
        <div className="card bottom right">Branding Feels Trustworthy</div>
      </div>
    </section>
  );
};

export default ConnectedFeatures;
