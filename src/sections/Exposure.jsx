import {SectionHead} from '@/components/SectionHead'
import {cn} from '@/lib/cn'

// A consistent example week: 23% total, roughly 78 dB average over about 14.6 hours.
const DAYS = [
  {d: 'Thu', pct: 2},
  {d: 'Fri', pct: 5},
  {d: 'Sat', pct: 3},
  {d: 'Sun', pct: 0},
  {d: 'Mon', pct: 4},
  {d: 'Tue', pct: 6},
  {d: 'Today', pct: 3},
]
const DAILY_SHARE = 100 / 7
const CHART_MAX = 20
const CHART_H = 160

const POINTS = [
  '100% means 80 dB on average for 40 hours in 7 days.',
  'Stay under about 14% a day and the week never runs out.',
  'Keeps logging while it sits in the tray.',
  '30 days of history, stored only on your PC.',
]

function Panel() {
  const week = DAYS.reduce((s, x) => s + x.pct, 0)
  const y = (pct) => (pct / CHART_MAX) * CHART_H

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-panel">
      <div className="caption-4 flex gap-1 px-4 py-2" aria-hidden>
        <span className="px-2 py-1 text-mute">Limiter</span>
        <span className="rounded-md bg-panel-3 px-2 py-1 text-fg">Exposure</span>
        <span className="px-2 py-1 text-mute">Settings</span>
      </div>

      <div className="flex flex-col gap-6 p-4 pt-2">
        <div className="flex flex-col gap-3 rounded-lg bg-panel-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="caption-4 text-dim">Last 7 days</span>
              <span className="heading-2 font-mono tabular-nums">{week}%</span>
              <span className="caption-5 text-mute">of the WHO weekly safe limit</span>
            </div>
            <span className="caption-3 flex items-center gap-2 rounded-full border border-line-strong px-3 py-1">
              <span className="size-2 rounded-full bg-safe" />
              Safe
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-panel-3">
            <div className="reveal-x h-full origin-left rounded-full bg-safe" style={{width: `${week}%`}} />
          </div>
          <p className="caption-5 text-dim">
            Average <span className="text-fg">about 78 dB</span> over <span className="text-fg">14 h 36 min</span>.
            Budget left this week: <span className="text-fg">100+ h</span> at 70 dB (your limit).
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="caption-4 flex items-baseline justify-between">
            <span className="text-dim">Per day, as % of weekly budget</span>
            <span className="caption-5 flex items-center gap-2 text-mute">
              <span className="inline-block w-4 border-t border-dashed border-dim" />
              daily share ({Math.round(DAILY_SHARE)}%)
            </span>
          </div>
          <div className="relative mt-2 ml-8" style={{height: CHART_H}}>
            {[0, 10, 20].map((t) => (
              <div key={t} className="absolute inset-x-0 border-t border-line" style={{bottom: y(t)}}>
                <span className="caption-5 absolute -left-8 w-6 -translate-y-1/2 text-right font-mono text-mute">
                  {t}%
                </span>
              </div>
            ))}
            <div className="absolute inset-x-0 border-t border-dashed border-dim/60" style={{bottom: y(DAILY_SHARE)}} />
            <div className="absolute inset-0 flex items-end">
              {DAYS.map((x, i) => (
                <div key={x.d} className="flex h-full flex-1 flex-col items-center justify-end px-1 sm:px-2">
                  <div
                    className={cn('reveal w-full max-w-8 rounded-t-sm', x.d === 'Today' ? 'bg-limit' : 'bg-safe/80')}
                    style={{height: x.pct ? Math.max(2, y(x.pct)) : 0, '--d': `${i * 60}ms`}}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="ml-8 flex">
            {DAYS.map((x) => (
              <span
                key={x.d}
                className={cn('caption-5 flex-1 text-center font-mono', x.d === 'Today' ? 'text-fg' : 'text-mute')}
              >
                {x.d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Exposure() {
  return (
    <section id="exposure" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal order-2 lg:order-1" style={{'--d': '100ms'}}>
          <Panel />
          <p className="caption-5 mt-3 text-mute">Example week. Interface shown in English.</p>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHead label="Exposure" title="It counts the dose, not just the moment.">
            Ten minutes at 90 dB and three hours at 70 dB are not the same thing. limiterdB logs every second you're
            actually listening and adds up the energy, day by day. It's the same yardstick iPhone uses for Headphone
            Audio Levels.
          </SectionHead>

          <div className="reveal flex flex-col gap-6" style={{'--d': '150ms'}}>
            <code className="caption-1 rounded-lg border border-line bg-panel px-4 py-3 font-mono">
              dose = Σ seconds × 10<sup>(dB − 80) / 10</sup> ÷ 40 h
            </code>
            <ul className="body-6 grid gap-x-8 gap-y-3 text-dim sm:grid-cols-2">
              {POINTS.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-0.5 w-3 shrink-0 rounded-full bg-limit" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
