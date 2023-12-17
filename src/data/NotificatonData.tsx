import { INotification } from "@/interfaces/notificaton.interface";
// import LoveIcon from "@/assets/images/ic_likesYellow.svg";
import CommentIcon from "@/assets/images/ic_commentGreen.svg";
import CommunityIcon from "@/assets/images/ic_friendsBlue.svg";
import LikeIcon from '@/assets/reactions/like.svg'
import LoveIcon from '@/assets/reactions/love.svg'
import WowIcon from '@/assets/reactions/wow.svg'
import HappyIcon from '@/assets/reactions/haha.svg'
import SadIcon from '@/assets/reactions/sad.svg'
import AngryIcon from '@/assets/reactions/angry.svg'

export const notificationIconMap = {
  love: LoveIcon,
  comment: CommentIcon,
  like: LikeIcon,
  happy: HappyIcon,
  wow: WowIcon,
  sad: SadIcon,
  angry: AngryIcon,
  community: CommunityIcon,
  follow: "",
};

export const notificatonData: INotification[] = [
  {
    _id: "1",
    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "liked your article that you have post.",
    notificationType: "like",
    communityName: "",
    read: false,
  },
  {
    _id: "1",
    read: false,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "loved your article that you’ve post.",
    notificationType: "love",
    communityName: "",
  },
  {
    _id: "1",
    read: true,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "That’s really coll dude",
    notificationType: "comment",
    communityName: "",
  },
  {
    _id: "1",
    read: false,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "“Mobile Apps UI Designer is required for Tech…”",
    notificationType: "love",
    communityName: "UI/UX Community",
  },
  {
    _id: "1",
    read: false,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "liked your article that you have post.",
    notificationType: "like",
    communityName: "",
  },
  {
    _id: "1",
    read: false,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "loved your article that you’ve post.",
    notificationType: "love",
    communityName: "",
  },
  {
    _id: "1",
    read: true,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "commented your post : “That’s really coll dude”",
    notificationType: "comment",
    communityName: "",
  },
  {
    _id: "1",
    read: false,

    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
      _id: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1594361487118-f4e2b2288aea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
      quote: "",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: "11/24/2003",
    },
    docCreator: "65665bb75d014908dd7573a0",
    entityId: "ddddddd56565651",
    message: "“Mobile Apps UI Designer is required for Tech…”",
    notificationType: "community",
    communityName: "UI/UX Community",
  },
];
