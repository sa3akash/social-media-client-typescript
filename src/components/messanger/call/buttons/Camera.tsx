import { Button } from "@/components/ui/button";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";
import { CameraOff, Camera } from "lucide-react";

const CameraButton = () => {
  const { isCameraOn, toggleCamera } = useSimplePeer();

  return (
    <Button variant="ghost" onClick={toggleCamera}>
      {isCameraOn ? <Camera /> : <CameraOff />}
    </Button>
  );
};

export default CameraButton;
