// Ganti kalau nama repo berbeda.
export const REPO_SLUG = 'Joshtri/limiterdB'
export const REPO_URL = `https://github.com/${REPO_SLUG}`
export const RELEASES_URL = `${REPO_URL}/releases`
export const ISSUES_URL = `${REPO_URL}/issues`

// Nama aset tetap dari workflow release di repo app (.github/workflows/release.yml),
// jadi link /releases/latest/download/... selalu mengarah ke versi terbaru.
const LATEST = `${RELEASES_URL}/latest/download`
export const DOWNLOAD_URL = `${LATEST}/limiterdB-windows-amd64-setup.exe`
export const PORTABLE_URL = `${LATEST}/limiterdB-windows-amd64-portable.exe`
export const CHECKSUMS_URL = `${LATEST}/SHA256SUMS.txt`

export const RELEASE_API = `https://api.github.com/repos/${REPO_SLUG}/releases/latest`
// Dipakai sampai API GitHub menjawab (atau kalau gagal / kena rate limit).
export const FALLBACK_RELEASE = {
  version: 'v1.0.0',
  date: '2026-10-07T05:13:28Z',
  setupSize: 6486518,
  portableSize: 11813888,
}

export const AUTHOR = {name: 'Joshtri', url: 'https://github.com/Joshtri'}
