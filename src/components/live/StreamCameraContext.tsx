import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CameraIcon, MicIcon } from "lucide-react";
import { useStreamContext } from "@/context/StreamContext";

const StreamCamera = () => {

  const {  
    devices,  
    selectedDevices,  
    isScreenSharing,  
    isMuted,  
    startStream,  
    stopStream,  
    toggleScreenShare,  
    toggleMute,  
    handleDeviceChange,
    videoRef
  } = useStreamContext(); 
  
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Camera controls</CardTitle>
          <CardDescription>
            Check that your camera and microphone inputs are properly working
            before going live.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CameraIcon />
            <Select
              value={selectedDevices.video}
              onValueChange={(value) => handleDeviceChange("video", value)}
              disabled={isScreenSharing}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Select a video device"} />
              </SelectTrigger>
              <SelectContent>
                {devices.video.map((device, index) => (
                  <SelectItem key={index} value={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <MicIcon />
            <Select
              value={selectedDevices.audio}
              onValueChange={(value) => handleDeviceChange("audio", value)}
              disabled={isScreenSharing}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Select an audio device"} />
              </SelectTrigger>
              <SelectContent>
                {devices.audio.map((device, index) => (
                  <SelectItem key={index} value={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={toggleScreenShare}>screenshare</Button>
            <Button onClick={toggleMute}>{isMuted ? "unmute" : "mute"}</Button>
            <Button onClick={startStream}>{"stream"}</Button>
            <Button onClick={stopStream}>{"stop stream"}</Button>
          </div>
        </CardContent>
      </Card>
      <div className="">
        <video ref={videoRef} autoPlay muted controls ></video>
      </div>
    </div>
  );
};

export default StreamCamera;

// const toggleScreenShare = async () => {
//     if (isScreenSharing) {
//       // Stop screen sharing
//       if (screenStreamRef.current) {
//         screenStreamRef.current.getTracks().forEach(track => track.stop());
//         screenStreamRef.current = null;
//       }
//       setIsScreenSharing(false);
//       if (videoRef.current && streamRef.current) {
//         videoRef.current.srcObject = streamRef.current; // switch back to the original stream
//       }
//     } else {
//       // Start screen sharing
//       try {
//         screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//           audio: false, // Adjust as needed; typically screen share doesn't include audio
//         });

//         // If needed, combine with existing audio track
//         if (streamRef.current) {
//           const audioTracks = streamRef.current.getAudioTracks();
//           if (audioTracks.length > 0) {
//             screenStreamRef.current.addTrack(audioTracks[0]);
//           }
//         }

//         if (videoRef.current) {
//           videoRef.current.srcObject = screenStreamRef.current;
//           videoRef.current.play();
//         }

//         setIsScreenSharing(true);
//       } catch (error) {
//         console.error("Error sharing the screen: ", error);
//       }
//     }
//   };
