import {SectionHead} from '@/components/SectionHead'
import {cn} from '@/lib/cn'

const STEPS = [
  {
    title: 'Pick a hearing limit',
    body: 'In dB SPL, the unit a sound meter shows. Quiet (60), Comfortable (70) or Loud (80), or anything from 50 to 90.',
  },
  {
    title: 'Measure every 50 ms',
    body: 'Windows reports the peak of whatever is playing, measured before the master volume. Spotify, YouTube, games and calls all count.',
  },
  {
    title: 'Down fast, up slow',
    body: 'Too loud? Each tick closes half the gap to the target, so spikes are tamed in about 100 to 200 ms. When it calms down, volume creeps back about 2% a second, so there is no pumping.',
  },
  {
    title: 'Follow the device',
    body: 'Checks the default output every 0.5 s. Switch from headphones to speakers and limiterdB moves with you, along with that device’s calibration.',
  },
]

function Term({value, label, tone}) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className={cn('heading-5 sm:heading-4 font-mono tabular-nums', tone)}>{value}</span>
      <span className="caption-5 text-center text-mute">{label}</span>
    </span>
  )
}

const Op = ({children}) => <span className="heading-6 pb-6 text-mute">{children}</span>

function Example({title, track, volume, heard, note, clamped}) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="title-3">{title}</span>
        <span className="caption-4 text-mute">{note}</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-4">
        <Term value="100" label="Device dB" />
        <Op>+</Op>
        <Term value={track} label="Track dBFS" />
        <Op>+</Op>
        <Term value={volume} label="Volume dB" tone={clamped ? 'text-fg' : 'text-dim'} />
        <Op>=</Op>
        <Term value={heard} label="You hear" tone="text-limit" />
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <SectionHead label="How it works" title="It doesn't touch your audio. It moves the volume.">
        No driver, no audio processing, nothing in the signal path. limiterdB reads the level Windows already reports
        and turns the master volume down just enough, then back up when it's safe.
      </SectionHead>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="reveal flex flex-col gap-3 rounded-2xl border border-line bg-panel p-6"
            style={{'--d': `${i * 60}ms`}}
          >
            <span className="caption-3 font-mono text-limit tabular-nums">0{i + 1}</span>
            <h3 className="title-2">{s.title}</h3>
            <p className="body-6 text-dim">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="reveal flex flex-col gap-4">
          <h3 className="heading-5">The whole trick, in one line</h3>
          <p className="body-3 text-dim">
            Windows only knows <span className="text-fg">dBFS</span>, how big the digital signal is. Your ears care
            about <span className="text-fg">dB SPL</span>. The bridge is how loud your device gets at 100% volume:
          </p>
          <code className="caption-1 rounded-lg border border-line bg-panel px-4 py-3 font-mono text-fg">
            dB SPL ≈ device at 100% + track (dBFS) + volume (dB)
          </code>
          <p className="body-6 text-mute">
            Example: headphones reach about 100 dB at full volume. With a 70 dB limit, the track may peak at −30 dBFS
            before the volume has to come down.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="reveal" style={{'--d': '80ms'}}>
            <Example title="Loud chorus" note="turned down" track="−6" volume="−24" heard="70" clamped />
          </div>
          <div className="reveal" style={{'--d': '160ms'}}>
            <Example title="Quiet intro" note="left alone" track="−35" volume="0" heard="65" />
          </div>
        </div>
      </div>
    </section>
  )
}
