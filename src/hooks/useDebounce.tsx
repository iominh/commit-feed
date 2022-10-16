const useDebounce = (func: any, milliseconds: number) => {
  const time = milliseconds || 400
  let timer: any

  return (event: any) => {
      if (timer) {
          clearTimeout(timer)
      }

      timer = setTimeout(func, time, event)
  }
}

export default useDebounce;
