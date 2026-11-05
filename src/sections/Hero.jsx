import {ArrowUpRight, Check, GithubLogo, WindowsLogo} from '@/components/icons'
import {Instrument} from '@/components/Instrument'
import {DOWNLOAD_URL, REPO_URL} from '@/lib/site'
import {formatSize, useRelease} from '@/lib/useRelease'

const rise = (ms) => ({style: {animationDelay: `${ms}ms`}})

export function Hero() {
  const release = useRelease()
  const meta = ['Windows 10 and 11', `${formatSize(release.setupSize)} installer`, 'No account', 'No telemetry']

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_30rem]">
        <div className="flex max-w-[680px] flex-col items-start gap-8">
          <p {...rise(0)} className="animate-rise caption-1 text-dim">
            Free and open source, for Windows laptops
          </p>

          <h1 {...rise(60)} className="animate-rise heading-3 sm:heading-2 xl:heading-1 text-hero">
            Draw a line.
            <span
              className="animate-grow my-4 block h-1 w-full max-w-sm origin-left rounded-full bg-limit"
              style={{animationDelay: '500ms'}}
              aria-hidden
            />
            Your music stays under&nbsp;it.
          </h1>

          <p {...rise(120)} className="animate-rise body-7 max-w-[680px] text-dim">
            Your iPhone warns you when headphones get too loud. Your laptop never did.{' '}
            <span className="text-fg">limiterdB</span> keeps what reaches your ears under a decibel limit you pick, in
            any app, on any track, with any headphones.
          </p>

          <div {...rise(180)} className="animate-rise flex flex-wrap items-center gap-2">
            <a href={DOWNLOAD_URL} className="btn-primary button-md">
              <WindowsLogo size={20} weight="fill" aria-hidden />
              Download for Windows
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-quiet button-md">
              <GithubLogo size={20} aria-hidden />
              View on GitHub
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <a
              href="#download"
              className="caption-4 px-2 font-mono text-mute transition-colors duration-300 ease-base hover:text-fg"
            >
              {release.version}
            </a>
          </div>

          <ul {...rise(240)} className="animate-rise caption-4 flex flex-wrap gap-x-4 gap-y-2 text-mute">
            {meta.map((m) => (
              <li key={m} className="flex items-center gap-1">
                <Check size={14} weight="bold" className="text-limit" aria-hidden />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div {...rise(200)} className="animate-rise">
          <Instrument />
        </div>
      </div>
    </section>
  )
}
