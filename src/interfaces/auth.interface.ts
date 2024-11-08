export interface CustomError {
  status: number;
  data: {
    message: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IResetPassword {
  password: string;
  confirmPassword: string;
}
export interface IUpdatePassword {
  password: string;
  confirmPassword: string;
  oldPassword: string;
}

export interface NameDoc {
  first: string;
  last: string;
  nick: string;
}

export interface IUserDoc {
  authId: string;
  uId: string;
  coverPicture: string;
  profilePicture: string;
  name: NameDoc;
  username: string;
  email: string;
  quote: string;
  avatarColor: string;
  createdAt?: string | Date;
}
export interface IFollowerDoc {
  _id: string;
  uId: string;
  coverPicture: string;
  profilePicture: string;
  name: NameDoc;
  username: string;
  email: string;
  quote: string;
  avatarColor: string;
  createdAt?: string | Date;
}

export interface RelationShipDoc {
  type: "Single" | "In a relationship" | "Married" | "Divorced";
  partner: string;
}

export interface IFullUserDoc {
  work: string;
  school: string;
  website: string;
  gender: string;
  quote: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  relationShip: {
    type: string;
    partner: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
    local: string;
    country: string;
  };

  dob: {
    day: string;
    month: string;
    year: string;
  };
  notifications: {
    messages: boolean;
    reactions: boolean;
    comments: boolean;
    follows: boolean;
  };
  blocked: string[];
  blockedBy: string[];
  postsCount: number;
  followersCount: number;
  followingCount: number;
  username: string;
  avatarColor: string;
  createdAt: string;
  email: string;
  _id: string;
  authId: string;
  profilePicture: string;
  uId: string;
  name: NameDoc;
  coverPicture: string;
}

export interface IUserReactionDoc {
  _id: string;
  authId: string;
  creator: IUserDoc;
  type: string;
  postId: string;
  createdAt: string;
}

export interface StoreImagProfile {
  profilePic: string;
  profileRow: File | null;
  coverPic: string;
  coverPicRow: File | null;
  openProfileModel: boolean;
}
