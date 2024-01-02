/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IForgotPassword,
  IFullUserDoc,
  ILogin,
  IRegister,
  IResetPassword,
  IUserDoc,
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
} from ".";
import { store } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { axiosError } from "../utils/serializeError";
import { AxiosError } from "axios";
import { setNotification } from "@/store/reducers/NotificationReducer";

class Api {
  public async loginCall(data: ILogin, toast: any): Promise<void> {
    try {
      const response = await loginFn({
        email: data.email,
        password: data.password,
      });
      store.dispatch(setAuth(response.data?.user));
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async registerCall(data: IRegister, toast: any): Promise<void> {
    try {
      const response = await registerFn(data);
      store.dispatch(setAuth(response.data?.user));
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
  ): Promise<IUserDoc[] | undefined> {
    try {
      const response = await suggestedFriendFn();
      return response.data?.users as IUserDoc[];
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

  public async createPost(formData: FormData, toast: any): Promise<void> {
    try {
      const data = await createPost(formData);
      console.log(data);
    } catch (err) {
      this.responseError(err, toast);
    }
  }

  public async getNotification(toast: any): Promise<void> {
    try {
      const { data } = await getNotificaitons(1);
      store.dispatch(
        setNotification({
          notifications: data?.notifications,
        }),
      );
    } catch (err) {
      this.responseError(err, toast);
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
