
import { useState, useEffect, useCallback, useRef, DOMElement, Ref, MutableRefObject } from "react";

/* Prevents default behaviour on mouse clicks */
export default function usePureMouse(): MutableRefObject<HTMLDivElement | null> {
  const div = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleDown(e: any) {
      e.preventDefault();
    }

    function handleUp() {
    }

    if(div.current) {
      div.current.addEventListener("mousedown", handleDown);
    }
    return () => {
      if(div.current) {
        div.current.removeEventListener("mousedown", handleDown);
      }
    };
  }, []);

  return div
}