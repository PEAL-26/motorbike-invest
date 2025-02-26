import { useEffect, useState } from "react";

export function useLoadingScreen(duration = 1000) {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoadingScreen(false), duration);
    return () => clearTimeout(timeout);
  }, []);
  return { isLoadingScreen };
}
