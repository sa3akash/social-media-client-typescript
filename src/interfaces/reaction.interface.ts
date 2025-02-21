import { IUserDoc } from "@/interfaces/auth.interface";

export type ReactionName =
  | "like"
  | "love"
  | "happy"
  | "wow"
  | "sad"
  | "angry"
  | "care"
  | "all"
  | "more";

export type OnlyReactionName =
  | "like"
  | "love"
  | "happy"
  | "wow"
  | "sad"
  | "angry"
  | "care";

export interface IReactionDoc {
  _id: string;
  authId: string;
  targetId: string;
  type: string;
  createdAt: string;
  creator: IUserDoc;
}
