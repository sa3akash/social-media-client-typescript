import { MessangerProvider } from "@/context/MessangerContext";
import { SocketContextProvider } from "@/context/SocketContext";
import Layout from "@/pages/Layout";
import { PageURL } from "@/services/utils/pageUrl";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? (
    <SocketContextProvider>
      <MessangerProvider>
        <Layout />
      </MessangerProvider>
    </SocketContextProvider>
  ) : (
    <Navigate to={PageURL.Login} />
  );
};

export default MainLayout;
