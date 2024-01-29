import { IUserDoc } from "@/interfaces/auth.interface";
import { IFiles } from "@/interfaces/post.interface";
import { IReactionDoc } from "@/interfaces/reaction.interface";

export interface IMessageData {
  _id: string;
  conversationId: string;
  senderObject: IUserDoc;
  receiverObject: IUserDoc;
  receiverId: string;
  senderId: string;
  body: string;
  isRead: boolean;
  gifUrl: string;
  files: IFiles[] | [];
  reaction: IReactionDoc[];
  createdAt: string;
}

export const messageData: IMessageData[] = [
  {
    _id: "123",
    conversationId: "123",
    body: "Hi, can you play futsal this weekend?",
    createdAt: `2020-01-21T10:38:52.932+00:00`,
    files: [],
    gifUrl: "",
    isRead: false,
    reaction: [],
    receiverId: "123",
    receiverObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakil",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
    senderId: "123",
    senderObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "sahin@gmail.com",
      name: {
        first: "shahin",
        last: "rahman",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1544031100-42d143bc3037?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
  },
  {
    _id: "123",
    conversationId: "75821",
    body: "Hello world!",
    createdAt: `2021-01-23T14:34:48.477+00:00`,
    files: [
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1529911194209-8578109840df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFkeXxlbnwwfHwwfHx8MA%3D%3D",
        size: 123654,
      },
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        size: 123654,
      },
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        size: 123654,
      },
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        size: 123654,
      },
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        size: 123654,
      },
    ],
    gifUrl: "",
    isRead: false,
    reaction: [],
    receiverId: "123",
    receiverObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "jobon",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1551024739-78e9d60c45ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
    senderId: "123",
    senderObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakb",
        last: "khan",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
  },
  {
    _id: "123",
    conversationId: "75821",
    body: "Hello world!",
    createdAt: `2023-01-23T14:34:48.477+00:00`,
    files: [
      {
        fieldname: "",
        originalname: "",
        filename: "",
        encoding: "",
        mimetype: "",
        path: "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhZHl8ZW58MHx8MHx8fDA%3D",
        size: 123654,
      },
    ],
    gifUrl: "",
    isRead: false,
    reaction: [],
    receiverId: "123",
    receiverObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "jobon",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1551024739-78e9d60c45ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
    senderId: "123",
    senderObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakb",
        last: "khan",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
  },
  {
    _id: "123",
    conversationId: "75821",
    body: "Hello world!",
    createdAt: `${new Date()}`,
    files: [],
    gifUrl: "",
    isRead: false,
    reaction: [],
    receiverId: "123",
    receiverObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "jobon",
        last: "ahmed",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1551024739-78e9d60c45ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
    senderId: "123",
    senderObject: {
      authId: "123",
      avatarColor: "#ac9898",
      coverPicture: "",
      email: "shakil@gmail.com",
      name: {
        first: "shakb",
        last: "khan",
        nick: "avro",
      },
      profilePicture:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      uId: "123",
      username: "shakil_ahmed",
      createdAt: `${new Date()}`,
      quote: "",
    },
  },
];
