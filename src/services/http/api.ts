/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IFullUserDoc,
} from "@/interfaces/auth.interface";
import {

  currentUser,
  markAsReadNotification,
  getNotificaitons,
  getUserReaction,
  getPostReaction,
  getLoginData,
  sendMessageJson,
  getConversations,
  getNotificaitonsData,
} from ".";
import { store } from "@/store";
import {
  setLoginUserData,
  setUserReactions,
} from "@/store/reducers/AuthReducer";
import { axiosError } from "@/services/utils/serializeError";
import { AxiosError } from "axios";
import { setNotification } from "@/store/reducers/NotificationReducer";
import { ISendMessageDataJson } from "@/interfaces/chat.interface";
import { setConversation } from "@/store/reducers/MessangerReducer";
import { INotificationSettings } from "@/interfaces/settings.interface";

class Api {






  public async currentUser(
    authId: string,
    toast: any,
  ): Promise<IFullUserDoc | undefined> {
    try {
      const response = await currentUser(authId);
      return response.data as IFullUserDoc;
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async markReadNotification(
    notificationId: string,
    toast: any,
  ): Promise<void> {
    try {
      await markAsReadNotification(notificationId);
    } catch (err) {
      this.responseError(err, toast);
    }
  }


  public async getNotification(): Promise<void> {
    try {
      const { data } = await getNotificaitons(1);
      store.dispatch(
        setNotification({
          notifications: data?.notifications,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }



  public async getUserReactions(): Promise<void> {
    try {
      const { data } = await getUserReaction();
      store.dispatch(setUserReactions(data.reactions));
    } catch (err) {
      console.log(err);
    }
  }

  public async getUserLoginData(): Promise<void> {
    try {
      const { data } = await getLoginData();
      store.dispatch(setLoginUserData(data));
    } catch (err) {
      console.log(err);
    }
  }

  public async getPostReactions(url: string, toast: any) {
    try {
      const { data } = await getPostReaction(url);
      return data;
    } catch (err) {
      this.responseError(err, toast);
    }
  }


  public async sendMessageJsonCall(
    RequestData: ISendMessageDataJson,
    toast: any,
  ): Promise<void> {
    try {
      await sendMessageJson(RequestData);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async getConversationCall(): Promise<void> {
    try {
      const response = await getConversations();
      store.dispatch(setConversation(response.data?.conversationList));
    } catch (err) {
      console.log(err);
    }
  }
  public async getNotificationCall(): Promise<
    INotificationSettings | undefined
  > {
    try {
      const response = await getNotificaitonsData();
      return response.data.notifications;
    } catch (err) {
      console.log(err);
    }
  }


  private responseError(err: unknown, toast: any) {
    const { message } = axiosError(err as AxiosError);
    toast({
      variant: "destructive",
      // description: "Uh oh! Something went wrong.",
      title: message || "Uh oh! Something went wrong.",
    });
  }

  private responseSuccess(message: string, toast: any) {
    toast({
      title: message,
    });
  }
}

export const api: Api = new Api();
