import {useEffect, useRef} from 'react'

const LINES = [
  "Hearing loss doesn't hurt while it happens.",
  'It adds up quietly, one loud chorus at a time.',
  'limiterdB keeps count, so you can just listen.',
]

/**
 * Large tagline. Each word goes from 30% to full opacity as it crosses
 * a line at 65% of the viewport height. Scroll work is batched per frame.
 */
export function Tagline() {
  const ref = useRef(null)

  useEffect(() => {
    const words = [...ref.current.querySelectorAll('.tagline-word')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.setAttribute('data-on', ''))
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const trigger = window.innerHeight * 0.65
      for (const w of words) {
        w.toggleAttribute('data-on', w.getBoundingClientRect().top < trigger)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, {passive: true})
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section aria-label="Why limiterdB" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <p ref={ref} className="heading-4 sm:heading-3 lg:heading-2 max-w-[680px]">
        {LINES.map((line, li) => (
          <span key={li} className="block">
            {line.split(' ').map((word, wi) => (
              <span key={wi}>
                <span className={word === 'limiterdB' ? 'tagline-word text-limit' : 'tagline-word'}>{word}</span>{' '}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}
