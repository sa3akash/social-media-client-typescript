import Feed from "@/assets/images/feed-off.svg";
import Friends from "@/assets/images/friends.svg";
import Events from "@/assets/images/evant.svg";
import Videos from "@/assets/images/videos.svg";
import Images from "@/assets/images/images.svg";
import Files from "@/assets/images/files.svg";
import MarketPlace from "@/assets/images/marketPlase.svg";
import Notificatons from "@/assets/images/ic_Notification_off.svg";
import { PageURL } from "@/services/utils/pageUrl";

export interface LeftSidebarDoc {
  _id: number;
  imageUrl: string;
  name: string;
  link: string;
  disabled?: boolean;
}

export const sidebarLeft: LeftSidebarDoc[] = [
  {
    _id: 1,
    imageUrl: Feed,
    name: "Feed",
    link: PageURL.Feed,
  },
  {
    _id: 2,
    imageUrl: Friends,
    name: "Friends",
    link: PageURL.Friends,
  },
  {
    _id: 3,
    imageUrl: Events,
    name: "Events",
    link: PageURL.Events,
  },
  {
    _id: 4,
    imageUrl: Videos,
    name: "WatchVideos",
    link: PageURL.WatchVideos,
  },
  {
    _id: 5,
    imageUrl: Images,
    name: "Photos",
    link: PageURL.Photos,
  },
  {
    _id: 6,
    imageUrl: Files,
    name: "Files",
    link: PageURL.Files,
    disabled: true,
  },
  {
    _id: 7,
    imageUrl: MarketPlace,
    name: "Marketplace",
    link: PageURL.Marketplace,
    disabled: true,
  },
  {
    _id: 8,
    imageUrl: Notificatons,
    name: "Notification",
    link: PageURL.Notification,
  },
];

export interface PageSidebarDoc {
  _id: number;
  imageUrl: string;
  name: string;
}

export const sidebarLeftPage: PageSidebarDoc[] = [
  {
    _id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1476101751557-bbe4d57684e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFkeSUyMGJldXRpZnVsbHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Football FC",
  },
  {
    _id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhZHklMjBiZXV0aWZ1bGx8ZW58MHx8MHx8fDA%3D",
    name: "Badminton Club",
  },
  {
    _id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1484328861630-cf73b7d34ea3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhZHklMjBiZXV0aWZ1bGx8ZW58MHx8MHx8fDA%3D",
    name: "UI/UX Community",
  },
  {
    _id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGxhZHklMjBiZXV0aWZ1bGx8ZW58MHx8MHx8fDA%3D",
    name: "Web Developer",
  },
  {
    _id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1521038199265-bc482db0f923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxhZHklMjBiZXV0aWZ1bGx8ZW58MHx8MHx8fDA%3D",
    name: "MERN Stack",
  },
  {
    _id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGxhZHklMjBiZXV0aWZ1bGx8ZW58MHx8MHx8fDA%3D",
    name: "Graphics Design",
  },
];
