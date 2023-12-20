import UserAvater from "@/components/common/UserAvater";
import { IUserDoc } from "@/interfaces/auth.interface";

const SingleStoryItem = ({ item }: { item: IUserDoc }) => {
  return (
    <div className="w-full flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full overflow-hidden border-[2px]"
        style={{borderColor: `${item.avatarColor}`}}

      >
        <UserAvater
          src={item.profilePicture}
          name={item.name}
          className="w-full h-full md:w-full md:h-full"
          avatarColor={item.avatarColor}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</span>
        <span className="text-[12px] text-[#696974]">
          02/05/2001 at 10:20PM
        </span>
      </div>
    </div>
  );
};

export default SingleStoryItem;
