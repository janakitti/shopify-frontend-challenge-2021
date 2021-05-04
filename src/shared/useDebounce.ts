import { useState, useEffect } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const delayHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(delayHandler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
