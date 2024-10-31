import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { IMessageData } from "@/interfaces/chat.interface";
import { useSearchParams } from "react-router-dom";
import { messagesHelpers } from "@/store/rtk/message/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const useChatSocket = () => {
  const { socket } = useSocket();

  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    socket?.on("message-received", (data: IMessageData) => {
      dispatch(messagesHelpers.addMessage(data));
      dispatch(messagesHelpers.updateConversation(data));
    });

    // **************************
    // ********* mark read*****************
    // **************************

    socket?.on("chat-mark", (data) => {
      dispatch(messagesHelpers.updateMarkReadConversation(data.conversationId));
      dispatch(
        messagesHelpers.updateMarkReadMessage(
          conversationId!,
          data.conversationId
        )
      );
    });

    return () => {
      socket?.off("message-received");
      socket?.off("chat-mark");
      socket?.off("chat-list");
    };
  }, [conversationId, dispatch, socket]);
};
export default useChatSocket;
