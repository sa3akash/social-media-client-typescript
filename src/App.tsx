import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { useEffect } from "react";
import { socketService } from "@/services/socket/socket";

function App() {
  useEffect(() => {
    socketService.setupSocketConnection();
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground h-full">
        <div className="max-w-[2160px] mx-auto h-full w-full">
          <Provider store={store}>
            <NetworkProvider>
              <RouterProvider router={Router} />
              <Toaster />
              <OnlineOffline />
            </NetworkProvider>
          </Provider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
