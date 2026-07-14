import Image from "next/image";

/**
 * Figma collage map (photos do not overlap each other):
 * 1. lg         — top-right, LARGEST (+ blue accent at bottom-right corner)
 * 2. md-left    — middle-left, medium
 * 3. sm         — center, SMALLEST
 * 4. md-bottom  — bottom-left, 2nd largest
 * 5. md-right   — bottom-right, medium
 */
const TEAM_PHOTOS = [
  {
    src: "/sm1.png",
    className: "eco-team-shot eco-team-shot--md-left",
    alt: "Team member — middle left",
  },
  {
    src: "/h2.png",
    className: "eco-team-shot eco-team-shot--sm",
    alt: "Team member — center small",
  },
  {
    src: "/sm3.jpg",
    className: "eco-team-shot eco-team-shot--md-bottom",
    alt: "Team member — bottom left",
  },
  {
    src: "/sm4.png",
    className: "eco-team-shot eco-team-shot--md-right",
    alt: "Team member — bottom right",
  },
] as const;

export default function EcoTeam() {
  return (
    <section className="eco-team">
      <div className="eco-team-oval" aria-hidden />

      <div className="eco-team-shell">
        <h2 className="eco-team-title">
          Expert Team
          <br />
          Big Result
        </h2>

        <div className="eco-team-collage">
          <div className="eco-team-dot-grid" aria-hidden />

          {/* Largest card — blue circle locked to bottom-right corner */}
          <div className="eco-team-shot eco-team-shot--lg">
            <div className="eco-team-shot-media">
              <Image
                src="/sm2.jpg"
                alt="Team member — top right"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 180px, 240px"
              />
            </div>
            <span className="eco-team-accent-dot" aria-hidden />
          </div>

          {TEAM_PHOTOS.map((photo) => (
            <div key={photo.className} className={photo.className}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 240px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
