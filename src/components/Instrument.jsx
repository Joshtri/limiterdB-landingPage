import {useRef, useState} from 'react'
import {Minus, Square, X} from '@/components/icons'
import {cn} from '@/lib/cn'
import {PRESETS, ZONE, zoneOf} from '@/lib/hearing'
import {useInView} from '@/lib/useInView'
import {DEVICE_MAX_SPL, useSimulatedLimiter} from '@/lib/useSimulatedLimiter'
import {Meter} from './Meter'

const TOLERANCE_DB = 1.5

function message({enabled, avgSrc, avgHeard, limit}) {
  const over = avgHeard > limit + TOLERANCE_DB
  if (!enabled) {
    return over
      ? `Limiter off. You're hearing more than your ${limit} dB limit.`
      : `Limiter off. Still under your ${limit} dB limit.`
  }
  if (over) return 'Spike detected. Turning the volume down.'
  if (avgSrc > limit + TOLERANCE_DB) {
    return `This part is loud (about ${Math.round(avgSrc)} dB unlimited). Holding it near ${Math.round(avgHeard)} dB.`
  }
  return 'Quiet enough. Volume left alone.'
}

function Switch({checked, onChange}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Limiter"
      onClick={() => onChange(!checked)}
      className="title-5 group flex cursor-pointer items-center gap-2 rounded-full text-dim active:scale-98"
    >
      <span className="hidden sm:inline">Limiter</span>
      <span
        className={cn(
          'relative h-5 w-9 rounded-full transition-colors duration-300 ease-base',
          checked ? 'bg-limit' : 'bg-panel-3'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-4 rounded-full transition-transform duration-300 ease-base',
            checked ? 'translate-x-4 bg-ink' : 'bg-fg'
          )}
        />
      </span>
    </button>
  )
}

const TINT = {
  safe: 'border-safe/30 bg-safe/10',
  warn: 'border-warn/30 bg-warn/10',
  danger: 'border-danger/40 bg-danger/10',
}

/**
 * Mock of the limiterdB window, "Limiter" tab, driven by a simulated track.
 * Text is translated to English; the real app is in Indonesian.
 */
export function Instrument() {
  const ref = useRef(null)
  const running = useInView(ref)
  const [limit, setLimit] = useState(70)
  const [enabled, setEnabled] = useState(true)
  const s = useSimulatedLimiter({targetSpl: limit, enabled, running})

  const zone = zoneOf(s.avgHeard)
  const style = ZONE[zone]
  const fill = ((limit - 50) / 40) * 100

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line-strong bg-panel">
      {/* Windows 11 title bar */}
      <div className="caption-4 flex h-8 items-center justify-between bg-ink/40 pl-3 text-dim">
        <span className="flex items-center gap-2">
          <img src="/appicon.png" alt="" className="size-4" />
          limiterdB
        </span>
        <span className="flex h-full text-mute" aria-hidden>
          <span className="grid w-10 place-items-center"><Minus size={12} /></span>
          <span className="grid w-10 place-items-center"><Square size={10} /></span>
          <span className="grid w-10 place-items-center"><X size={12} /></span>
        </span>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <div className="caption-4 flex gap-1" aria-hidden>
          <span className="rounded-md bg-panel-3 px-2 py-1 text-fg">Limiter</span>
          <span className="px-2 py-1 text-mute">Exposure</span>
          <span className="px-2 py-1 text-mute">Settings</span>
        </div>
        <Switch checked={enabled} onChange={setEnabled} />
      </div>

      <div className="flex flex-col gap-4 p-4 pt-2">
        <div className="caption-4 flex items-center justify-between gap-3 rounded-lg bg-panel-2 px-3 py-2">
          <span className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-safe" />
            <span className="truncate">Headphones (Bluetooth)</span>
          </span>
          <span className="shrink-0 font-mono text-mute">~{DEVICE_MAX_SPL} dB at 100%</span>
        </div>

        <div className={cn('flex items-center gap-4 rounded-lg border p-4 transition-colors duration-500 ease-base', TINT[zone])}>
          <div className="flex min-w-20 flex-col items-center">
            <span className={cn('heading-3 font-mono tabular-nums', style.text)}>~{Math.round(s.avgHeard)}</span>
            <span className="caption-5 mt-1 font-mono text-mute">dB SPL</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={cn('body-4 flex items-center gap-2', style.text)}>
              <span className={cn('size-2 rounded-full', style.bg)} />
              {style.label}
            </span>
            <span className="caption-5 text-dim">
              {message({enabled, avgSrc: s.avgSrc, avgHeard: s.avgHeard, limit})}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-panel-2 p-4">
          <Meter label="Without limiter" hint="the track itself" spl={s.srcSpl} limitSpl={limit} />
          <Meter label="What you hear" hint="after limiter" spl={s.heardSpl} limitSpl={limit} showScale />
          <div className="caption-4 flex items-center gap-3">
            <span className="w-28 shrink-0 text-dim">Windows volume</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-panel-3">
              <div
                className="absolute inset-0 origin-left rounded-full bg-fg transition-transform duration-100 ease-base"
                style={{transform: `scaleX(${s.volume})`}}
              />
            </div>
            <span className="w-10 text-right font-mono text-fg tabular-nums">{Math.round(s.volume * 100)}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <label htmlFor="demo-limit" className="title-4">
              Hearing limit
            </label>
            <span className="caption-4 font-mono text-limit tabular-nums">{limit} dB SPL</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.spl}
                type="button"
                onClick={() => setLimit(p.spl)}
                aria-pressed={limit === p.spl}
                className={cn(
                  'flex cursor-pointer flex-col items-start rounded-lg border px-3 py-2 text-left transition-colors duration-300 ease-base active:scale-98',
                  limit === p.spl ? 'border-limit/60 bg-limit/10' : 'border-line bg-panel-2 hover:border-line-strong'
                )}
              >
                <span className="caption-3 flex w-full flex-wrap items-baseline justify-between gap-x-1">
                  {p.label}
                  <span className="font-mono font-normal text-dim">{p.spl}</span>
                </span>
                <span className="caption-5 hidden text-mute sm:block">{p.desc}</span>
              </button>
            ))}
          </div>
          <input
            id="demo-limit"
            type="range"
            min={50}
            max={90}
            step={1}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="limit-range"
            style={{'--fill': `${fill}%`}}
          />
        </div>
      </div>

      <div className="caption-5 flex items-center justify-between bg-ink/40 px-4 py-2 text-mute">
        <span>Simulated track · {s.section}</span>
        <span>Drag the limit to try it</span>
      </div>
    </div>
  )
}
