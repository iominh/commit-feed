/**
 * Limit the rate of execution for a function
 */
const useDebounce = (func: any, milliseconds: number) => {
  const time = milliseconds || 400;
  let timer: NodeJS.Timeout;

  return (event: any) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, event);
  };
};

export default useDebounce;
