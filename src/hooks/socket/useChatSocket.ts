import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IMessageData } from "@/interfaces/chat.interface";
import { useSearchParams } from "react-router-dom";

interface Props {
  messages: IMessageData[] | undefined;
}

const useChatSocket = ({ messages }: Props) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { user } = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const receiverId = searchParams.get("receiverId");

  useEffect(() => {
    socket?.on("message-received", (data: IMessageData) => {
      const messageCache = queryClient.getQueryData([
        "messages",
        conversationId,
      ]) as IMessageData[];

      const newMessageCache = [...messageCache, data];
      queryClient.setQueryData(["messages", conversationId], newMessageCache);
    });

    // **************************
    // ********* mark read*****************
    // **************************

    socket?.on("chat-mark", (data) => {
      const conversationCache = queryClient.getQueryData([
        "conversations",
      ]) as IMessageData[];

      const updatedConversations = [...conversationCache].map((c) =>
        c.conversationId === data.conversationId ? { ...c, isRead: true } : c,
      );
      queryClient.setQueryData(["conversations"], updatedConversations);

      if (data.conversationId === conversationId) {
        const messageCache = queryClient.getQueryData([
          "messages",
          conversationId,
        ]) as IMessageData[];

        const updatedMessges = [...messageCache].map((m) =>
          !m.isRead ? { ...m, isRead: true } : m,
        );
        queryClient.setQueryData(["messages", conversationId], updatedMessges);
      }
    });

    return () => {
      socket?.off("message-received");
      socket?.off("chat-mark");
    };
  }, [conversationId, queryClient, socket]);

  useEffect(() => {
    if (!messages) return;
    const otherMessage =
      messages.length &&
      messages[messages.length - 1].senderId !== user?.authId;
    if (otherMessage) {
      socket?.emit("markAsMessage", {
        conversationId: conversationId,
        messageSenderId: receiverId,
        messageSeenId: user?.authId,
      });
    }
    return () => {
      socket?.off("markAsMessage");
    };
  }, [conversationId, messages, receiverId, socket, user?.authId]);
};
export default useChatSocket;