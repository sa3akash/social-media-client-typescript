import { IPostDoc } from "@/interfaces/post.interface";
import { INotification } from "./notificaton.interface";

interface CommonType {
  currentPage: number;
  numberOfPages: number;
}

interface PostQuerytype extends CommonType {
  posts: IPostDoc[];
}
interface NotificationQuerytype extends CommonType {
  notifications: INotification[];
}

export interface MainPostQueryType {
  pageParams: number[];
  pages: PostQuerytype[];
}
export interface MainNotificationQueryType {
  pageParams: number[];
  pages: NotificationQuerytype[];
}
