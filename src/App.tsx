import { QueryClientProvider } from "react-query";
import AppProvider from "@/AppProvider";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContextApi";
import { NetworkProvider } from "@/context/NetworkContext";
import queryClient from "@/store/queryClient";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NetworkProvider>
          <AuthProvider>
            <AppProvider />
          </AuthProvider>
        </NetworkProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
