import { Provider } from "react-redux";
import { store,persistor } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SocketContextProvider } from "@/context/SocketContext";
import { PersistGate } from 'redux-persist/integration/react';
import { SimplePeerContextProvider } from "@/context/SimplePeer";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SocketContextProvider>
      <SimplePeerContextProvider>
        <div className="bg-background text-foreground h-full">
          <div className="max-w-[2160px] mx-auto h-full w-full">
            <NetworkProvider>
              <RouterProvider router={Router} />
              <Toaster />
              <OnlineOffline />
            </NetworkProvider>
          </div>
        </div>
        </SimplePeerContextProvider>
        </SocketContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
