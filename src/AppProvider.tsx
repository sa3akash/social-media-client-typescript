import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { storeKey } from "@/services/utils/keys";
import { useToast } from "@/components/ui/use-toast";
import { setTost } from "./store/reducers/TostReducer";

const AppProvider = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const tost = useSelector((state: RootState) => state.tost);

  useEffect(() => {
    localStorage.setItem(storeKey.User, JSON.stringify(user));
  }, [user]);

  const dispatch: AppDispatch = useDispatch();

  const { toast } = useToast();

  useEffect(() => {
    if (tost.type === "success") {
      toast({
        description: tost.message,
      });
    } else if (tost.type === "worning") {
      toast({
        // title: "Uh oh! Something went wrong.",
        description: tost.message || "Uh oh! Something went wrong.",
      });
    } else if (tost.type === "error") {
      toast({
        variant: "destructive",
        // title: "Uh oh! Something went wrong.",
        description: tost.message || "Uh oh! Something went wrong.",
      });
    }
  }, [toast, tost.message, tost.type]);

  useEffect(() => {
    if (tost.message) {
      setTimeout(() => {
        dispatch(setTost({ type: null, message: null }));
      }, 1500);
    }
  }, [dispatch, tost.message]);

  return (
    <div className="dark bg-background text-foreground h-full">
      <div className="max-w-[2160px] mx-auto h-full w-full">
        <RouterProvider router={router} />
        <Toaster />
        <OnlineOffline />
      </div>
    </div>
  );
};

export default AppProvider;
