import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import UserAvater from "@/components/common/UserAvater";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { setSelectedUser } from "@/store/reducers/ModelReducer";

import { useSendMessageMutation } from "@/store/rtk/message/message";
import { toast } from "@/components/ui/use-toast";
import { IUserDoc } from "@/interfaces/auth.interface";
import { useChat } from "@/hooks/chat/useChat";
import useChatAsRead from "@/hooks/socket/useMessageRead";
import SingleMessage from "@/components/messanger/item/SingleMessage";
import { Utils } from "@/services/utils/utils";

const MessangerModel = () => {
  const { selectedUser } = useSelector((state: RootState) => state.model);
  const { onlineUsers } = useSelector((state: RootState) => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const conversationId = selectedUser?.conversationId as string;
  const selectedUserData = selectedUser?.user as IUserDoc;

  const { chatContainerRef, messages, isLoading, scrollToBottom } =
    useChat(conversationId);

  useChatAsRead(
    messages,
    conversationId,
    selectedUserData?.authId,
    user!.authId
  );

  const dispatch: AppDispatch = useDispatch();

  const [sendMessage] = useSendMessageMutation();

  const hanelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const text = inputRef.current?.value;
      if (text?.length > 0) {
        sendMessage({
          receiverId: selectedUserData.authId,
          body: text,
          conversationId: conversationId,
          files: [],
        }).then((res) => {
          if ((res as { error: string }).error) {
            toast({
              variant: "destructive",
              title: (res as { error: { data: { message: string } } }).error
                .data.message,
            });
          } else {
            const data = (
              res as {
                data: { message: { user: IUserDoc }; conversationId: string };
              }
            ).data;
            dispatch(
              setSelectedUser({
                conversationId: data.conversationId,
                user: data?.message?.user,
              })
            );
            scrollToBottom();
          }
        });
        inputRef.current.value = "";
      }
    }
  };

  return (
    selectedUser && (
      <div className="fixed z-50 left-4 bottom-0 w-[400px] h-[400px] cardBG borderWrapper  flex flex-col gap-2 rounded-tl-md rounded-tr-md justify-between">
        <div className="bg-green-500">
          <div className="p-2 flex gap-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <UserAvater
                src={selectedUser.user?.profilePicture}
                name={selectedUser.user?.name}
                className="w-[36px] h-[36px] md:w-[36px] md:h-[36px]"
                avatarColor={selectedUser.user?.avatarColor}
                authId={selectedUser?.user.authId}
                indicator="hidden"
              />
              <div className="flex-1">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm tracking-[0.1px] capitalize">
                    {selectedUser?.user.name.first}{" "}
                    {selectedUser.user?.name.last}
                  </h4>
                  <span className="text-[12px]">
                    {onlineUsers.some((i) => i === selectedUser.user.authId)
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <X />
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div
            className="h-full w-full px-4 overflow-y-scroll"
            ref={chatContainerRef}
            id="chat-container"
          >
            {isLoading && (
              <div className="w-full flex items-center gap-2 justify-center py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </div>
            )}

            <div className="flex-1"></div>

            <div>
              {messages.map((message, index) => (
                <SingleMessage
                  item={message}
                  wonMessage={user?.authId === message.senderId}
                  multipleMessage={
                    index > 0 &&
                    message.senderId === messages[index - 1].senderId
                  }
                  separatorDate={
                    index > 0 &&
                    !Utils.checkDateSame(
                      messages[index - 1].createdAt,
                      message.createdAt
                    )
                  }
                  key={index}
                  lastMessage={index + 1 === messages.length}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 border-t border-gray-600">
          <Input
            className="bg-transparent border-none"
            placeholder="Write a new message"
            ref={inputRef}
            onKeyDown={hanelKeyDown}
          />
        </div>
      </div>
    )
  );
};

export default MessangerModel;
