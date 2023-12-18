import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { storeKey } from "./services/utils/keys";

const AppProvider = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    localStorage.setItem(storeKey.User, JSON.stringify(user));
  }, [user]);

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
