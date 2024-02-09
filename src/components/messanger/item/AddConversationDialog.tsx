import UserAvater from "@/components/common/UserAvater";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@/assets/images/ic_Search.svg";
import { IFollowerDoc, NameDoc } from "@/interfaces/auth.interface";
import { buttonVariants } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const AddConversationDialog: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchUsers, setSearchUsers] = useState<IFollowerDoc[]>([]);

  const [searchName, setSearchName] = useState("");
  const searchValue = useDebounce(searchName, 1000);

  // useEffect(() => {
  //   console.log(searchValue);
  // }, [searchValue]);

  const { lastElementRef, loading } = useInfiniteScroll(
    `/users/${searchValue}`,
    (data) => {
      setSearchUsers(data.search || []);
    }
  );

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mt-4">
            <UserAvater
              name={user?.name as NameDoc}
              src={user?.profilePicture}
              className="!w-[32px] !h-[32px]"
              fallbackClassName="text-[12px]"
              avatarColor={user?.avatarColor}
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

          {!loading && searchUsers.length > 0 && (
            <div>
              {searchUsers.map((user, index) => (
                <SingleUser user={user} key={index} />
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

const SingleUser = ({ user }: { user: IFollowerDoc }) => {
  const handleSelectUser = () => {
    console.log(user);
  };

  return (
    <div
      className="flex items-center px-4 gap-2 rounded-md w-full h-[54px] cursor-pointer hover:bg-secondary transition-all"
      onClick={handleSelectUser}
    >
      <UserAvater
        src={user?.profilePicture}
        name={user?.name as NameDoc}
        className="w-[36px] h-[36px] md:w-[36px] md:h-[36px]"
        avatarColor={user?.avatarColor}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {user?.name.first} {user?.name.last}
          </h4>
        </div>
      </div>
    </div>
  );
};
