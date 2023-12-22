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
} from ".";
import { store } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { setTost } from "@/store/reducers/TostReducer";
import { axiosError } from "../utils/serializeError";
import { AxiosError } from "axios";

class Api {
  public async loginCall(data: ILogin): Promise<void> {
    try {
      const response = await loginFn({
        email: data.email,
        password: data.password,
      });
      store.dispatch(setAuth(response.data?.user));
    } catch (err) {
      this.responseError(err);
    }
  }

  public async registerCall(data: IRegister): Promise<void> {
    try {
      const response = await registerFn(data);
      store.dispatch(setAuth(response.data?.user));
    } catch (err) {
      this.responseError(err);
    }
  }

  public async forgotCall(data: IForgotPassword): Promise<void> {
    try {
      const response = await forgotFn(data);
      this.responseSuccess(response.data?.message);
    } catch (err) {
      this.responseError(err);
    }
  }

  public async resetCall(token: string, data: IResetPassword): Promise<void> {
    try {
      const response = await resetFn(token, data);
      this.responseSuccess(response.data?.message);
    } catch (err) {
      this.responseError(err);
    }
  }

  public async suggestedFriendCall(): Promise<IUserDoc[] | undefined> {
    try {
      const response = await suggestedFriendFn();
      return response.data?.users as IUserDoc[];
    } catch (err) {
      this.responseError(err);
    }
  }

  public async currentUser(authId: string): Promise<IFullUserDoc | undefined> {
    try {
      const response = await currentUser(authId);
      return response.data as IFullUserDoc;
    } catch (err) {
      this.responseError(err);
    }
  }



  private responseError(err: unknown) {
    const { message } = axiosError(err as AxiosError);
    console.log(err);
    store.dispatch(
      setTost({
        type: "error",
        message: message,
      })
    );
  }

  private responseSuccess(message: string) {
    store.dispatch(
      setTost({
        type: "success",
        message: message,
      })
    );
  }
}

export const api: Api = new Api();
