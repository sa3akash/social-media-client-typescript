import { NameDoc } from "@/interfaces/auth.interface";

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
  fieldname?: string;
  originalname?: string;
  filename?: string;
  encoding?: string;
  mimetype: string;
  path: string;
  size?: number;
}
export interface ICreator {
  authId: string; // authId
  uId: string;
  coverPicture: string;
  profilePicture: string;
  name: NameDoc;
  username: string;
  email: string;
  avatarColor: string;
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
  creator: ICreator;
  post: string;
  bgColor?: string;
  commentsCount: number;
  files: IFiles[];
  feelings?: string;
  gifUrl?: string;
  privacy: IPrivacy;
  reactions: IReactions;
  createdAt: string;
}


export type PostModelType = 'saveLink' | 'hidePost' | 'hideAllPost' | 'unFollow' | 'edit' | 'delete' | 'pin' | 'report';