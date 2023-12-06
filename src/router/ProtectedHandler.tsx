import useAuth from "@/hooks/useAuth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export const PublicRoute = (props: PropsWithChildren) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/feed" />;
  }
  return props.children;
};
