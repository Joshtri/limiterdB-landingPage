import {SectionHead} from '@/components/SectionHead'
import {cn} from '@/lib/cn'
import {fmtDuration, weeklyHoursAt, ZONE, zoneOf} from '@/lib/hearing'

const ROWS = [
  {spl: 80, label: 'Heavy traffic'},
  {spl: 83, label: ''},
  {spl: 86, label: ''},
  {spl: 89, label: ''},
  {spl: 94, label: 'Motorbike up close'},
  {spl: 100, label: 'Earbuds at max volume, a concert'},
]

export function Budget() {
  const max = weeklyHoursAt(ROWS[0].spl)

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHead label="Why it matters" title="Loud isn't a feeling. It's a time budget.">
          The WHO puts a safe week of listening at an average of <span className="text-fg">80 dB for 40 hours</span>.
          Every 3 dB louder halves that. Turn your earbuds all the way up and the whole week's allowance is gone in
          under half an hour. Hearing damage doesn't grow back.
        </SectionHead>

        <div className="reveal flex flex-col rounded-2xl border border-line bg-panel p-6" style={{'--d': '120ms'}}>
          <div className="caption-4 mb-2 flex justify-between text-mute">
            <span>Level</span>
            <span>Safe listening per week</span>
          </div>
          <ol className="flex flex-col divide-y divide-line">
            {ROWS.map((r, i) => {
              const hours = weeklyHoursAt(r.spl)
              const last = i === ROWS.length - 1
              return (
                <li key={r.spl} className="grid grid-cols-[4rem_1fr_auto] items-center gap-4 py-4">
                  <span className="heading-6 font-mono tabular-nums">
                    {r.spl}
                    <span className="caption-5 ml-1 text-mute">dB</span>
                  </span>
                  <span className="flex min-w-0 flex-col gap-2">
                    <span className="relative h-2 overflow-hidden rounded-full bg-panel-3">
                      <span
                        className={cn('reveal-x absolute inset-y-0 left-0 block origin-left rounded-full', ZONE[zoneOf(r.spl)].bg)}
                        style={{width: `${Math.max(1, (hours / max) * 100)}%`, '--d': `${200 + i * 80}ms`}}
                      />
                    </span>
                    {r.label && <span className="caption-5 truncate text-mute">{r.label}</span>}
                  </span>
                  <span className={cn('caption-1 font-mono tabular-nums', last ? 'text-danger' : 'text-fg')}>
                    {fmtDuration(hours)}
                  </span>
                </li>
              )
            })}
          </ol>
          <p className="caption-5 mt-4 text-mute">
            Equal energy rule (3 dB exchange rate), the same reference iPhone uses for Headphone Audio Levels. Levels
            are approximate.
          </p>
        </div>
      </div>
    </section>
  )
}
