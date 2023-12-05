import { Separator } from "@/components/ui/separator";
import { profileImage } from "@/data/ProfileImageGalary";
import Image from "@/components/common/Image";
import { Link } from "react-router-dom";

const PhotoAndVideo = () => {
  return (
    <div className="cardBG rounded-lg relative w-full">
      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">Photos and Videos</h3>
        <Link
          to="/"
          className="font-semibold text-[14px] uppercase cursor-pointer select-none"
        >
          See All
        </Link>
      </div>

      <Separator />
      <div className="px-4 py-4 flex-col w-full grid grid-cols-3 grid-rows-3 gap-2">
        {profileImage.slice(0, 9).map((image, index) => (
          <div key={index} className="w-full h-[97px] rounded-lg object-cover">
            <Image src={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoAndVideo;
