import {useState} from 'react'
import {CaretUp, Check, SpeakerHigh, WifiHigh} from '@/components/icons'
import {SectionHead} from '@/components/SectionHead'
import {TrayIcon} from '@/components/TrayIcon'

const STATES = [
  {zone: 'safe', filled: true, label: 'Safe', sub: '80 dB or less'},
  {zone: 'warn', filled: true, label: 'Caution', sub: '80 to 85 dB'},
  {zone: 'danger', filled: true, label: 'Too loud', sub: 'Above 85 dB'},
  {zone: 'safe', filled: false, label: 'Limiter off', sub: 'Ring only'},
]

const FACTS = [
  ['Starts with Windows', 'Optional. Goes straight to the tray with no window and no admin rights needed.'],
  ['Close means hide', 'The close button tucks it away. Quit lives in the tray menu.'],
  ['One instance', 'Launch it again and the existing window comes forward.'],
  ['Calm colors', 'The icon averages about 2 seconds of audio, so it doesn’t flicker on every drum hit.'],
]

function TaskbarMock() {
  const [menu, setMenu] = useState(false)
  const [on, setOn] = useState(true)

  return (
    <div className="reveal min-w-0" style={{'--d': '120ms'}}>
      <div className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-line-strong bg-panel select-none">
        <div className="relative flex justify-end px-3 pb-2">
          {menu ? (
            <div className="caption-1 mr-12 w-52 rounded-lg border border-line-strong bg-panel-2 p-1 font-normal">
              <div className="rounded-md px-3 py-2 text-dim">Open limiterdB</div>
              <button
                type="button"
                onClick={() => setOn(!on)}
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left transition-colors duration-300 ease-base hover:bg-panel-3"
              >
                <span className="w-4 text-limit">{on && <Check size={14} weight="bold" aria-hidden />}</span>
                Limiter on
              </button>
              <div className="my-1 h-px bg-line-strong" />
              <div className="rounded-md px-3 py-2 text-dim">Quit</div>
            </div>
          ) : (
            <div className="caption-5 mr-8 w-60 rounded-md border border-line-strong bg-panel-2 px-3 py-2">
              <div className="text-fg">limiterdB · about 68 dB · Safe</div>
              <div className="text-dim">7 days: 23% of safe limit</div>
              <div className="text-dim">{on ? 'Limiter on (70 dB)' : 'Limiter off'}</div>
            </div>
          )}
        </div>

        {/* Windows 11 taskbar */}
        <div className="caption-5 relative flex h-12 items-center bg-ink/80 px-3 text-dim backdrop-blur">
          <div className="flex flex-1 justify-center gap-2" aria-hidden>
            {['bg-fg/80', 'bg-panel-3', 'bg-panel-3', 'bg-panel-3'].map((c, i) => (
              <span key={i} className={`size-5 rounded-sm ${c}`} />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <CaretUp size={14} className="mx-1 text-mute" aria-hidden />
            <button
              type="button"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-label="limiterdB tray icon, click for menu"
              className="grid size-8 cursor-pointer place-items-center rounded-md bg-panel-3 ring-1 ring-limit/60 transition-shadow duration-300 ease-base hover:ring-limit active:scale-98"
            >
              <TrayIcon zone="safe" filled={on} size={18} />
            </button>
            <WifiHigh size={16} className="mx-1 hidden sm:block" aria-hidden />
            <SpeakerHigh size={16} className="mx-1 hidden sm:block" aria-hidden />
            <span className="ml-2 flex flex-col items-end tabular-nums">
              <span className="text-fg">21:48</span>
              <span>07/10/2026</span>
            </span>
          </div>
        </div>
      </div>
      <p className="caption-5 mt-3 text-mute">Click the tray icon to open its menu.</p>
    </div>
  )
}

export function Tray() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-10">
          <SectionHead label="In the background" title="Close the window. It keeps working.">
            Like the iPhone feature it's modelled on, limiterdB is meant to run all the time. It lives in the system
            tray, and the icon tells you how loud things are without opening anything.
          </SectionHead>

          <ul className="reveal grid grid-cols-2 gap-3 sm:grid-cols-4" style={{'--d': '100ms'}}>
            {STATES.map((s) => (
              <li
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-line bg-panel px-2 py-4 text-center"
              >
                <TrayIcon zone={s.zone} filled={s.filled} size={32} />
                <span className="title-4">{s.label}</span>
                <span className="caption-5 text-mute">{s.sub}</span>
              </li>
            ))}
          </ul>

          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {FACTS.map(([t, d], i) => (
              <div key={t} className="reveal flex flex-col gap-1" style={{'--d': `${150 + i * 60}ms`}}>
                <dt className="title-3">{t}</dt>
                <dd className="body-6 text-dim">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <TaskbarMock />
      </div>
    </section>
  )
}
