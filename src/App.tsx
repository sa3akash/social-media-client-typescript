import { Provider } from "react-redux";
import { store } from "@/store";
import { NetworkProvider } from "@/context/NetworkContext";
import { socketService } from "@/services/socket/socket";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

function App() {
  useEffect(() => {
    socketService.setupSocketConnection();
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

// const { user } = useSelector((state: RootState) => state.auth);
// const tost = useSelector((state: RootState) => state.tost);

// useEffect(() => {
//   localStorage.setItem(storeKey.User, JSON.stringify(user));
// }, [user]);

// const dispatch: AppDispatch = useDispatch();

// const { toast } = useToast();

// useEffect(() => {
//   if (tost.type === "success") {
//     toast({
//       description: tost.message,
//     });
//   } else if (tost.type === "worning") {
//     toast({
//       // title: "Uh oh! Something went wrong.",
//       description: tost.message || "Uh oh! Something went wrong.",
//     });
//   } else if (tost.type === "error") {
//     toast({
//       variant: "destructive",
//       // title: "Uh oh! Something went wrong.",
//       description: tost.message || "Uh oh! Something went wrong.",
//     });
//   }
// }, [toast, tost.message, tost.type]);

// useEffect(() => {
//   if (tost.message) {
//     setTimeout(() => {
//       dispatch(setTost({ type: null, message: null }));
//     }, 1500);
//   }
// }, [dispatch, tost.message]);
