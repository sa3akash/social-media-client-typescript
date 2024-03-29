import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { PageURL } from "@/services/utils/pageUrl";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useSelector((store:RootState)=>store.auth)

  return (
    <Link
      to={`${PageURL.Profile}/${user?.authId}`}
      className="hidden md:block lg:mt-2 lg:mb-2 lg:px-4 pt-4 pb-4"
    >
      <div className="dark:bg-[#292932] lg:borderWrapper py-3 px-4 lg:rounded-xl flex items-center lg:gap-2 select-none cursor-pointer">
        <UserAvater
          src={user?.profilePicture}
          name={user?.name as NameDoc}
          avatarColor={user?.avatarColor}
          authId={user?.authId}
        />
        <div className="hidden lg:block">
          <h3 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {`${user?.name?.first} ${user?.name?.last}`}
          </h3>
          <span className="text-[#92929D] text-[12px]">{`@${user?.username}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserProfile;
