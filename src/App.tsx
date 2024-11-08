import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SocketContextProvider } from "@/context/SocketContext";
import { SimplePeerContextProvider } from "@/context/SimplePeer";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
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
      </Provider>
    </ThemeProvider>
  );
}

export default App;
