import { Suspense, lazy } from "react";
import { PageURL } from "@/services/utils/pageUrl";
import HomeSkeleton from "@/components/home/skeleton/HomeSkeleton";
import PhotoSkeleton from "@/components/photos/Skeleton/PhotoSkeleton";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import NotificationSkeleton from "@/components/notificaton/skeleton/NotificationSkeleton";
import FriendsSkeleton from "@/components/friends/skeleton/FriendsSkeleton";

// lazy loading
const Home = lazy(() => import("@/pages/Home"));
const Friends = lazy(() => import("@/pages/Friends"));
const Profile = lazy(() => import("@/pages/Profile"));
const Evants = lazy(() => import("@/pages/Evants"));
const Videos = lazy(() => import("@/pages/Videos"));
const Photos = lazy(() => import("@/pages/Photos"));
const Messanger = lazy(() => import("@/pages/Messanger"));
const MarketPlace = lazy(() => import("@/pages/MarketPlace"));
const Notification = lazy(() => import("@/pages/Notification"));

const Protected = [
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
      <Suspense fallback={<FriendsSkeleton />}>
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
    path: PageURL.Messanger,
    element: (
      <Suspense fallback={"Loading..."}>
        <Messanger />
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
  {
    path: `${PageURL.Notification}`,
    element: (
      <Suspense fallback={<NotificationSkeleton />}>
        <Notification />
      </Suspense>
    ),
  },
];

export default Protected;
