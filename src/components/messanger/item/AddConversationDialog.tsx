import UserAvater from "@/components/common/UserAvater";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@/assets/images/ic_Search.svg";
import { IFollowerDoc, IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import useDebounce from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { setSelectedUser } from "@/store/reducers/ModelReducer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteSearchFriends } from "@/hooks/testhook/useGetSearchFriends";
import { messagesHelpers } from "@/store/rtk/message/helpers";
import { IMessageData } from "@/interfaces/chat.interface";

interface Props {
  setOpenSearchModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddConversationDialog: React.FC<Props> = ({ setOpenSearchModel }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchName, setSearchName] = useState("");
  const searchValue = useDebounce(searchName, 500);

  const { users, isFetching, lastPostRef } =
    useInfiniteSearchFriends(searchValue);

  const cachedConversations = useSelector(
    messagesHelpers.getConversationCache()
  );

  const converersationArray = cachedConversations?.data
    ?.conversationList as IMessageData[];

  return (
    <Dialog open={true} onOpenChange={() => setOpenSearchModel(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mt-4">
            <UserAvater
              name={user?.name as NameDoc}
              src={user?.profilePicture}
              className="!w-[32px] !h-[32px]"
              fallbackClassName="text-[12px]"
              avatarColor={user?.avatarColor}
              authId={user?.authId}
              indicator="hidden"
            />
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background select-none items-center gap-2">
              <img
                src={SearchIcon}
                alt="searchIcon"
                className="pointer-events-none"
              />
              <input
                type="text"
                className="bg-transparent border-none outline-none flex-1"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search user"
                value={searchName}
              />
              {searchName.length > 0 && (
                <X
                  className="cursor-pointer w-4 h-4"
                  onClick={() => setSearchName("")}
                />
              )}
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 ">
          {isFetching && (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin w-10" />
            </div>
          )}

          {users.length > 0 && (
            <ScrollArea className="h-[200px] w-full">
              {users
                .filter(
                  (u) =>
                    !converersationArray.some(
                      (conversation) =>
                        conversation.senderId === u._id ||
                        conversation.receiverId === u._id
                    )
                )
                .map((fUser: IFollowerDoc, index: number) => (
                  <div
                    key={index}
                    ref={users?.length === index + 1 ? lastPostRef : null}
                  >
                    <SingleUser
                      fUser={{
                        authId: fUser._id,
                        ...fUser,
                      }}
                      setOpenSearchModel={setOpenSearchModel}
                    />
                  </div>
                ))}
            </ScrollArea>
          )}
          {!isFetching && users.length === 0 && <div>No User Found.</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddConversationDialog;

const SingleUser = ({
  fUser,
  setOpenSearchModel,
}: {
  fUser: IUserDoc;
  setOpenSearchModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleSelectUser = () => {
    dispatch(
      setSelectedUser({
        user: fUser,
        conversationId: "",
      })
    );
    setOpenSearchModel(false);
  };

  return (
    <div
      className="flex items-center px-4 gap-2 rounded-md w-full h-[54px] cursor-pointer hover:bg-secondary transition-all"
      onClick={handleSelectUser}
    >
      <UserAvater
        src={fUser?.profilePicture}
        name={fUser?.name as NameDoc}
        className="w-[36px] h-[36px] md:w-[36px] md:h-[36px]"
        avatarColor={fUser?.avatarColor}
        authId={fUser?.authId}
        indicator="bottom-3"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {fUser?.name.first} {fUser?.name.last}
          </h4>
        </div>
      </div>
    </div>
  );
};
