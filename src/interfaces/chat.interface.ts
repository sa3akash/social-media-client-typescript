import { IUserDoc } from "@/interfaces/auth.interface";
import { IReactionDoc } from "@/interfaces/reaction.interface";

export interface IMessageData {
  _id: string;
  conversationId: string;
  user: IUserDoc;
  receiverId: string;
  senderId: string;
  body: string;
  isRead: boolean;
  gifUrl: string;
  files: IMessageFile[] | [];
  reaction: IReactionDoc[];
  createdAt: string;
  deleteForMe: boolean;
  deleteForEveryone: boolean;
}

export interface ISendMessageDataJson {
  conversationId?: string;
  receiverId: string;
  body: string;
  gifUrl?: string;
  isRead?: boolean;
  files: IMessageFile[] | null
}

export interface IMessageFile {
  mimetype: string,
  size?: string,
  url:string,
  name?: string,
  _id?: string
  duration?: string
  resulation?: string
}