import {useEffect, useState} from 'react'
import {WindowsLogo} from '@/components/icons'
import {cn} from '@/lib/cn'
import {DOWNLOAD_URL} from '@/lib/site'

const LINKS = [
  ['How it works', '#how'],
  ['Exposure', '#exposure'],
  ['Accuracy', '#accuracy'],
  ['Download', '#download'],
  ['FAQ', '#faq'],
]

export function Wordmark({className = ''}) {
  return (
    <span className={cn('font-semibold tracking-tight', className)}>
      limiter<span className="text-limit">dB</span>
    </span>
  )
}

// Scroll spy, throttled through requestAnimationFrame (pattern from 21st.dev "Morphing Scroll Navbar").
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.scrollY + window.innerHeight * 0.35
      let next = ''
      for (const [, href] of LINKS) {
        const el = document.getElementById(href.slice(1))
        if (el && el.offsetTop <= marker) next = href
      }
      setActive(next)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return active
}

function MenuToggle({open, onClick}) {
  const line = 'absolute left-3 h-0.5 w-4 rounded-full bg-fg transition-transform duration-500 ease-base'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="relative size-10 cursor-pointer rounded-full transition-colors duration-300 ease-base hover:bg-panel-3 active:scale-98 lg:hidden"
    >
      <span className={cn(line, 'top-4', open && 'translate-y-1 rotate-45')} />
      <span className={cn(line, 'top-6', open && '-translate-y-1 -rotate-45')} />
    </button>
  )
}

export function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="button-sm sr-only fixed top-4 left-4 z-[70] rounded-lg bg-limit px-3 py-2 text-ink focus:not-sr-only"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-line-strong bg-panel/80 p-1 pl-4 backdrop-blur-xl"
        >
          <a href="#top" className="mr-2 flex items-center gap-2 text-base" onClick={() => setOpen(false)}>
            <img src="/appicon.png" alt="" className="size-6" />
            <Wordmark />
          </a>

          <ul className="hidden items-center lg:flex">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active === href ? 'location' : undefined}
                  className="title-4 group relative block rounded-full px-3 py-2 text-dim transition-colors duration-300 ease-base hover:text-fg aria-[current]:text-fg"
                >
                  {label}
                  <span
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-limit transition-transform duration-500 ease-base group-aria-[current]:scale-x-100"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <a href={DOWNLOAD_URL} className="btn-primary button-sm rounded-full">
            <WindowsLogo size={16} weight="fill" aria-hidden />
            Download
          </a>
          <MenuToggle open={open} onClick={() => setOpen((v) => !v)} />
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink/90 px-4 pt-24 backdrop-blur-2xl lg:hidden"
      >
        <ul className="flex flex-col gap-2">
          {LINKS.map(([label, href], i) => (
            <li key={href} className="animate-rise" style={{animationDelay: `${Math.min(i * 60, 400)}ms`}}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active === href ? 'location' : undefined}
                className="heading-4 flex items-center gap-3 py-3 text-dim transition-colors duration-300 ease-base aria-[current]:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
