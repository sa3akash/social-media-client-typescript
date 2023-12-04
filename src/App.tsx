import { RouterProvider } from "react-router-dom";
import router from "@/router";
import ModelProviders from "@/components/providers/ModelProviders";


function App() {
  return (
    <div className="dark bg-background text-foreground h-full">
        <RouterProvider router={router} />
        <ModelProviders />
    </div>
  );
}

export default App;
