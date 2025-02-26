import { Suspense, lazy } from "react";
import { PageURL } from "@/services/utils/pageUrl";
import HomeSkeleton from "@/components/home/skeleton/HomeSkeleton";
import PhotoSkeleton from "@/components/photos/Skeleton/PhotoSkeleton";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import NotificationSkeleton from "@/components/notificaton/skeleton/NotificationSkeleton";
import FriendsSkeleton from "@/components/friends/skeleton/FriendsSkeleton";
import Test from "@/pages/test";

// lazy loading
const Profile = lazy(() => import("@/pages/Profile"));
const Home = lazy(() => import("@/pages/Home"));
const Friends = lazy(() => import("@/pages/Friends"));
const Evants = lazy(() => import("@/pages/Evants"));
const Videos = lazy(() => import("@/pages/Videos"));
const Photos = lazy(() => import("@/pages/Photos"));
const Messanger = lazy(() => import("@/pages/Messanger"));
const MarketPlace = lazy(() => import("@/pages/MarketPlace"));
const Notification = lazy(() => import("@/pages/Notification"));
const Settings = lazy(() => import("@/pages/Settings"));
const Live = lazy(() => import("@/pages/Live"));

const Protected = [
  {
    path: PageURL.Feed,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
        ),
      }
    ]
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
      <Suspense fallback={<HomeSkeleton />}>
        <Videos />
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
    // element: (
    //   <Suspense fallback={<ProfileSkeleton />}>
    //     <Profile />
    //   </Suspense>
    // ),
    children: [
      {
       index: true,
        element: (
          <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
        )
      },
      {
        path: PageURL.Live,
        element: (
          <Suspense fallback={"Loading..."}>
            <Live />
          </Suspense>
        )
      }
    ]
  },
  {
    path: `${PageURL.Notification}`,
    element: (
      <Suspense fallback={<NotificationSkeleton />}>
        <Notification />
      </Suspense>
    ),
  },
  {
    path: `${PageURL.Settings}`,
    element: (
      <Suspense fallback={"Loading..."}>
        <Settings />
      </Suspense>
    ),
  },

  {
    path: '/test',
    element: (
      <Suspense>
        <Test />
      </Suspense>
    ),
  },
];

export default Protected;
