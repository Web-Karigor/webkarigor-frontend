export default function StatsBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <h2 className="stats-number leading-none">8</h2>

      <div className="flex flex-col items-start">
        <span className="stats-plus leading-none">+</span>
        <span className="stats-pill stats-years leading-none px-4 md:px-6">
          Years
        </span>
      </div>
    </div>
  );
}
