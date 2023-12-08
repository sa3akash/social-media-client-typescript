import { PageURL } from "@/services/utils/pageUrl";
import { RootState } from "@/store";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { user } = useSelector((store:RootState)=>store.auth);
  if (!user) {
    return <Navigate to={PageURL.Login} />;
  }
  return props.children;
};

export const PublicRoute = (props: PropsWithChildren) => {
  const { user } = useSelector((store:RootState)=>store.auth);
  if (user) {
    return <Navigate to={`/${PageURL.Feed}`} />;
  }
  return props.children;
};
