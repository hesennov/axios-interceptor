import { useRef, useEffect, useState } from "react";

const useObserver = (
  options?: IntersectionObserverInit,
): [boolean, React.RefObject<HTMLDivElement | null>] => {
  const container = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(entry.isIntersecting);
    }
  };

  useEffect(() => {
    let current: HTMLDivElement | null = null;

    const observer = new IntersectionObserver(callbackFunction, options);

    if (container.current) {
      observer.observe(container.current);
      current = container.current;
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [isVisible, container];
};

export default useObserver;
