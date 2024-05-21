import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className="bg-background text-foreground h-full">
          <div className="max-w-[2160px] mx-auto h-full w-full">
            <NetworkProvider>
              <RouterProvider router={Router} />
              <Toaster />
              <OnlineOffline />
            </NetworkProvider>
          </div>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
