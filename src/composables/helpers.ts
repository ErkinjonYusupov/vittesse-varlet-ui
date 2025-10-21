export function debounce(func: () => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func()
    }, delay)
  }
}