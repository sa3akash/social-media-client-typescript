/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IFollowerDoc,
  IForgotPassword,
  IFullUserDoc,
  ILogin,
  IRegister,
  IResetPassword,
} from "@/interfaces/auth.interface";
import {
  forgotFn,
  loginFn,
  registerFn,
  resetFn,
  suggestedFriendFn,
  currentUser,
  markAsReadNotification,
  getNotificaitons,
  createPost,
  updateReaction,
  getUserReaction,
  getPostReaction,
  addComment,
  updatePost,
  deletePost,
  getLoginData,
  followUser,
  sendMessageJson,
  getConversations,
} from ".";
import { store } from "@/store";
import {
  setAuth,
  setLoginUserData,
  setUserReactions,
} from "@/store/reducers/AuthReducer";
import { axiosError } from "@/services/utils/serializeError";
import { AxiosError } from "axios";
import { setNotification } from "@/store/reducers/NotificationReducer";
import { clearPost } from "@/store/reducers/SinglePostReducer";
import { closeModel } from "@/store/reducers/ModelReducer";
import { ApiReactionInterface } from "@/interfaces/http.interface";
import { ISendMessageDataJson } from "@/interfaces/chat.interface";
import { setConversation } from "@/store/reducers/MessangerReducer";

class Api {
  public async loginCall(data: ILogin, toast: any): Promise<void> {
    try {
      const response = await loginFn({
        email: data.email,
        password: data.password,
      });
      store.dispatch(
        setAuth({
          authId: response.data?.user._id,
          ...response.data?.user,
        }),
      );
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async registerCall(data: IRegister, toast: any): Promise<void> {
    try {
      const response = await registerFn(data);
      store.dispatch(
        setAuth({
          authId: response.data?.user._id,
          ...response.data?.user,
        }),
      );
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async forgotCall(data: IForgotPassword, toast: any): Promise<void> {
    try {
      const response = await forgotFn(data);
      this.responseSuccess(response.data?.message, toast);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async resetCall(
    token: string,
    data: IResetPassword,
    toast: any,
  ): Promise<void> {
    try {
      const response = await resetFn(token, data);
      this.responseSuccess(response.data?.message, toast);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async suggestedFriendCall(
    toast: any,
  ): Promise<IFollowerDoc[] | undefined> {
    try {
      const response = await suggestedFriendFn();
      return response.data?.users as IFollowerDoc[];
    } catch (err) {
      this.responseError(err, toast);
    }
  }

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

  public async createPost(
    formData: FormData,
    toast: any,
    setFiles: any,
    setLoading: any,
  ): Promise<void> {
    setLoading(true);
    try {
      await createPost(formData);
      setFiles([]);
      store.dispatch(closeModel());
      store.dispatch(clearPost());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      this.responseError(err, toast);
    }
  }

  public async updatePost(
    _id: string,
    formData: FormData,
    toast: any,
    setFiles: any,
    setLoading: any,
  ): Promise<void> {
    setLoading(true);
    try {
      await updatePost(_id, formData);
      setFiles([]);
      store.dispatch(closeModel());
      store.dispatch(clearPost());
      setLoading(false);
    } catch (err) {
      setLoading(false);
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

  public async updateReactionCall(
    body: ApiReactionInterface,
    toast: any,
  ): Promise<void> {
    try {
      await updateReaction(body);
    } catch (err) {
      this.responseError(err, toast);
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
  public async followUserApi(authId: string): Promise<void> {
    try {
      await followUser(authId);
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

  public async deletePost(postId: string, toast: any) {
    try {
      await deletePost(postId);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async addCommentCall(
    value: { postId: string; comment: string },
    toast: any,
  ) {
    try {
      await addComment(value);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async sendMessageJsonCall(
    data: ISendMessageDataJson,
    toast: any,
  ): Promise<void> {
    try {
      const response = await sendMessageJson(data);
      console.log(response);
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
