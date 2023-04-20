import { useCallback, useRef } from "react";

export const useDebouse = () => {
  const isFirstTime = useRef(true);
  const DebouseDelay = useRef<NodeJS.Timeout>();

  const debouse = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (DebouseDelay.current) {
        clearTimeout(DebouseDelay.current);
      }
      DebouseDelay.current = setTimeout(() => func(), 500);
    }
  }, []);
  return { debouse };
};
