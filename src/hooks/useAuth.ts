import { AuthContext, AuthContextType } from "@/context/AuthContextApi";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
