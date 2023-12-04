/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginSkeleton from "@/pages/skeleton/LoginSkeleton";
import RegisterSkeleton from "@/pages/skeleton/RegisterSkeleton";
import ForgotSkeleton from "@/pages/skeleton/ForgotSkeleton";

// lazy loading
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Reset = lazy(() => import("@/pages/auth/tabs/Reset"));
const Forgot = lazy(() => import("@/pages/auth/tabs/Forgot"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"Loading"}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<RegisterSkeleton />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "forgot",
    element: (
      <Suspense fallback={<ForgotSkeleton />}>
        <Forgot />
      </Suspense>
    ),
  },
  {
    path: "reset",
    element: (
      <Suspense fallback={<ForgotSkeleton />}>
        <Reset />
      </Suspense>
    ),
  },
]);

export default router;
