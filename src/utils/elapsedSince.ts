/**
 * Calendar-style difference between two instants, using UTC date parts.
 * Pair with a `from` date created from an ISO string (e.g. …Z) so the
 * anchor is the same for every visitor.
 */
export type ElapsedParts = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function getElapsedCalendar(from: Date, to: Date): ElapsedParts {
  if (to.getTime() < from.getTime()) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  let y = to.getUTCFullYear() - from.getUTCFullYear()
  let mo = to.getUTCMonth() - from.getUTCMonth()
  let d = to.getUTCDate() - from.getUTCDate()
  let h = to.getUTCHours() - from.getUTCHours()
  let mi = to.getUTCMinutes() - from.getUTCMinutes()
  let s = to.getUTCSeconds() - from.getUTCSeconds()

  if (s < 0) {
    s += 60
    mi -= 1
  }
  if (mi < 0) {
    mi += 60
    h -= 1
  }
  if (h < 0) {
    h += 24
    d -= 1
  }
  if (d < 0) {
    mo -= 1
    const prevMonthLast = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0))
    d += prevMonthLast.getUTCDate()
  }
  if (mo < 0) {
    mo += 12
    y -= 1
  }

  return { years: y, months: mo, days: d, hours: h, minutes: mi, seconds: s }
}
