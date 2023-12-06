import UserAvater from "@/components/common/UserAvater";
import { PageURL } from "@/services/utils/pageUrl";
import { Link } from "react-router-dom";

const profileImage =
  "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const UserProfile = () => {
  return (
    <Link to={`${PageURL.Profile}/123`} className="hidden md:block lg:mt-2 lg:mb-2 lg:px-4 pt-4 pb-4">
      <div className="dark:bg-[#292932] lg:borderWrapper py-3 px-4 lg:rounded-xl flex items-center lg:gap-2 select-none cursor-pointer">
        <UserAvater src={profileImage} name="Shakil Ahmed"/>
        <div className="hidden lg:block">
          <h3 className="font-semibold text-[14px] tracking-[0.1px]">
            Shakil Ahmed
          </h3>
          <span className="text-[#92929D] text-[12px]">@shakil</span>
        </div>
      </div>
    </Link>
  );
};

export default UserProfile;
