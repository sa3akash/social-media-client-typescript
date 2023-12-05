import AboutMeCard from "@/components/card/AboutMeCard";
import PhotoAndVideo from "@/components/card/PhotoAndVideo";

const CardAreaProfile = () => {
  return (
    <div className="hidden 2xl:flex flex-col max-w-[340px] w-full">
        <div className="flex flex-col gap-4 mt-6">
          <AboutMeCard />
          <PhotoAndVideo />
        </div>
    </div>
  );
};

export default CardAreaProfile;