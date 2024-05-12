/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  sendMessageJson,
  getConversations,
} from ".";
import { store } from "@/store";
import { axiosError } from "@/services/utils/serializeError";
import { AxiosError } from "axios";
import { ISendMessageDataJson } from "@/interfaces/chat.interface";
import { setConversation } from "@/store/reducers/MessangerReducer";

class Api {



  public async sendMessageJsonCall(
    RequestData: ISendMessageDataJson,
    toast: any
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


  private responseError(err: unknown, toast: any) {
    const { message } = axiosError(err as AxiosError);
    toast({
      variant: "destructive",
      // description: "Uh oh! Something went wrong.",
      title: message || "Uh oh! Something went wrong.",
    });
  }
}

export const api: Api = new Api();
