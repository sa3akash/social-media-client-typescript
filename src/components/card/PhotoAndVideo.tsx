import { Separator } from "@/components/ui/separator";
import { profileImage } from "@/data/ProfileImageGalary";
import Image from "@/components/common/Image";
import CardHeader from "@/components/card/item/CardHeader";

const PhotoAndVideo = () => {
  return (
    <div className="cardBG rounded-lg relative w-full">
       <CardHeader
        type="link"
        text="Suggested Pages"
        linkText="See All"
        link="/"
      />
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
