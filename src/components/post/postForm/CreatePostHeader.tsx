import UserAvater from "@/components/common/UserAvater";
import { IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import { ChevronDown } from "lucide-react";
import React from "react";
import { PrivacyIconMap } from "@/services/utils/map";

interface Props {
  user: IUserDoc;
  privacy: "Public" | "Private" | "Only Me";
}

const CreatePostHeader: React.FC<Props> = ({ user, privacy }) => {
  return (
    <div className="flex gap-2 items-center px-4">
      <UserAvater
        src={user?.profilePicture}
        name={user?.name as NameDoc}
        className="min-w-[36px] min-h-[36px]"
        avatarColor={user?.avatarColor}
      />
      <div className="capitalize">
        <h4 className="font-semibold text-[15px]">
          {user?.name.first} {user?.name.last}
        </h4>
        <div className="bg-muted rounded-md roboto text-[12px] font-semibold flex items-center gap-1 justify-center select-none cursor-pointer">
          <img src={PrivacyIconMap[privacy]} alt="public" className="w-3 filter brightness-0 dark:brightness-150" />
          <span>public</span>
          <ChevronDown className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default CreatePostHeader;
