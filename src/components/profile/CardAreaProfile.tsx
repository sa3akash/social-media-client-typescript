import AboutMeCard from "@/components/card/AboutMeCard";
import PhotoAndVideo from "@/components/card/PhotoAndVideo";
import ProfilePrograce from "@/components/card/ProfilePrograce";
import { IUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  user: IUserDoc
}

const CardAreaProfile:React.FC<Props> = ({user}) => {
  return (
    <div className="flex flex-col 2xl:max-w-[340px] w-full">
        <div className="flex flex-col gap-4 mt-4 md:mt-6">
          <ProfilePrograce />
          <AboutMeCard user={user}/>
          <PhotoAndVideo />
        </div>
    </div>
  );
};

export default CardAreaProfile;