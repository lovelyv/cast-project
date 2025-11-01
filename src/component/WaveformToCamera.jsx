import React from 'react'

// WaveformToCamera: SVG animation where a centered waveform transforms
// into a simplified camera silhouette. Uses SMIL animate for broad support.
export default function WaveformToCamera({ width = '100%', height = 180, className }) {
  const W = 900
  const H = 180
  const left = 60
  const right = 840
  const midY = 90
  const bars = 64
  const step = (right - left) / bars
  const barWidth = Math.max(6, step * 0.65)

  // Build a simple sine wave path across the width
  const buildSinePath = (y, amp, lambda, phase = 0) => {
    const pts = []
    for (let x = 0; x <= W; x += 20) {
      const yy = y + amp * Math.sin((2 * Math.PI * x) / lambda + phase)
      pts.push(`${x},${yy}`)
    }
    return `M ${pts[0]} L ${pts.slice(1).join(' ')}`
  }

  // Camera silhouette bounds
  const camLeft = 220
  const camRight = 680
  const camTop = 36
  const camBottom = 144
  const bumpLeft = 520
  const bumpRight = 640
  const bumpTop = 20

  const rects = Array.from({ length: bars }, (_, i) => {
    const x = left + i * step + (step - barWidth) / 2
    const cx = x + barWidth / 2
    const t = (cx - left) / (right - left)

    // Initial waveform heights
    const A = 36
    const base = 20 + A * (0.6 + 0.4 * Math.sin(2 * Math.PI * (3 * t)))
    const y0 = midY - base / 2
    const h0 = base

    // Target camera silhouette
    let topEdge = midY - 2
    let heightTarget = 4
    if (cx >= camLeft && cx <= camRight) {
      topEdge = (cx >= bumpLeft && cx <= bumpRight) ? bumpTop : camTop
      heightTarget = camBottom - topEdge
    }

    return { x, y0, h0, y1: topEdge, h1: heightTarget }
  })

  const ease = '0.25 0.1 0.25 1'

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Waveform morphing into a camera silhouette</title>
      <desc id="desc">Vertical waveform bars reshape to fill a rounded camera body silhouette with a subtle top bump, while a lens overlay fades in.</desc>

      <defs>
        <linearGradient id="panelGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f3b4b" />
          <stop offset="100%" stopColor="#364154" />
        </linearGradient>
        <linearGradient id="accent2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a59" />
          <stop offset="100%" stopColor="#ff4d5a" />
        </linearGradient>
      </defs>

      {/* Panel */}
      <rect x="0" y="0" width={W} height={H} rx="16" fill="url(#panelGrad2)" />

      {/* Soundwaves moving toward the camera region, then fading */}
      <g stroke="url(#accent2)" strokeWidth="2.5" fill="none" opacity="0.9">
        <path d={buildSinePath(midY, 18, 140, 0)}>
          <animateTransform attributeName="transform" type="translate" from="-60 0" to="60 0" dur="1.6s" fill="freeze" />
        </path>
        <path d={buildSinePath(midY, 10, 90, Math.PI / 3)} opacity="0.7">
          <animateTransform attributeName="transform" type="translate" from="-40 0" to="40 0" dur="1.6s" fill="freeze" />
        </path>
        <path d={buildSinePath(midY, 6, 60, Math.PI / 1.5)} opacity="0.55">
          <animateTransform attributeName="transform" type="translate" from="-30 0" to="30 0" dur="1.6s" fill="freeze" />
        </path>
        {/* Fade waves out as the camera outline appears */}
        <animate attributeName="opacity" from="0.9" to="0" dur="0.6s" begin="1.4s" fill="freeze" />
      </g>

      {/* Camera outline (final state) */}
      <g opacity="0">
        <rect x={camLeft} y={camTop} width={camRight - camLeft} height={camBottom - camTop} rx="14" fill="none" stroke="#e6edf5" strokeWidth="2.5" />
        <rect x={bumpLeft} y={bumpTop} width={bumpRight - bumpLeft} height={camTop - bumpTop} rx="8" fill="none" stroke="#e6edf5" strokeWidth="2.5" />
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.6s" fill="freeze" />
      </g>

      {/* Bars morphing from waveform to camera silhouette */}
      <g fill="url(#accent2)" shapeRendering="crispEdges" opacity="1">
        {rects.map((r, idx) => (
          <rect key={idx} x={r.x} y={r.y0} width={barWidth} height={r.h0} rx="2">
            <animate attributeName="y" from={r.y0} to={r.y1} dur="2.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines={ease} />
            <animate attributeName="height" from={r.h0} to={r.h1} dur="2.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines={ease} />
          </rect>
        ))}
        {/* Fade bars out so only the outline remains */}
        <animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="1.8s" fill="freeze" />
      </g>


      {/* Soft overlay for subtle gloss */}
      <rect x="0" y="0" width={W} height={H} rx="16" fill="#ffffff" opacity="0.04" />
    </svg>
  )
}
