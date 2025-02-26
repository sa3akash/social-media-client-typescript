// StreamContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface StreamContextType {
  devices: {
    video: MediaDeviceInfo[];
    audio: MediaDeviceInfo[];
  };
  selectedDevices: {
    audio: string;
    video: string;
  };
  isScreenSharing: boolean;
  isMuted: boolean;
  startStream: () => void;
  stopStream: () => void;
  toggleScreenShare: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  toggleMute: () => void;
  handleDeviceChange: (type: "audio" | "video", deviceId: string) => void;
}

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const StreamProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const startStream = () => {
    // if (!streamRef.current) return;

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
    console.log("Sending to RTMP server:", blob);
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      console.log(byteArray);
      // send byteArray in server using socketio
        // if (socketRef.current) {
        //   socketRef.current.emit("stream", byteArray);
        // }
    };
    reader.readAsArrayBuffer(blob);
  };

  const stopStream = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <StreamContext.Provider
      value={{
        devices,
        selectedDevices,
        isScreenSharing,
        isMuted,
        startStream,
        stopStream,
        toggleScreenShare,
        toggleMute,
        handleDeviceChange,
        videoRef,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStreamContext = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStreamContext must be used within a StreamProvider");
  }
  return context;
};
