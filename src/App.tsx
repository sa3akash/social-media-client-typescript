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
import { useToast } from "@/components/ui/use-toast";
import { NotificationSocket } from "@/services/socket/notificationSocket";

function App() {

  const {toast} = useToast();

  useEffect(() => {
    socketService.setupSocketConnection();
    NotificationSocket.start(toast);
    return () => {
      socketService.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
