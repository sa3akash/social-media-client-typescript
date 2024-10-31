import { Button } from "@/components/ui/button";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";
import { ScreenShare, ScreenShareOff } from "lucide-react";

const Screen = () => {
  const { isScreenSharing,toggleScreenShare } = useSimplePeer();

  const handleClick = async () => {
    await toggleScreenShare()
  };
  return (
    <Button variant="ghost" onClick={handleClick}>
      {isScreenSharing ? <ScreenShareOff /> :<ScreenShare />}
    </Button>
  );
};

export default Screen;
