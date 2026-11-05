// Versi SVG dari ikon tray yang digambar app (internal/tray/icon.go):
// lingkaran warna zona + tiga bar putih; limiter mati → hanya cincin.
const COLORS = {silent: '#9ca3af', safe: '#22c55e', warn: '#f59e0b', danger: '#ef4444'}
const BARS = [
  [9.5, 17],
  [14.5, 12],
  [19.5, 8],
]

export function TrayIcon({zone = 'safe', filled = true, size = 32, className}) {
  const c = COLORS[zone]
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      {filled ? (
        <circle cx="16" cy="16" r="15" fill={c} />
      ) : (
        <circle cx="16" cy="16" r="13.25" fill="none" stroke={c} strokeWidth="3.5" />
      )}
      {BARS.map(([x, y]) => (
        <rect key={x} x={x} y={y} width="3" height={23 - y} fill={filled ? '#fff' : c} />
      ))}
    </svg>
  )
}
