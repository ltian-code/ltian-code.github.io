export function readPersisted<T>(key: string, fallback: T): T {
  if (!import.meta.client) {
    return fallback
  }
  try {
    const raw = localStorage.getItem(`codeisle:${key}`)
    return raw == null ? fallback : JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writePersisted(key: string, value: unknown) {
  if (!import.meta.client) {
    return
  }
  localStorage.setItem(`codeisle:${key}`, JSON.stringify(value))
}
