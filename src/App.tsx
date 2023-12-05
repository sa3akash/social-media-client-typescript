import { RouterProvider } from "react-router-dom";
import router from "@/router";
import ModelProviders from "@/components/providers/ModelProviders";

function App() {
  return (
    <div className="dark bg-background text-foreground h-full">
      <div className="max-w-[2160px] mx-auto h-full w-full">
        <RouterProvider router={router} />
        <ModelProviders />
      </div>
    </div>
  );
}

export default App;
