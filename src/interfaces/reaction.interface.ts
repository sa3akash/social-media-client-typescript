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

export interface IReactionDoc {
  _id: string;
  authId: string;
  postId: string;
  type: string;
  createdAt: string;
  creator: IUserDoc;
}
