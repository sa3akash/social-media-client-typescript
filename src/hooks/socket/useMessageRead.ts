import { useSocket } from "@/hooks/useSocket";
import { IMessageData } from "@/interfaces/chat.interface";
import { useEffect } from "react";


const useChatAsRead = (messages: IMessageData[], conversationId: string, receiverId: string,authId: string) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!messages) return;
    const otherMessage =
    messages.length &&
    messages[messages.length - 1].senderId !== authId;
    if (otherMessage) {
      socket?.emit("markAsMessage", {
        conversationId: conversationId,
        messageSenderId: receiverId,
        messageSeenId: authId,
      });
    }
    return () => {
      socket?.off("markAsMessage");
    };
  }, [authId, conversationId, messages, receiverId, socket]);


};
export default useChatAsRead;
