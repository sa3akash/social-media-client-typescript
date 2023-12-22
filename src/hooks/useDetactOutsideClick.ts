import { MutableRefObject, useEffect, useState } from "react";

const useDetectOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | null>,
  initialState: boolean,
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        ref.current !== null &&
        !ref.current?.contains(event.target as Node)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive] as const;
};

export default useDetectOutsideClick;
