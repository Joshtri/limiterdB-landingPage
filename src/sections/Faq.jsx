import {useEffect} from 'react'
import {Plus} from '@/components/icons'
import {SectionHead} from '@/components/SectionHead'

const QA = [
  [
    'apps',
    'Does it work with Spotify, YouTube, games and Discord?',
    'Yes. It reads the level of the default output device and adjusts the Windows master volume, so it doesn’t matter which app is making the sound.',
  ],
  [
    'quality',
    'Will it make my music sound worse?',
    'No. It never touches the audio itself: no compression, no EQ, nothing in the signal path. It only does what you’d do with the volume keys, just faster and more consistently.',
  ],
  [
    'iphone',
    'Is it the same as iPhone’s “Reduce Loud Audio”?',
    'Same idea, same WHO reference for the weekly dose. The difference is that iPhone knows exactly how loud AirPods get, while on Windows the device loudness is an estimate until you calibrate it.',
  ],
  [
    'privacy',
    'What does it collect?',
    'Nothing leaves your machine. Settings and 30 days of exposure history are plain JSON files in %APPDATA%\\limiterdB. There is no account, no analytics and no update ping.',
  ],
  [
    'language',
    'What language is the app in?',
    'The interface is currently in Bahasa Indonesia. Screens on this page are translated so you can see what each part does.',
  ],
  [
    'smartscreen',
    'Windows says “Windows protected your PC”. Is it safe?',
    'The app isn’t code signed yet, so SmartScreen doesn’t know it. Click More info, then Run anyway. Every download is built by GitHub Actions from the public source, and each release lists SHA-256 checksums you can compare.',
  ],
  ['platforms', 'Mac or Linux?', 'Not today. It is built directly on WASAPI, the Windows audio API.'],
  [
    'cost',
    'What does it cost?',
    'Nothing. It’s a free, open source side project. Issues and pull requests are welcome on GitHub.',
  ],
]

// Open the matching answer when a link points at it (footer "Privacy" goes to #privacy).
function useOpenFromHash() {
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(location.hash.slice(1))
      if (el?.tagName === 'DETAILS') el.open = true
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])
}

export function Faq() {
  useOpenFromHash()
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <SectionHead label="FAQ" title="Questions you might have." />
        <div className="reveal flex flex-col divide-y divide-line rounded-2xl border border-line bg-panel px-6" style={{'--d': '100ms'}}>
          {QA.map(([id, q, a]) => (
            <details key={id} id={id} className="group">
              <summary className="title-2 flex cursor-pointer items-center justify-between gap-6 py-6 transition-colors duration-300 ease-base hover:text-limit">
                {q}
                <Plus
                  size={20}
                  className="shrink-0 text-mute transition-transform duration-500 ease-base group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="body-3 max-w-2xl pb-6 text-dim">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
