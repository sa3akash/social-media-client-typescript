import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UserAvater from "@/components/common/UserAvater";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { setSelectedUser } from "@/store/reducers/ModelReducer";
import ModelMessages from "@/components/models/item/ModelMessages";

import { useSendMessageMutation } from "@/store/rtk/message/message";
import { toast } from "@/components/ui/use-toast";
import { IUserDoc } from "@/interfaces/auth.interface";

const MessangerModel = () => {
  const { selectedUser } = useSelector((state: RootState) => state.model);
  const { onlineUsers } = useSelector((state: RootState) => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();

  const [sendMessage] = useSendMessageMutation()

  const hanelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const text = inputRef.current?.value;
      if (text?.length > 0) {
        sendMessage({
          receiverId: selectedUser?.user.authId as string,
          body: text,
          conversationId: selectedUser?.conversationId,
        }).then((res)=>{
        if((res as { error: string }).error){
          toast({
            variant: "destructive",
            title: (res as { error: { data: { message: string } } }).error.data.message,
          });
        } else {
          const data = (res as {data: {message: {user:IUserDoc}; conversationId: string}}).data
          dispatch(
            setSelectedUser({
              conversationId: data.conversationId,
              user: data?.message?.user,
            })
          );
          
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
        <ModelMessages conversationId={selectedUser?.conversationId} selectedUser={selectedUser.user}/>
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
