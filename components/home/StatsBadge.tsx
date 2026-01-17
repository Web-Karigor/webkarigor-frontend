export default function StatsBadge() {
    return (
      <div className="flex items-start gap-2">
        {/* 8 */}
        <h2 className="stats-number leading-none">8</h2>
  
        {/* + Years */}
        <div className="flex flex-col justify-start">
          <span className="stats-plus leading-none text-start mt-16 -ml-1">+</span>
          <span className="stats-pill stats-years leading-none -mt-6 px-10">Years</span>
        </div>
      </div>
    );
  }
  