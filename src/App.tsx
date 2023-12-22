import AppProvider from "@/AppProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { socketService } from "@/services/socket/socket";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    socketService.setupSocketConnection();
  },[]);

  return (
    <Provider store={store}>
      <NetworkProvider>
        <AppProvider />
      </NetworkProvider>
    </Provider>
  );
}

export default App;
