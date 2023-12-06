export interface ILogin {
    email: string;
    password: string;
}


export interface NameDoc {
    first: string;
    last: string;
    nick: string;
  }

export interface IUserDoc{
    _id: string;
    uId: string;
    coverPicture: string;
    profilePicture: string;
    name: NameDoc;
    username: string;
    email: string;
    quote: string;
    avatarColor: string;
    createdAt: string | Date;

}
