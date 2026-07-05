export default function ConnectedFeatures() {
  return (
    <section className="solution-wrapper">
      <div className="text-center mb-20">
        <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
          Center of Solution
        </span>

        <h2 className="mt-8 flex flex-wrap items-center justify-center text-[48px] leading-[140%]">
          <span className="relative inline-block -translate-x-4 -translate-y-2 section-accent-text">
            Path to
          </span>
          <span className="relative inline-block translate-x-4 translate-y-4 font-montserrat font-bold text-[#111]">
            Your Solution
          </span>
        </h2>
      </div>

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
}
