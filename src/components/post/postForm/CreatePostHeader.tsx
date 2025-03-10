import UserAvater from "@/components/common/UserAvater";
import { IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import { ChevronDown } from "lucide-react";
import React from "react";
import { PrivacyIconMap, feelingIconMap } from "@/services/utils/map";
import { IFeelings, IPrivacy } from "@/interfaces/post.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { Separator } from "@/components/ui/separator";

interface Props {
  user: IUserDoc;
  privacy: IPrivacy;
  feelings?: IFeelings;
}

const CreatePostHeader: React.FC<Props> = ({ user, privacy, feelings }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex gap-2 items-center px-4">
      <UserAvater
        src={user?.profilePicture}
        name={user?.name as NameDoc}
        className="min-w-[36px] min-h-[36px]"
        avatarColor={user?.avatarColor}
        authId={user?.authId}

      />
      <div className="capitalize">
        <h4 className="font-semibold text-[15px] flex items-center gap-2">
          {user?.name.first} {user?.name.last}
          {feelings && (
            <span className="lowercase text-[16px] font-normal flex items-center gap-1">
              is feeling <img src={feelingIconMap[feelings]} alt={feelings} className="w-6"/>
              {feelings}
            </span>
          )}
        </h4>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-muted rounded-md roboto text-[12px] font-semibold flex items-center gap-1 justify-center select-none cursor-pointer w-max px-3">
              <img
                src={PrivacyIconMap[privacy]}
                alt="public"
                className="w-3 filter dark:invert"
              />
              <span>{privacy}</span>
              <ChevronDown className="w-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="cardBG">
            <DropdownItem
              privacy="Public"
              onClick={() => dispatch(updatePostItem({ privacy: "Public" }))}
            />
            <Separator />
            <DropdownItem
              privacy="Private"
              onClick={() => dispatch(updatePostItem({ privacy: "Private" }))}
            />
            <Separator />

            <DropdownItem
              privacy="Only me"
              onClick={() => dispatch(updatePostItem({ privacy: "Only me" }))}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CreatePostHeader;

// single privacy dropdown menu item
const DropdownItem = ({
  onClick,
  privacy,
}: {
  privacy: IPrivacy;
  onClick: () => void;
}) => {
  return (
    <DropdownMenuItem onClick={onClick} className="flex items-center gap-2">
      <img
        src={PrivacyIconMap[privacy]}
        alt={privacy}
        className="w-4 filter dark:invert"
      />
      <div>
        <h4 className="text-[14px] font-semibold">{privacy}</h4>
        <span className="capitalize text-[12px]">
          {privacy === "Public"
            ? "Anyone On square"
            : privacy === "Private"
              ? "Your Followers On square"
              : "For You Only"}
        </span>
      </div>
    </DropdownMenuItem>
  );
};
