import { ScrollArea } from "@/components/ui/scroll-area";
import SingleConversationItem from "@/components/messanger/item/SingleConversationItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FC, useState } from "react";
import AddConversationDialog from "@/components/messanger/item/AddConversationDialog";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

interface Props {}

const MessangerSidebar: FC<Props> = () => {
  const { conversations } = useSelector(
    (state: RootState) => state.messanger
  );
  const [openSearchModel, setOpenSearchModel] = useState(false);
  const [searchParams] = useSearchParams()


  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-[calc(100%-80px)]">
        <div className="py-4 px-4 flex items-center justify-between">
          <h4 className="text-[18px] font-semibold leading-6 tracking-[0.1px]">
            Message
          </h4>
          <Button onClick={() => setOpenSearchModel(true)}>New</Button>
        </div>
        <div className="flex flex-col gap-2 px-2 py-2">
          {conversations?.map((item, index) => (
            <SingleConversationItem
              key={index}
              item={item}
              active={
                searchParams.get("receiverId") === item.user.authId
              }
            />
          ))}
        </div>
      </ScrollArea>
      <AddConversationDialog
        openSearchModel={openSearchModel}
        setOpenSearchModel={setOpenSearchModel}
      />
    </div>
  );
};

export default MessangerSidebar;
