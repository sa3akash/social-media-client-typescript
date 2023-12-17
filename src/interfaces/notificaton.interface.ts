import { IUserDoc } from "@/interfaces/auth.interface";

export interface INotification {
  creator: IUserDoc;
  _id: string;
  docCreator: string;
  message: string;
  communityName?: string;
  notificationType:
    | "like"
    | "love"
    | "happy"
    | "wow"
    | "sad"
    | "angry"
    | "comment"
    | "community"
    | "follow";
  entityId: string;
  createdItemId: string;
  createdAt: string;
  read: boolean
}

