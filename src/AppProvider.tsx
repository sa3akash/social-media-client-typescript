import { RouterProvider } from "react-router-dom";
import router from "@/router";
import ModelProviders from "@/components/providers/ModelProviders";
import { Toaster } from "@/components/ui/toaster";
import OnlineOffline from "@/components/common/OnlineOffline";

const AppProvider = () => {


  return (
    <div className="dark bg-background text-foreground h-full">
      <div className="max-w-[2160px] mx-auto h-full w-full">
        <RouterProvider router={router} />
        <ModelProviders />
        <Toaster />
        <OnlineOffline />
      </div>
    </div>
  );
};

export default AppProvider;
