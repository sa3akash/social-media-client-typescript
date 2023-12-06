import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "@/AppProvider";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/authContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="dark bg-background text-foreground h-full">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <AppProvider />
          </AuthProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
