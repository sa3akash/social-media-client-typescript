import UserAvater from "@/components/common/UserAvater";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/store";
import React, { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import SearchIcon from "@/assets/images/ic_Search.svg";
import { IFollowerDoc, IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { setMessages } from "@/store/reducers/MessangerReducer";

interface Props {
  openSearchModel: boolean;
  setOpenSearchModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddConversationDialog: React.FC<Props> = ({
  openSearchModel,
  setOpenSearchModel,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchUsers, setSearchUsers] = useState<IFollowerDoc[]>([]);

  const [searchName, setSearchName] = useState("");
  const searchValue = useDebounce(searchName, 1000);


  const { loading } = useInfiniteScroll(
    `/users/${searchValue}`,
    (data) => {
      setSearchUsers(data.search || []);
    }
  );

  return (
    <Dialog
      open={openSearchModel}
      onOpenChange={() => setOpenSearchModel(false)}
    >
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
              indicator='hidden'
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
              {searchUsers.length > 0 && (
                <X
                  className="cursor-pointer w-4 h-4"
                  onClick={() => {
                    setSearchName("");
                    setSearchUsers([]);
                  }}
                />
              )}
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {loading && (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin w-10" />
            </div>
          )}

          {!loading && user?.authId && searchUsers.length > 0 && (
            <div>
              {searchUsers.map((fUser, index) => (
                <SingleUser
                  fUser={{
                    authId: fUser._id,
                    ...fUser
                  }}
                  key={index}
                  setOpenSearchModel={setOpenSearchModel}
                />
              ))}
            </div>
          )}
          {!loading && searchUsers.length === 0 && <div>No User Found.</div>}
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
  const {conversations} = useSelector((state:RootState)=>state.messanger);
  const [,setSearchParams] = useSearchParams()
  const dispatch:AppDispatch = useDispatch()

  const handleSelectUser = () => {
    const find = conversations.find(con=>con.senderId === fUser.authId || con.receiverId === fUser.authId)
    if(find){
      setSearchParams({conversationId:find.conversationId,receiverId:find.user.authId})
    }else{
      setSearchParams({conversationId:'',receiverId:fUser.authId})
      dispatch(setMessages([]))
    }
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
        indicator='bottom-3'

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
