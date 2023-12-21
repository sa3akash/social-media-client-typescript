import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Protected from "@/router/Protected";
import { PageURL } from "@/services/utils/pageUrl";
import LayoutSkeleton from "@/pages/skeleton/LayoutSkeleton";
import { ProtectedRoute, PublicRoute } from "@/router/ProtectedHandler";
import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import Test from "@/components/models/test/Test";

// lazy loading
const Layout = lazy(() => import("@/pages/Layout"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Reset = lazy(() => import("@/pages/auth/tabs/Reset"));
const Forgot = lazy(() => import("@/pages/auth/tabs/Forgot"));
const NotFound = lazy(() => import("@/pages/404"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LayoutSkeleton />}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: Protected,
  },
  {
    path: PageURL.Login,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[444px]" />}>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: PageURL.Register,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[588px]" />}>
        <PublicRoute>
          <Register />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: PageURL.Forgot,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[390px]" />}>
        <PublicRoute>
          <Forgot />
        </PublicRoute>
      </Suspense>
    ),
  },
  {
    path: PageURL.Reset,
    element: (
      <Suspense fallback={<CommonCardSkeleton className="h-[388px]" />}>
        <PublicRoute>
          <Reset />
        </PublicRoute>
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
  {
    path: '/test',
    element: (
      <Suspense fallback={"Loading..."}>
        <Test />
      </Suspense>
    ),
  },
]);

export default Router;
