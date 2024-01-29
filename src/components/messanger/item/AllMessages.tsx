import SingleMessage from "@/components/messanger/item/SingleMessage";
import { messageData } from "@/data/MessageData";
import { Utils } from "@/services/utils/utils";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const AllMessages = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();

  const conversationId = searchParams.get("conversation");

  console.log(messageData);

  return (
    <div className="flex flex-col gap-4 p-4">
      {messageData.map((message, index) => (
        <SingleMessage
          item={message}
          wonMessage={user?.authId === message.senderId}
          authId={user?.authId as string}
          multipleMessage={
            index > 0 && message.senderId === messageData[index - 1].senderId
          }
          separatorDate={
            index > 0 &&
            !Utils.checkDateSame(
              messageData[index - 1].createdAt,
              message.createdAt
            )
          }
          key={index}
        />
      ))}
    </div>
  );
};

export default AllMessages;
