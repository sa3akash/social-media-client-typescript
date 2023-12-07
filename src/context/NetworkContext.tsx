import { ReactNode, createContext, useEffect, useState } from "react";

export interface NetworkDoc {
  network: boolean;
  show: boolean;
}


export const NetworkContext = createContext<NetworkDoc>({network: true,show: false});

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<boolean>(navigator.onLine);
  const [show, setShow] = useState<boolean>(false);


  setTimeout(() => {
    if (show) {
      setShow(false);
    }
  }, 3000);

  useEffect(() => {
    const online = () => {
      setNetwork(true);
      setShow(true)
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
    <NetworkContext.Provider value={{network,show}}>
      {children}
    </NetworkContext.Provider>
  );
};
