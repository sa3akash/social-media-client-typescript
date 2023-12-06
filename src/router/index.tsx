/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeSkeleton from "@/components/home/skeleton/HomeSkeleton";
import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import LayoutSkeleton from "@/pages/skeleton/LayoutSkeleton";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import { PageURL } from "@/utils/pageUrl";
import PhotoSkeleton from "@/components/photos/Skeleton/PhotoSkeleton";

// lazy loading
const Layout = lazy(() => import("@/pages/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Reset = lazy(() => import("@/pages/auth/tabs/Reset"));
const Forgot = lazy(() => import("@/pages/auth/tabs/Forgot"));
const Friends = lazy(() => import("@/pages/Friends"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/404"));
const Evants = lazy(() => import("@/pages/Evants"));
const Videos = lazy(() => import("@/pages/Videos"));
const Photos = lazy(() => import("@/pages/Photos"));
const Files = lazy(() => import("@/pages/Files"));
const MarketPlace = lazy(() => import("@/pages/MarketPlace"));

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
        path: PageURL.Feed,
        element: (
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: PageURL.Friends,
        element: (
          <Suspense fallback={"Loading..."}>
            <Friends />
          </Suspense>
        ),
      },
      {
        path: PageURL.Events,
        element: (
          <Suspense fallback={"Loading..."}>
            <Evants />
          </Suspense>
        ),
      },
      {
        path: PageURL.WatchVideos,
        element: (
          <Suspense fallback={"Loading..."}>
            <Videos />
          </Suspense>
        ),
      },
      {
        path: PageURL.Photos,
        element: (
          <Suspense fallback={<PhotoSkeleton />}>
            <Photos />
          </Suspense>
        ),
      },
      {
        path: PageURL.Files,
        element: (
          <Suspense fallback={"Loading..."}>
            <Files />
          </Suspense>
        ),
      },
      {
        path: PageURL.Marketplace,
        element: (
          <Suspense fallback={"Loading..."}>
            <MarketPlace />
          </Suspense>
        ),
      },
      {
        path: `${PageURL.Profile}/:authId`,
        element: (
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: PageURL.Login,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[444px]" />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: PageURL.Register,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[588px]" />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: PageURL.Forgot,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[390px]" />}>
        <Forgot />
      </Suspense>
    ),
  },
  {
    path: PageURL.Reset,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[388px]" />}>
        <Reset />
      </Suspense>
    ),
  },
  {
    path: PageURL.NotFound,
    element: (
      <Suspense fallback={"Loading..."}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
