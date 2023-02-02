import { useEffect, useRef, useState } from "react";

export function useComponentVisible<T extends HTMLElement>(
  initVisible: boolean,
) {
  const [isVisible, setVisible] = useState(initVisible);
  const ref = useRef<T>(null);

  const handleClickAway = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickAway, true);
    return () => {
      document.removeEventListener("click", handleClickAway, true);
    };
  }, [ref, handleClickAway]);

  return { ref, isVisible, setVisible };
}

export default useComponentVisible;
