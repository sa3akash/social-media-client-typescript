import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

const ImgUrl =
  "https://images.unsplash.com/photo-1646277006532-929fc66b7bfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CoverImage =
  "https://images.unsplash.com/photo-1700945758218-50a97ac77ae4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CoverImageAndProfileImage = () => {
  return (
    <div className="w-full h-full">
      <div
        className="h-[50%] md:h-full bg-background relative overflow-hidden z-0 rounded-lg md:rounded-none"
        style={{
          backgroundImage: `url(${CoverImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img src={CoverImage} alt="" /> */}
        <Button className="transition-all font-semibold text-[12px] absolute top-4 right-4 select-none">
          Edit Profile
        </Button>

        <div className="bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-24" />
      </div>
      <div className="absolute left-0 w-full top-[80px] md:top-[50px] md:left-4 xl:bottom-6 xl:left-6 2xl:top-[100px] flex justify-center">
        <div className="flex items-center flex-col w-full md:flex-row gap-2">
          <div className="w-[160px] cardBG h-[160px] rounded-full border-[6px] border-primary overflow-hidden select-none">
            <Image src={ImgUrl} classNameTwo="object-cover"/>
          </div>
          <div className="flex flex-col md:gap-4 md:h-full md:justify-end xl:justify-center items-center justify-center px-4">
            <div className="text-[#FAFAFB] flex md:flex-col gap-4 md:gap-0 items-center">
              <h3 className="font-semibold md:text-[24px] tracking-[0.1px] leading-9">
                Ahmad Nur Fawaid
              </h3>
              <span className="roboto text-[14px] leading-6 tracking-[0.1px] md:w-full">
                @fawait
              </span>
            </div>
            <p className="roboto md:text-[16px] md:hidden tracking-[0.1px] leading-6 w-full text-center md:text-start">
              “Pushing pixels and experiences in digital <br />
              products for Sebostudio”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverImageAndProfileImage;


{/* <div className="flex items-center flex-col md:flex-row gap-2">
<div className="w-[160px] cardBG h-[160px] rounded-full border-[6px] border-primary overflow-hidden select-none">
  <Image src={ImgUrl} />
</div>
<div className="flex md:h-full md:justify-center xl:mb-8 flex-col items-center justify-center px-4">
  <div className="text-[#FAFAFB] flex gap-4 md:flex-col md:gap-0 items-center">
    <h3 className="font-semibold text-[24px] tracking-[0.1px] leading-9">
      Ahmad Nur Fawaid
    </h3>
    <span className="roboto text-[14px] md:w-full leading-6 tracking-[0.1px]">
      @fawait
    </span>
  </div>
  <p className="md:hidden roboto text-[16px] tracking-[0.1px] leading-6 w-full text-center">
    “Pushing pixels and experiences in digital <br />
    products for Sebostudio”
  </p>
</div>
</div> */}