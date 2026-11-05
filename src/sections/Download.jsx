import {ArrowUpRight, DownloadSimple, GithubLogo, Package, ShieldCheck, WindowsLogo} from '@/components/icons'
import {SectionHead} from '@/components/SectionHead'
import {cn} from '@/lib/cn'
import {
  CHECKSUMS_URL,
  DOWNLOAD_URL,
  ISSUES_URL,
  PORTABLE_URL,
  RELEASES_URL,
  REPO_SLUG,
  REPO_URL,
} from '@/lib/site'
import {formatDate, formatSize, useRelease} from '@/lib/useRelease'

const STACK = ['Go', 'Wails', 'WASAPI', 'GitHub Actions']

const linkCls = 'inline-flex items-center gap-1 text-dim transition-colors duration-300 ease-base hover:text-fg'

function Option({icon: Icon, title, badge, body, file, size, href, primary}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel-2 p-4 sm:flex-row sm:items-center">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-panel-3 text-fg" aria-hidden>
        <Icon size={24} weight={primary ? 'fill' : 'regular'} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="title-3 flex flex-wrap items-center gap-2">
          {title}
          {badge && <span className="caption-3 rounded-full bg-limit/15 px-2 py-0.5 text-limit">{badge}</span>}
        </p>
        <p className="body-6 text-dim">{body}</p>
        <p className="caption-5 font-mono text-mute">
          {file} · {formatSize(size)}
        </p>
      </div>
      <a
        href={href}
        className={cn(
          'button-sm shrink-0 justify-center',
          primary ? 'btn-primary' : 'btn-quiet border border-line-strong text-fg',
        )}
      >
        <DownloadSimple size={16} weight="bold" aria-hidden />
        Download
      </a>
    </div>
  )
}

export function Download() {
  const release = useRelease()

  return (
    <section id="download" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <SectionHead label="Download" title="Get limiterdB for Windows.">
        Free, about a minute to install, and it runs from the tray afterward. Windows 10 and 11, 64-bit.
      </SectionHead>

      <div className="mt-12 grid gap-4 lg:grid-cols-[3fr_2fr]">
        {/* Release card: 24px outer radius, 8px padding, 16px inner radius. */}
        <div className="reveal flex flex-col rounded-3xl border border-line bg-panel p-2" style={{'--d': '80ms'}}>
          <div className="flex items-center gap-4 px-4 pt-4 pb-6">
            <img src="/appicon.png" alt="" className="size-12" />
            <div className="min-w-0 flex-1">
              <p className="title-2">limiterdB for Windows</p>
              <p className="caption-4 text-mute">
                <span className="font-mono">{release.version}</span> · Released {formatDate(release.date)}
              </p>
            </div>
            <span className="caption-4 hidden items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-dim sm:inline-flex">
              <WindowsLogo size={14} weight="fill" aria-hidden />
              x64
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Option
              icon={WindowsLogo}
              title="Installer"
              badge="Recommended"
              body="Adds a Start menu entry and an uninstaller. Can start with Windows."
              file="setup.exe"
              size={release.setupSize}
              href={DOWNLOAD_URL}
              primary
            />
            <Option
              icon={Package}
              title="Portable"
              body="One file, no install. Run it from any folder or a USB stick."
              file="portable.exe"
              size={release.portableSize}
              href={PORTABLE_URL}
            />
          </div>

          <div className="caption-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4">
            <a href={CHECKSUMS_URL} className={linkCls}>
              <ShieldCheck size={16} aria-hidden />
              SHA-256 checksums
            </a>
            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className={linkCls}>
              All releases
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>

        <div className="reveal flex flex-col gap-6 rounded-3xl border border-line bg-panel p-6" style={{'--d': '160ms'}}>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-panel-3" aria-hidden>
              <GithubLogo size={24} weight="fill" />
            </span>
            <div className="min-w-0">
              <p className="title-2">Open source</p>
              <p className="caption-5 truncate font-mono text-mute">{REPO_SLUG}</p>
            </div>
          </div>

          <p className="body-6 text-dim">
            Read every line, follow new releases, or report a bug. Each download is built by GitHub Actions straight
            from the tagged commit in the public repository.
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Built with">
            {STACK.map((s) => (
              <li key={s} className="caption-4 rounded-full border border-line-strong px-3 py-1 text-dim">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-4">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-quiet button-sm justify-center border border-line-strong text-fg"
            >
              <GithubLogo size={16} aria-hidden />
              View on GitHub
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <div className="caption-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href={RELEASES_URL} target="_blank" rel="noreferrer" className={linkCls}>
                Release notes
              </a>
              <a href={ISSUES_URL} target="_blank" rel="noreferrer" className={linkCls}>
                Report an issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
