import React, { FC, useEffect, useRef, useState } from "react";
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
import { CameraIcon, MicIcon, Video, VideoOff } from "lucide-react";
import { IPrivacy } from "@/interfaces/post.interface";
import { useToast } from "../ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { useStartStremMutation } from "@/store/rtk/live/liveSlice";

interface Props {
  liveValue: {
    title: string;
    description: string;
    privacy: IPrivacy;
    live: boolean;
  };

  setLiveValue: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      privacy: IPrivacy;
      live: boolean;
    }>
  >;
}

const StreamCamera:FC<Props> = ({liveValue,setLiveValue}) => {
  const [devices, setDevices] = useState<{
    video: MediaDeviceInfo[];
    audio: MediaDeviceInfo[];
  }>({ video: [], audio: [] });
  const [selectedDevices, setSelectedDevices] = useState({
    audio: "",
    video: "",
  });
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream>();
  //   const streamRef = useRef<MediaStream>();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      if (!videoRef.current) return;
      cameraStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (cameraStreamRef.current) {
        videoRef.current.srcObject = cameraStreamRef.current;
        videoRef.current.play();

        // streamRef.current = cameraStreamRef.current;

        // Set the selected devices based on the media stream
        const videoTracks = cameraStreamRef.current.getVideoTracks();
        const audioTracks = cameraStreamRef.current.getAudioTracks();

        if (videoTracks.length > 0) {
          setSelectedDevices((prev) => ({
            ...prev,
            video: videoTracks[0].getSettings().deviceId || "",
          }));
        }

        if (audioTracks.length > 0) {
          setSelectedDevices((prev) => ({
            ...prev,
            audio: audioTracks[0].getSettings().deviceId || "",
          }));
        }
      }
    };
    getMedia();

    return () => {
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());

      screenStreamRef.current = null;
      mediaRecorderRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices({
        video: allDevices.filter((device) => device.kind === "videoinput"),
        audio: allDevices.filter((device) => device.kind === "audioinput"),
      });
    };
    fetchDevices();
  }, []);

  //   const handleDeviceChange = async (
  //     type: "audio" | "video",
  //     deviceId: string
  //   ) => {
  //     const newStream = await navigator.mediaDevices.getUserMedia({
  //       video: type === "video" ? { deviceId: { exact: deviceId } } : false,
  //       audio: type === "audio" ? { deviceId: { exact: deviceId } } : false,
  //     });

  //     // Stop existing tracks
  //     cameraStreamRef.current?.getTracks().forEach((track) => track.stop());

  //     // Set new stream
  //     cameraStreamRef.current = newStream;
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = newStream;
  //       videoRef.current.play();
  //     }

  //     // Update selected devices
  //     setSelectedDevices((prev) => ({ ...prev, [type]: deviceId }));
  //   };

  const handleDeviceChange = async (
    type: "audio" | "video",
    deviceId: string
  ) => {
    const currentStream = cameraStreamRef.current;

    try {
      let newTrack: MediaStreamTrack | null = null;

      if (type === "video") {
        // Get a new video track
        newTrack = await navigator.mediaDevices
          .getUserMedia({
            video: { deviceId: { exact: deviceId } },
            audio: false,
          })
          .then((stream) => stream.getVideoTracks()[0]);
      } else if (type === "audio") {
        // Get a new audio track
        newTrack = await navigator.mediaDevices
          .getUserMedia({
            video: false, // Not changing video track
            audio: { deviceId: { exact: deviceId } },
          })
          .then((stream) => stream.getAudioTracks()[0]);
      }

      if (newTrack && currentStream) {
        const existingTrack = currentStream
          .getTracks()
          .find((track) => track.kind === type);
        if (existingTrack) {
          currentStream.removeTrack(existingTrack); // Remove the old track
          existingTrack.stop(); // Stop the old track

          // Add the new track to the stream
          currentStream.addTrack(newTrack);
        }

        // Update the video element's source just in case it has changed
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          videoRef.current.play();
        }

        // Update selected devices
        setSelectedDevices((prev) => ({ ...prev, [type]: deviceId }));
      }
    } catch (error) {
      console.error("Error changing device:", error);
      // You might want to handle the error further, like notifying the user
    }
  };

  const startScreenShare = async () => {
    try {
      screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // Adjust as needed; typically screen share doesn't include audio
      });

      //   streamRef.current?.getTracks().forEach((track) => track.stop());
      //   streamRef.current = screenStreamRef.current;

      // If needed, combine with existing audio track
      if (cameraStreamRef.current) {
        const audioTracks = cameraStreamRef.current.getAudioTracks();
        if (audioTracks.length > 0) {
          screenStreamRef.current.addTrack(audioTracks[0]);
        }
      }

      // Assign screen stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = screenStreamRef.current;
        videoRef.current.play();
      }

      // Listen for track ended event
      screenStreamRef.current.getTracks().forEach((track) => {
        track.addEventListener("ended", stopScreenShare);
      });

      setIsScreenSharing(true);
    } catch (error) {
      console.error("Error starting screen share: ", error);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);
    if (videoRef.current && cameraStreamRef.current) {
      videoRef.current.srcObject = cameraStreamRef.current; // switch back to the original stream
    }

    // streamRef.current?.getTracks().forEach((track) => track.stop());
    // streamRef.current = streamRef.current!;
  };

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  const toggleMute = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled; // Toggle track enabled state
      });
    }
    setIsMuted((prev) => !prev); // Update mute state
  };

  const { toast } = useToast();
  const [startStrem] = useStartStremMutation();
  const {socket} = useSocket()

  const startStream = () => {
    // if (!streamRef.current) return;
    if (!liveValue.title || !liveValue.description) {
      toast({
        variant: "destructive",
        title: "Please fill out the title and description",
      });
      return;
    }

    startStrem({
      title: liveValue.title,
      description: liveValue.description,
      privacy: liveValue.privacy,
    })

    setLiveValue((prev) => ({ ...prev, live: true }));

    const streamToSend = isScreenSharing
      ? screenStreamRef.current!
      : cameraStreamRef.current!;

    mediaRecorderRef.current = new MediaRecorder(streamToSend, {
      mimeType: "video/webm; codecs=vp8,opus",
    });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        sendToRTMP(event.data);
      }
    };
    mediaRecorderRef.current.start(1000); // Send data every second
  };

  

  const sendToRTMP = (blob: Blob) => {
    // console.log("Sending to RTMP server:", blob);

    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);

      // send byteArray in server using socketio
        if (socket) {
          socket.emit("go-stream", byteArray);
        }
    };
    reader.readAsArrayBuffer(blob);
  };

  const stopStream = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      if(socket){
        socket.emit('stop-stream')
      }
    }
    setLiveValue((prev) => ({ ...prev, live: false }));
  };


  useEffect(()=>{
    if(socket){
      socket.on('live-error',(message)=>{
        toast({
          variant: "destructive",
          title: message,
        });
      })
    }
    return () => {
      if(socket){
        socket.off('live-error')
        socket.emit('stop-stream')
      }
    }
  },[socket, toast])

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

      {liveValue.live ? (
        <Button
          className="bg-[#ff0873] text-white hover:bg-[#ff0873df] flex items-center gap-2 h-[50px]"
          onClick={stopStream}
        >
          <VideoOff />
          Cancel Live
        </Button>
      ) : (
        <Button
          className="bg-[#0866ff] text-white hover:bg-[#0867ffcd] flex items-center gap-2 h-[50px]"
          onClick={startStream}
          // disabled={isLoading}
        >
          <Video />
          Go Live
        </Button>
      )}
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
