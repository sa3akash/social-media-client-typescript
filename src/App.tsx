import AppProvider from "@/AppProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
// import { AuthProvider } from "@/context/AuthContextApi";
import { NetworkProvider } from "@/context/NetworkContext";
import { socketService } from "@/services/socket/socket";
import useEffectOnce from "@/hooks/useEffectOnece";

function App() {
  useEffectOnce(() => {
    socketService.setupSocketConnection();
  });

  return (
    <Provider store={store}>
      <NetworkProvider>
        {/* <AuthProvider> */}
          <AppProvider />
        {/* </AuthProvider> */}
      </NetworkProvider>
    </Provider>
  );
}

export default App;
