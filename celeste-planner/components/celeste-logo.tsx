export function CelesteLogo({ size = "lg" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="celesteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer circle with glow */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#celesteGradient)" strokeWidth="2" filter="url(#glow)" />

        {/* Inner decorative circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#celesteGradient)" strokeWidth="1" opacity="0.5" />

        {/* Star shape in center - represents celestial elegance */}
        <path
          d="M 50 15 L 61 35 L 83 35 L 67 48 L 78 68 L 50 55 L 22 68 L 33 48 L 17 35 L 39 35 Z"
          fill="url(#celesteGradient)"
          opacity="0.9"
        />

        {/* Decorative dots around the circle */}
        <circle cx="50" cy="10" r="2" fill="url(#celesteGradient)" opacity="0.6" />
        <circle cx="90" cy="50" r="2" fill="url(#celesteGradient)" opacity="0.6" />
        <circle cx="50" cy="90" r="2" fill="url(#celesteGradient)" opacity="0.6" />
        <circle cx="10" cy="50" r="2" fill="url(#celesteGradient)" opacity="0.6" />
      </svg>
    </div>
  )
}
