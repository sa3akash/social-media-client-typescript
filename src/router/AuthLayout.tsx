import CommonCard from "@/components/common/CommonCard";
import { PageURL } from "@/services/utils/pageUrl";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const path = useLocation().pathname.split("/")[1];

  return user ? (
    <Navigate to={PageURL.Feed} />
  ) : (
    <CommonCard
      title={
        path === "login"
          ? "Login"
          : path === "forgot"
            ? "Recover Password"
            : path === "reset-password"
              ? "Reset your password."
              : "Register"
      }
      title2={
        path === "login"
          ? "Login for a Journey of Positivity"
          : path === "forgot"
            ? "Enter your Email and instructions will be sent to you!"
            : path === "reset-password"
              ? "Change your password and secure your social account!"
              : "Sharing Smiles and Inspirationt"
      }
      type={
        path === "login" ? "LOGIN" : path === "forgot" ? "FORGOT" : "REGISTER"
      }
    >
      <Outlet />
    </CommonCard>
  );
};

export default AuthLayout;
