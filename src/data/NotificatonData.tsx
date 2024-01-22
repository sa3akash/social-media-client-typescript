import { INotification } from "@/interfaces/notificaton.interface";

export const notificatonData: INotification[] = [
  {
    _id: "1",
    createdAt: "04/10/2023",
    createdItemId: "35465ddddd54541515",
    creator: {
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
];
