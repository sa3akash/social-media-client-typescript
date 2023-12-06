import { RouterProvider } from "react-router-dom";
import router from "@/router";
import ModelProviders from "@/components/providers/ModelProviders";

const AppProvider = () => {
  return (
    <div className="max-w-[2160px] mx-auto h-full w-full">
      <RouterProvider router={router} />
      <ModelProviders />
    </div>
  );
};

export default AppProvider;
