import { RefObject, useEffect, useState } from "react";

const useDetectOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  initialState: boolean,
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (event: Event) => {
      if (
        ref.current !== null &&
        !ref.current?.contains(event.target as Node)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("touchstart", onClick);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onClick);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive] as const;
};

export default useDetectOutsideClick;
