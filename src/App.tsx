import AppProvider from "@/AppProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContextApi";
import { NetworkProvider } from "@/context/NetworkContext";

function App() {
  return (
      <Provider store={store}>
        <NetworkProvider>
          <AuthProvider>
            <AppProvider />
          </AuthProvider>
        </NetworkProvider>
      </Provider>
  );
}

export default App;
