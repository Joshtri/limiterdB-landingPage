import {SectionHead} from '@/components/SectionHead'

const DEFAULTS = [
  ['Headphones', 100],
  ['Headset', 100],
  ['Speakers', 85],
  ['Monitor or TV (HDMI)', 85],
  ['Anything else', 95],
]

const STEPS = [
  'Play some music.',
  'Hold your phone’s mic where your ear would be. For headphones, press it against the ear cup.',
  'Read the average from any sound meter app and type it in.',
]

const LIMITS = [
  'Numbers are estimates. Uncalibrated, they can be off by about 10 dB either way. After calibration, usually within a few.',
  'It errs loud: the estimate comes from peaks, not average energy, so it reads a little high. That is the safe direction.',
  'Changing volume on the headphones themselves (a separate hardware knob) breaks calibration. Calibrate again.',
  'It moves the master volume and doesn’t process audio. There is a 50 to 100 ms delay, so a very sudden hit can slip through for a moment.',
  'A helpful tool, not a medical device.',
]

const card = 'reveal flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6'

export function Accuracy() {
  return (
    <section id="accuracy" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <SectionHead label="Accuracy" title="Honest about its own numbers.">
        Windows has no idea how loud your headphones actually are. So limiterdB starts from a sensible estimate for the
        kind of device, and lets you measure the real thing with the sound meter app on your phone.
      </SectionHead>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className={card}>
          <h3 className="heading-6">Starting estimates</h3>
          <p className="body-6 text-dim">Detected automatically from Windows. Loudness at 100% volume:</p>
          <ul className="body-6 flex flex-col divide-y divide-line">
            {DEFAULTS.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between py-3">
                <span>{k}</span>
                <span className="font-mono text-dim tabular-nums">~{v} dB</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={card} style={{'--d': '80ms'}}>
          <h3 className="heading-6">Calibrate in a minute</h3>
          <ol className="body-6 flex flex-col gap-4 text-dim">
            {STEPS.map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="caption-3 grid size-6 shrink-0 place-items-center rounded-full bg-limit/15 font-mono text-limit">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
          <p className="caption-5 mt-auto rounded-lg bg-panel-2 px-3 py-2 text-dim">
            Saved per device. Plug in different headphones and they get their own number.
          </p>
        </div>

        <div className={card} style={{'--d': '160ms'}}>
          <h3 className="heading-6">What it can’t do</h3>
          <ul className="body-6 flex flex-col gap-3 text-dim">
            {LIMITS.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-warn" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
