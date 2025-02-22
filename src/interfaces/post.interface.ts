import { IUserDoc } from "@/interfaces/auth.interface";

export interface IReactions {
  like: number;
  love: number;
  happy: number;
  wow: number;
  sad: number;
  angry: number;
  care: number;
}
export const feelingData = [
  "happy",
  "excited",
  "blessed",
  "loved",
  "relaxed",
  "sad",
  "crazy",
  "blissful",
  "in love",
  "lovely",
  "cool",
  "grateful",
  "lazy",
  "amused",
  "fantastic",
  "festive",
  "pretty",
  "secure",
  "silly",
  "stupid",
  "thankful",
  "wonderful",
];

export interface IFiles {
  mimetype: string,
  size: number,
  url:string,
  name: string,
  duration?: number
  display_aspect_ratio?: string
  resolution?: string;
  file?: File;
  preview?: string;
}

export type IPrivacy = "Public" | "Private" | "Only me";
export type IFeelings =
  | "happy"
  | "excited"
  | "blessed"
  | "loved"
  | "amused"
  | "blissful"
  | "cool"
  | "crazy"
  | "excited"
  | "fantastic"
  | "festive"
  | "grateful"
  | "lazy"
  | "lovely"
  | "in love"
  | "pretty"
  | "relaxed"
  | "sad"
  | "secure"
  | "silly"
  | "stupid"
  | "thankful"
  | "wonderful";

export interface IPostDoc {
  _id: string;
  authId: string;
  uId: string;
  creator: IUserDoc;
  post: string;
  bgColor: string;
  description: string;
  commentsCount: number;
  files: IFiles[];
  feelings?: string;
  gifUrl: string;
  privacy: 'Public' | 'Private' | 'Only me';
  live: boolean;
  liveUrl: string;
  reactions: IReactions;
  createdAt: string;
}

export type PostModelType =
  | "saveLink"
  | "hidePost"
  | "hideAllPost"
  | "unFollow"
  | "edit"
  | "delete"
  | "pin"
  | "report";

export interface ICommentType {
  comment: string;
  commentedUser: string;
  createdAt: string;
  creator: IUserDoc;
  postId: string;
  _id: string;
}
