import {useEffect, useState} from 'react'
import {FALLBACK_RELEASE, RELEASE_API} from './site'

const KEY = 'limiterdb.release'
let pending = null

function readCache() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY))
  } catch {
    return null
  }
}

// One request per page load, shared by every component that asks.
function loadRelease() {
  pending ??= fetch(RELEASE_API, {headers: {Accept: 'application/vnd.github+json'}})
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => {
      const size = (suffix) => data.assets?.find((a) => a.name.endsWith(suffix))?.size
      const release = {
        version: data.tag_name || FALLBACK_RELEASE.version,
        date: data.published_at || FALLBACK_RELEASE.date,
        setupSize: size('setup.exe') ?? FALLBACK_RELEASE.setupSize,
        portableSize: size('portable.exe') ?? FALLBACK_RELEASE.portableSize,
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify(release))
      } catch {}
      return release
    })
    .catch(() => null)
  return pending
}

/** Latest GitHub release (version, date, file sizes). Starts from a known release, then updates. */
export function useRelease() {
  const [release, setRelease] = useState(() => readCache() || FALLBACK_RELEASE)
  useEffect(() => {
    let live = true
    loadRelease().then((r) => live && r && setRelease(r))
    return () => {
      live = false
    }
  }, [])
  return release
}

export const formatSize = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en', {month: 'short', day: 'numeric', year: 'numeric'})
