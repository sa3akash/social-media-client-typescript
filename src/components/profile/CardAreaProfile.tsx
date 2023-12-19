import AboutMeCard from "@/components/card/AboutMeCard";
import PhotoAndVideo from "@/components/card/PhotoAndVideo";
import ProfilePrograce from "@/components/card/ProfilePrograce";

const CardAreaProfile = () => {
  return (
    <div className="flex flex-col 2xl:max-w-[340px] w-full">
        <div className="flex flex-col gap-4 mt-4 md:mt-6">
          <ProfilePrograce />
          <AboutMeCard />
          <PhotoAndVideo />
        </div>
    </div>
  );
};

export default CardAreaProfile;