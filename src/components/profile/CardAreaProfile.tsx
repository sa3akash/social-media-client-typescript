import AboutMeCard from "@/components/card/AboutMeCard";
import PhotoAndVideo from "@/components/card/PhotoAndVideo";
import ProfilePrograce from "@/components/card/ProfilePrograce";
import { IFullUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  user: IFullUserDoc
}

const CardAreaProfile:React.FC<Props> = ({user}) => {
  return (
    <section className="flex flex-col 2xl:max-w-[340px] w-full">
        <div className="flex flex-col gap-4 mt-4 md:mt-6">
          <ProfilePrograce />
          <AboutMeCard user={user}/>
          <PhotoAndVideo />
        </div>
    </section>
  );
};

export default CardAreaProfile;