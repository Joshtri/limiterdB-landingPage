import {cn} from '@/lib/cn'
import {LIMIT_SPL, SAFE_SPL, splToPct, ZONE, zoneOf} from '@/lib/hearing'

const TICKS = [40, 50, 60, 70, 80, 90, 100, 110]

/** Horizontal dB SPL meter, mirrors SplMeter in the app. Yellow line = hearing limit. */
export function Meter({label, hint, spl, limitSpl, showScale}) {
  const zone = zoneOf(spl)
  const style = ZONE[zone]
  const safe = splToPct(SAFE_SPL)
  const limit = splToPct(LIMIT_SPL)

  return (
    <div className="flex flex-col gap-2">
      <div className="caption-4 flex items-baseline justify-between gap-2">
        <span className="text-dim">
          {label}
          <span className="ml-2 font-normal text-mute">{hint}</span>
        </span>
        <span className="flex items-baseline gap-2 font-mono tabular-nums">
          <span className={style.text}>{style.label}</span>
          <span className="w-16 text-right text-fg">~{Math.round(spl)} dB</span>
        </span>
      </div>

      <div className="relative h-4 overflow-hidden rounded-sm bg-panel-3">
        <div className="absolute inset-y-0 left-0 bg-safe/15" style={{width: `${safe}%`}} />
        <div className="absolute inset-y-0 bg-warn/20" style={{left: `${safe}%`, width: `${limit - safe}%`}} />
        <div className="absolute inset-y-0 right-0 bg-danger/20" style={{left: `${limit}%`}} />
        <div
          className={cn('absolute inset-y-0.5 left-0 w-full origin-left transition-transform duration-100 ease-base', style.bg)}
          style={{transform: `scaleX(${splToPct(spl) / 100})`}}
        />
        {limitSpl != null && (
          <div
            className="absolute inset-0 transition-transform duration-300 ease-base"
            style={{transform: `translateX(${splToPct(limitSpl)}%)`}}
            aria-hidden
          >
            <div className="absolute inset-y-0 -left-0.5 w-1 bg-limit" />
          </div>
        )}
      </div>

      {showScale && (
        <div className="caption-5 relative h-4 font-mono text-mute tabular-nums">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
              style={{left: `${splToPct(t)}%`}}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
