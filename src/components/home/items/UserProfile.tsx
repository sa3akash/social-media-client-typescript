import Image from "@/components/common/Image";

const profileImage =
  "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const UserProfile = () => {
  return (
    <div className="hidden md:block lg:py-6 lg:px-4 pt-4 pb-4">
      <div className="dark:bg-[#292932] lg:borderWrapper py-3 px-4 lg:rounded-xl flex items-center lg:gap-2 select-none cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image src={profileImage}/>
        </div>
        <div className="hidden lg:block">
          <h3 className="font-semibold text-[14px] tracking-[0.1px]">
            Shakil Ahmed
          </h3>
          <span className="text-[#92929D] text-[12px]">@shakil</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
