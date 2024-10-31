import { Button } from "@/components/ui/button";
import CameraButton from "./buttons/Camera";
import MicButton from "./buttons/Mic";
import VolumeButton from "./buttons/Volume";
import { Phone } from "lucide-react";
import ScreenShare from "./buttons/ScreenShare";
import { FC } from "react";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";

interface Props {
  closeConnection: () => void;
}

const CallAction: FC<Props> = ({ closeConnection }) => {

  const {offerData} = useSimplePeer()



  return (
    <div className="h-20 flex items-center justify-center gap-2 relative">
     {offerData.isVideo && <CameraButton />}
      <MicButton />

      <Button
        variant="ghost"
        className="w-16 h-16 bg-rose-500 hover:bg-rose-600 rounded-full transition-all"
        onClick={closeConnection}
      >
        <Phone />
      </Button>
      <VolumeButton />
     {offerData.isVideo && <ScreenShare />}
    </div>
  );
};

export default CallAction;
