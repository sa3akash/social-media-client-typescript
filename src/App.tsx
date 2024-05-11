import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SocketContextProvider } from "./context/SocketContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Create a client
const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>

    <ThemeProvider>
      <Provider store={store}>
        <SocketContextProvider>
          <div className="bg-background text-foreground h-full">
            <div className="max-w-[2160px] mx-auto h-full w-full">
              <NetworkProvider>
                <RouterProvider router={Router} />
                <Toaster />
                <OnlineOffline />
              </NetworkProvider>
            </div>
          </div>
        </SocketContextProvider>
      </Provider>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
