import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "@/interfaces/auth.interface";
import { forgotFn, loginFn, registerFn, resetFn } from ".";
import { store } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";

class Api {
  public async loginCall(data: ILogin): Promise<void> {
    try {
      const response = await loginFn({
        email: data.email,
        password: data.password,
      });
      store.dispatch(setAuth(response.data?.user));
    } catch (err) {
      console.log(err);
    }
  }

  public async registerCall(data: IRegister): Promise<void> {
    try {
      const response = await registerFn(data);
      store.dispatch(setAuth(response.data?.user));
    } catch (err) {
      console.log(err);
    }
  }

  public async forgotCall(data: IForgotPassword): Promise<void> {
    try {
      const response = await forgotFn(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  public async resetCall(token: string, data: IResetPassword): Promise<void> {
    try {
      const response = await resetFn(token, data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}

export const api: Api = new Api();
