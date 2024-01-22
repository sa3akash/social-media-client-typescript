import { IFollowerDoc } from "@/interfaces/auth.interface";
import { IFiles } from "@/interfaces/post.interface";
import { IReactionDoc } from "@/interfaces/reaction.interface";

export interface IMessageData{
    _id: string;
    conversationId: string;
    senderObject: IFollowerDoc;
    receiverObject: IFollowerDoc;
    receiverId: string;
    senderId: string;
    body: string;
    isRead: boolean;
    gifUrl: string;
    files: IFiles[] | [];
    reaction: IReactionDoc[];
    createdAt: Date | string;
    deleteForMe: boolean;
    deleteForEveryone: boolean;
  }