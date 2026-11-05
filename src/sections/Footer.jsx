import {ArrowUpRight, Check, GithubLogo, WindowsLogo} from '@/components/icons'
import {AUTHOR, DOWNLOAD_URL, REPO_URL} from '@/lib/site'
import {Wordmark} from './Nav'

const RISK = ['Free', 'No account', 'Nothing leaves your PC']

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="reveal flex flex-col items-center gap-8 rounded-3xl border border-line bg-panel px-6 py-16 text-center sm:px-12 lg:py-24">
        <img src="/appicon.png" alt="limiterdB app icon" className="size-16" />
        <h2 className="heading-3 sm:heading-2 max-w-[680px]">
          Set the line once.
          <br />
          <span className="text-dim">Then forget about it.</span>
        </h2>
        <p className="body-7 max-w-lg text-dim">
          Quietly running in your tray from the next login onward. Free and open source.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href={DOWNLOAD_URL} className="btn-primary button-md">
            <WindowsLogo size={20} weight="fill" aria-hidden />
            Download for Windows
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-quiet button-md">
            <GithubLogo size={20} aria-hidden />
            Star on GitHub
          </a>
        </div>
        <ul className="caption-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-mute">
          {RISK.map((r) => (
            <li key={r} className="flex items-center gap-1">
              <Check size={14} weight="bold" className="text-limit" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const linkCls = 'inline-flex items-center gap-1 text-dim transition-colors duration-300 ease-base hover:text-fg'

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="caption-1 flex flex-col gap-6 rounded-2xl border border-line px-6 py-6 font-normal text-mute sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2">
          <img src="/appicon.png" alt="" className="size-5" />
          <Wordmark className="text-fg" />
          <span>· Not a medical device</span>
        </span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#privacy" className={linkCls}>
            Privacy
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className={linkCls}>
            Source and license
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href={AUTHOR.url} target="_blank" rel="noreferrer" className={linkCls}>
            Built by {AUTHOR.name}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  )
}
