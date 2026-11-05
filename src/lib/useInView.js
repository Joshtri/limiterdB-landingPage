import {useEffect, useState} from 'react'

// true selama elemen terlihat dan tab aktif — animasi berhenti kalau tidak.
export function useInView(ref) {
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(() => document.visibilityState === 'visible')

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return inView && visible
}
