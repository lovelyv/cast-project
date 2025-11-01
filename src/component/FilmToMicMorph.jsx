import React from 'react'

// FilmToMicMorph: An inline SVG animation where film reel perforation holes
// subtly morph (translate + stretch) into microphone grille lines.
// Uses SVG animateTransform for broad browser support without extra deps.
export default function FilmToMicMorph({ width = '100%', height = 180, className }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 900 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Film perforations morph into microphone grille lines</title>
      <desc id="desc">An abstract animation: left/right film-reel holes glide inward and stretch into horizontal bars resembling a microphone grille.</desc>

      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f3b4b" />
          <stop offset="100%" stopColor="#364154" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a59" />
          <stop offset="100%" stopColor="#ff4d5a" />
        </linearGradient>
      </defs>

      {/* Background panel */}
      <rect x="0" y="0" width="900" height="180" rx="16" fill="url(#panelGrad)" />

      {/* Group A: film perforation holes on left and right */}
      <g fill="#e6edf5" opacity="0.9">
        {/* Left column holes -> morph inward */}
        {[-60, -30, 0, 30, 60].map((dy, idx) => (
          <circle key={`l${idx}`} cx={60} cy={90 + dy} r={10}>
            <animateTransform attributeName="transform" type="translate" from="0 0" to="370 0" dur="3s" fill="freeze" />
            <animateTransform attributeName="transform" additive="sum" type="scale" from="1 1" to="14 0.5" dur="3s" fill="freeze" />
          </circle>
        ))}
        {/* Right column holes -> morph inward */}
        {[ -60, -30, 0, 30, 60].map((dy, idx) => (
          <circle key={`r${idx}`} cx={840} cy={90 + dy} r={10}>
            <animateTransform attributeName="transform" type="translate" from="0 0" to="-370 0" dur="3s" fill="freeze" />
            <animateTransform attributeName="transform" additive="sum" type="scale" from="1 1" to="14 0.5" dur="3s" fill="freeze" />
          </circle>
        ))}
      </g>

      {/* Group B: microphone grille lines fade in, aligned with final positions */}
      <g fill="url(#accentGrad)" opacity="0">
        {[ -60, -30, 0, 30, 60].map((dy, idx) => (
          <rect key={`g${idx}`} x={140} y={88 + dy} width={620} height={4} rx={2} />
        ))}
        <animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="1.6s" fill="freeze" />
      </g>

      {/* Optional soft edge highlight to add dimension */}
      <rect x="0" y="0" width="900" height="180" rx="16" fill="#ffffff" opacity="0.04" />
    </svg>
  )
}
