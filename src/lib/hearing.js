// Angka-angka ini sama dengan internal/domain dan frontend/src/lib/hearing.js di app.

// WHO: rata-rata 80 dB aman ±40 jam/minggu. NIOSH: 85 dB maks. 8 jam/hari.
export const SAFE_SPL = 80
export const LIMIT_SPL = 85
export const WEEKLY_HOURS = 40

export const SPL_SCALE = {min: 40, max: 110}

export const splToPct = (spl) =>
  Math.max(0, Math.min(100, ((spl - SPL_SCALE.min) / (SPL_SCALE.max - SPL_SCALE.min)) * 100))

/** @returns {'silent'|'safe'|'warn'|'danger'} */
export function zoneOf(spl, silent = false) {
  if (silent) return 'silent'
  if (spl <= SAFE_SPL) return 'safe'
  if (spl <= LIMIT_SPL) return 'warn'
  return 'danger'
}

export const ZONE = {
  silent: {label: 'Silent', text: 'text-mute', bg: 'bg-mute'},
  safe: {label: 'Safe', text: 'text-safe', bg: 'bg-safe'},
  warn: {label: 'Caution', text: 'text-warn', bg: 'bg-warn'},
  danger: {label: 'Too loud', text: 'text-danger', bg: 'bg-danger'},
}

/** Jatah dengar aman per minggu (jam) di level tertentu — aturan 3 dB. */
export const weeklyHoursAt = (spl) => WEEKLY_HOURS / 2 ** ((spl - SAFE_SPL) / 3)

export function fmtDuration(hours) {
  if (hours >= 1) {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return m ? `${h} h ${m} min` : `${h} h`
  }
  return `${Math.round(hours * 60)} min`
}

export const PRESETS = [
  {label: 'Quiet', spl: 60, desc: 'Soft conversation'},
  {label: 'Comfortable', spl: 70, desc: 'Recommended'},
  {label: 'Loud', spl: 80, desc: 'WHO upper bound'},
]
