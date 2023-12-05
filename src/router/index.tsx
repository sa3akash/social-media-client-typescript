/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeSkeleton from "@/components/home/skeleton/HomeSkeleton";
import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import Profile from "@/pages/Profile";
import LayoutSkeleton from "@/pages/skeleton/LayoutSkeleton";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";

// lazy loading
const Layout = lazy(() => import("@/pages/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Reset = lazy(() => import("@/pages/auth/tabs/Reset"));
const Forgot = lazy(() => import("@/pages/auth/tabs/Forgot"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LayoutSkeleton />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[444px]" />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[588px]" />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "forgot",
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[390px]" />}>
        <Forgot />
      </Suspense>
    ),
  },
  {
    path: "reset",
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[388px]" />}>
        <Reset />
      </Suspense>
    ),
  },
]);

export default router;
