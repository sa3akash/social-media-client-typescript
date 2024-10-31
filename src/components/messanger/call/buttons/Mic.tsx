import { Button } from "@/components/ui/button";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";
import { MicOff, Mic } from "lucide-react";

const MicButton = () => {
  const { isMuted, toggleMic } = useSimplePeer();

  
  return (
    <Button variant="ghost" onClick={toggleMic}>
      {isMuted ? <MicOff /> : <Mic />}
    </Button>
  );
};

export default MicButton;
