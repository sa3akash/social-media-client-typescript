export interface IReactions {
    like: number;
    love: number;
    happy: number;
    wow: number;
    sad: number;
    angry: number;
    care: number;
  }
  
  export interface NameDoc {
    first: string;
    last: string;
    nick: string;
  }
  export interface IFiles {
    fieldname: string;
    originalname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: number;
  }
  export interface ICreator {
    _id: string; // authId
    uId: string;
    coverPicture: string;
    profilePicture: string;
    name: NameDoc;
    username: string;
    email: string;
    avatarColor: string;
  }
  
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
    privacy: "Public" | "Private" | "Only me";
    reactions: IReactions;
    createdAt: string;
  }