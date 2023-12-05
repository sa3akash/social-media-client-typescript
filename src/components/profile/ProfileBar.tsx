import Image from "../common/Image";
import { Button } from "../ui/button";

const ImgUrl =
  "https://images.unsplash.com/photo-1646277006532-929fc66b7bfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CoverImage =
  "https://images.unsplash.com/photo-1700945758218-50a97ac77ae4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ProfileBar = () => {
  return (
    <div className="cardBG w-full md:w-[95%] xl:w-full md:mx-auto h-[357px] md:h-[331px] mt-2 md:mt-6 rounded-tr-xl rounded-tl-lg md:rounded-lg">
      {/*  */}
      <div
        className="group h-[260px] bg-background relative overflow-visible"
        style={{
          backgroundImage: `url(${CoverImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img src={CoverImage} alt="" /> */}
        <Button className="hidden group-hover:block transition-all font-semibold text-[12px] absolute top-4 right-4 select-none">
          Edit Profile
        </Button>
        <div className="absolute z-20 -bottom-10 left-8 flex items-center gap-4">
          <div className="w-[160px] h-[160px] rounded-full border-[6px] border-primary overflow-hidden select-none">
            <Image src={ImgUrl} />
          </div>
          <div className="text-[#FAFAFB]">
            <h3 className="font-semibold text-[24px] tracking-[0.1px] leading-9">
              Ahmad Nur Fawaid
            </h3>
            <span className="roboto text-[16px] leading-6 tracking-[0.1px]">
              @fawait
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-24" />
      </div>
      {/* details */}
      <div></div>
    </div>
  );
};

export default ProfileBar;
