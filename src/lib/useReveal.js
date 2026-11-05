import {useEffect} from 'react'

// Tandai semua .reveal dengan data-shown saat masuk viewport (sekali saja).
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not([data-shown])')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-shown', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', '')
            io.unobserve(e.target)
          }
        }
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.12}
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
