import {useEffect, useRef, useState} from 'react'

// Simulasi loop limiter app (internal/domain/limiter.go) di atas lagu palsu:
// tiap TICK_MS ukur peak lagu (dBFS) → hitung volume target → turun cepat,
// naik pelan. RELEASE dipercepat dari app (0.001/tick) supaya demo terasa hidup.
const TICK_MS = 50
const ATTACK = 0.5
const RELEASE = 0.008
const MIN_VOLUME = 0.01
const AVG_TAU_MS = 1500

export const DEVICE_MAX_SPL = 100 // headphone, perkiraan default app

const SECTIONS = [
  {name: 'Intro', base: -30, sec: 4},
  {name: 'Verse', base: -19, sec: 5},
  {name: 'Chorus', base: -9, sec: 5},
  {name: 'Drop', base: -4, sec: 4.5},
  {name: 'Breakdown', base: -25, sec: 4},
]

const volToDb = (v) => (v > 0 ? 20 * Math.log10(v) : -100)

export function useSimulatedLimiter({targetSpl, enabled, running}) {
  const e0 = 10 ** ((DEVICE_MAX_SPL + SECTIONS[0].base) / 10)
  const sim = useRef({t: 0, base: SECTIONS[0].base, kick: 0, volume: 1, energySrc: e0, energyOut: e0})
  const params = useRef({targetSpl, enabled})
  params.current = {targetSpl, enabled}

  const [snap, setSnap] = useState({
    section: SECTIONS[0].name,
    srcSpl: DEVICE_MAX_SPL + SECTIONS[0].base,
    heardSpl: DEVICE_MAX_SPL + SECTIONS[0].base,
    avgSrc: DEVICE_MAX_SPL + SECTIONS[0].base,
    avgHeard: DEVICE_MAX_SPL + SECTIONS[0].base,
    volume: 1,
  })

  useEffect(() => {
    if (!running) return
    const total = SECTIONS.reduce((s, x) => s + x.sec, 0) * 1000
    const alpha = 1 - Math.exp(-TICK_MS / AVG_TAU_MS)

    const id = setInterval(() => {
      const s = sim.current
      const {targetSpl, enabled} = params.current
      s.t = (s.t + TICK_MS) % total

      let acc = 0
      const section = SECTIONS.find((x) => (acc += x.sec * 1000) > s.t)
      s.base += (section.base - s.base) * 0.12

      // Kick tiap 500 ms (120 bpm), lalu meluruh.
      if (s.t % 500 === 0) s.kick = section.base > -20 ? 6 : 3
      s.kick *= 0.55
      const level = Math.min(0, s.base + s.kick + (Math.random() - 0.5) * 2.5)

      if (enabled) {
        const threshold = Math.max(-60, Math.min(0, targetSpl - DEVICE_MAX_SPL))
        const desired = Math.max(MIN_VOLUME, Math.min(1, 10 ** ((threshold - level) / 20)))
        if (desired < s.volume) s.volume += (desired - s.volume) * ATTACK
        else s.volume = Math.min(desired, s.volume + RELEASE)
      } else {
        s.volume = 1
      }

      const srcSpl = DEVICE_MAX_SPL + level
      const heardSpl = srcSpl + volToDb(s.volume)
      s.energySrc = (1 - alpha) * s.energySrc + alpha * 10 ** (srcSpl / 10)
      s.energyOut = (1 - alpha) * s.energyOut + alpha * 10 ** (heardSpl / 10)

      setSnap({
        section: section.name,
        srcSpl,
        heardSpl,
        avgSrc: 10 * Math.log10(s.energySrc),
        avgHeard: 10 * Math.log10(s.energyOut),
        volume: s.volume,
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [running])

  return snap
}
