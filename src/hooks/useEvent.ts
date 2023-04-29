import { useLayoutEffect, useCallback, useRef } from "react";

export default function useEvent(handler: (...args: any[] | []) => {}) {
  const handlerRef = useRef(handler);

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any[] | []) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;
    if(fn !== null){
      return fn(args);
    } else {
       return () => {}
    }
  }, []);
}