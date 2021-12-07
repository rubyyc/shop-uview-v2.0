export function hotNumber(val) {
  const num = parseInt(val)
  if (num < 1000) {
    return val
  } else {
    val += ''
    return val.substring(0, val.length - 3) + 'k'
  }
}