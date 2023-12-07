import { ReactNode, createContext, useEffect, useState } from "react";

export const NetworkContext = createContext<boolean>(true);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const online = () => {
      setNetwork(true);
    };
    const offline = () => {
      setNetwork(false);
    };
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, []);

  return (
    <NetworkContext.Provider value={network}>
      {children}
    </NetworkContext.Provider>
  );
};
