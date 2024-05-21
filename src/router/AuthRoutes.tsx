import ForgotSkeleton from "@/pages/auth/skeleton/ForgetSkeleton";
import LoginSkeleton from "@/pages/auth/skeleton/LoginSkeleton";
import RegisterSkeleton from "@/pages/auth/skeleton/RegisterSkeleton";
import ResetSkeleton from "@/pages/auth/skeleton/ResetSkeleton";
import { PageURL } from "@/services/utils/pageUrl";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Reset = lazy(() => import("@/pages/auth/tabs/Reset"));
const Forgot = lazy(() => import("@/pages/auth/tabs/Forgot"));

const AuthRoutes = [
  {
    path: PageURL.Login,
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: PageURL.Register,
    element: (
      <Suspense fallback={<RegisterSkeleton />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: PageURL.Forgot,
    element: (
      <Suspense fallback={<ForgotSkeleton />}>
        <Forgot />
      </Suspense>
    ),
  },
  {
    path: PageURL.Reset,
    element: (
      <Suspense fallback={<ResetSkeleton />}>
        <Reset />
      </Suspense>
    ),
  },
];

export default AuthRoutes;
