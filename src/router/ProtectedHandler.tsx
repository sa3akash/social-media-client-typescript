import useAuth from "@/hooks/useAuth";
import { PageURL } from "@/services/utils/pageUrl";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={PageURL.Login} />;
  }
  return props.children;
};

export const PublicRoute = (props: PropsWithChildren) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={`/${PageURL.Feed}`} />;
  }
  return props.children;
};
