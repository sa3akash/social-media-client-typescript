import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Protected from "@/router/Protected";
import { PageURL } from "@/services/utils/pageUrl";
import LayoutSkeleton from "@/pages/skeleton/LayoutSkeleton";
import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import Skeleton404 from "@/pages/skeleton/Skeleton404";
import AuthLayout from "@/router/AuthLayout";
import AuthRoutes from "@/router/AuthRoutes";

// lazy loading
const MainLayout = lazy(() => import("@/router/MainLayout"));
const NotFound = lazy(() => import("@/pages/404"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LayoutSkeleton />}>
        <MainLayout />
      </Suspense>
    ),
    children: Protected,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<CommonCardSkeleton />}>
        <AuthLayout />
      </Suspense>
    ),
    children: AuthRoutes,
  },
  {
    path: PageURL.NotFound,
    element: (
      <Suspense fallback={<Skeleton404 />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default Router;
