export function FrontEndVisual() {
  return (
    <div className="ai-visual-front flex h-full items-end p-3">
      <div className="w-full rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-0.5 text-[#38F8AB] text-[9px]">★★★★★</div>
          <span className="text-[9px] font-semibold text-white/75">4.0</span>
        </div>
        <div className="mb-2 flex justify-end gap-2">
          {[
            { v: 75, c: "#38F8AB" },
            { v: 70, c: "#FFEF3F" },
          ].map((r) => (
            <div
              key={r.v}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[7px] font-bold text-white"
              style={{ borderColor: r.c }}
            >
              {r.v}%
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1.5">
          {[38, 58, 30, 72, 46, 64].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: h,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg,#38F8AB,#15D286)"
                    : "linear-gradient(180deg,#FFEF3F,#E4D20E)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AIVisual() {
  return (
    <div className="ai-visual-ai flex h-full flex-col justify-end p-3">
      <div className="grid grid-cols-4 gap-1.5">
        {["⌘", "✦", "↻", "☀"].map((icon) => (
          <div
            key={icon}
            className="flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xs text-white/90 backdrop-blur-md"
          >
            {icon}
          </div>
        ))}
      </div>
      <div className="mt-2.5 rounded-full border border-[#38F8AB]/35 bg-[#38F8AB]/12 py-2 text-center text-[11px] font-semibold text-[#38F8AB]">
        Generate
      </div>
    </div>
  );
}

export function BackendVisual() {
  return (
    <div className="ai-visual-backend relative h-full p-3">
      <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="aiBackendGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38F8AB" />
            <stop offset="100%" stopColor="#00B4FF" />
          </linearGradient>
        </defs>
        {[
          "M30,100 L110,100 L110,55 L190,55",
          "M70,120 L150,120 L150,75 L230,75",
          "M190,100 L270,100",
        ].map((d) => (
          <path key={d} d={d} stroke="url(#aiBackendGlow)" strokeWidth="1.5" fill="none" opacity="0.75" />
        ))}
        {[
          [30, 100],
          [110, 55],
          [190, 55],
          [230, 75],
          [270, 100],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#38F8AB" />
        ))}
        <text x="200" y="42" fill="rgba(56,248,171,0.4)" fontSize="30" fontWeight="700">
          161
        </text>
      </svg>
    </div>
  );
}

export function ProductVisual() {
  return (
    <div className="ai-visual-product flex h-full items-center justify-center p-3">
      <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden>
        <rect x="82" y="22" width="58" height="104" rx="10" fill="none" stroke="#5ecbff" strokeWidth="2" />
        <rect x="90" y="34" width="42" height="72" rx="4" fill="rgba(94,203,255,0.1)" />
        <text x="100" y="56" fill="#8fd6ff" fontSize="9" fontWeight="700">
          UI
        </text>
        <text x="100" y="74" fill="#8fd6ff" fontSize="9" fontWeight="700">
          UX
        </text>
        <path
          d="M158 52 L198 40 L238 56 L198 72 Z"
          fill="rgba(56,248,171,0.1)"
          stroke="#38F8AB"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function CrossPlatformVisual() {
  return (
    <div className="ai-visual-cross flex h-full items-center justify-center p-3">
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        <rect x="32" y="26" width="48" height="80" rx="8" fill="none" stroke="#d8fff0" strokeWidth="2" />
        <rect x="40" y="36" width="32" height="56" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="186" y="42" width="68" height="46" rx="6" fill="none" stroke="#d8fff0" strokeWidth="2" />
        <rect x="194" y="50" width="52" height="30" rx="2" fill="rgba(255,255,255,0.06)" />
        <path d="M88 68 H104 V60 H120 V76 H104 V68 H88 Z" fill="#38F8AB" />
        <path d="M148 68 H164 V60 H180 V76 H164 V68 H148 Z" fill="#38F8AB" />
      </svg>
    </div>
  );
}

export function BrandVisual() {
  const items = [
    { label: "Strategy", x: 34, y: 22 },
    { label: "Marketing", x: 214, y: 16 },
    { label: "Logo", x: 22, y: 86 },
    { label: "Design", x: 232, y: 90 },
    { label: "Advertising", x: 68, y: 116 },
    { label: "Identity", x: 184, y: 116 },
  ];

  return (
    <div className="ai-visual-brand flex h-full items-center justify-center p-2">
      <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden>
        <ellipse cx="140" cy="68" rx="32" ry="20" fill="rgba(255,239,63,0.15)" stroke="#FFEF3F" strokeWidth="1.5" />
        <text x="140" y="73" textAnchor="middle" fill="#FFEF3F" fontSize="10" fontWeight="700">
          BRAND
        </text>
        {items.map((item) => (
          <g key={item.label}>
            <circle cx={item.x} cy={item.y} r="15" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" />
            <text x={item.x} y={item.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="6.5">
              {item.label}
            </text>
            <line x1="140" y1="68" x2={item.x} y2={item.y} stroke="rgba(255,255,255,0.14)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

