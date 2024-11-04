/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocket } from "@/hooks/useSocket";
import { IUserDoc } from "@/interfaces/auth.interface";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Peer from "simple-peer";

export interface SimplePeerContextProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  screenStream: MediaStream | null;
  startCall: (
    callerId: string,
    friendUser: IUserDoc,
    isVideo: boolean,
    conversationId: string
  ) => void;
  answerCall: () => void;
  endCall: () => void;
  toggleMic: () => void;
  toggleScreenShare: () => Promise<void>;
  toggleCamera: () => void;
  isMuted: boolean;
  isScreenSharing: boolean;
  isCameraOn: boolean;
  switchMicrophone: (deviceId: string) => Promise<void>;
  switchCamera: (deviceId: string) => Promise<void>;
  getAudioDevices: () => Promise<MediaDeviceInfo[]>;
  getVideoDevices: () => Promise<MediaDeviceInfo[]>;
  offerData: any;
  isCalling: boolean;
}

export const SimplePeerContext = createContext<SimplePeerContextProps | null>(
  null
);

export const SimplePeerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [offerData, setOfferData] = useState<any>(null);
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const { socket } = useSocket();

  const getMedia = async (constraints: MediaStreamConstraints) => {
    try {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const startCall = async (
    callerId: string,
    friendUser: IUserDoc,
    isVideo: boolean,
    conversationId: string
  ) => {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: isVideo,
    };

    const stream = await getMedia(constraints);
    if (!stream) return;

    setIsCalling(true);
    setOfferData({ to: friendUser, conversationId, isVideo, callerId });

    const newPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    newPeer.on("signal", (offer) => {
      // Emit this offer to your signaling server
      socket?.emit("callUser", {
        offer,
        to: friendUser.authId,
        conversationId,
        isVideo,
      });
    });

    newPeer.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream); // Store the remote stream
    });

    setPeer(newPeer);
  };

  const answerCall = async () => {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: offerData.isVideo,
    };

    setIsCalling(true);

    const stream = await getMedia(constraints);
    if (!stream) return;

    const newPeer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    newPeer.signal(offerData.offer);

    newPeer.on("signal", (answer) => {
      socket?.emit("answerCall", {
        answer,
        to: offerData.to._id,
        conversationId: offerData.conversationId,
      });
    });

    newPeer.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream); // Store the remote stream
    });

    setPeer(newPeer);
  };

  const endCall = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      setIsMuted(false);
      setIsScreenSharing(false);
      setIsCalling(false);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }

    if (peer) {
      peer.destroy();
      setPeer(null);
      setIsCalling(false);
    }

    if (offerData) {
      socket?.emit("cancelCall", { to: offerData.to.authId });
      setOfferData(null);
    }
  }, [localStream, remoteStream, peer, offerData, socket]);

  const getAudioDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "audioinput");
  };

  const getVideoDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  };

  const switchMicrophone = async (deviceId: string) => {
    if (!localStream) return;

    const audioTrack = (
      await navigator.mediaDevices.getUserMedia({ audio: { deviceId } })
    ).getAudioTracks()[0];
    const [oldAudioTrack] = localStream.getAudioTracks();

    if (oldAudioTrack) localStream.removeTrack(oldAudioTrack);
    localStream.addTrack(audioTrack);

    // Update peer connection with new audio track
    if (peer) {
      peer.replaceTrack(oldAudioTrack, audioTrack, localStream);
    }
  };

  const switchCamera = async (deviceId: string) => {
    if (!localStream) return;

    const videoTrack = (
      await navigator.mediaDevices.getUserMedia({ video: { deviceId } })
    ).getVideoTracks()[0];
    const [oldVideoTrack] = localStream.getVideoTracks();

    if (oldVideoTrack) localStream.removeTrack(oldVideoTrack);
    localStream.addTrack(videoTrack);

    // Update peer connection with new video track
    if (peer) {
      peer.replaceTrack(oldVideoTrack, videoTrack, localStream);
    }
  };

  const toggleMic = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  }, [localStream]);


  const toggleScreenShare = useCallback(async () => {
    if (!peer || !localStream) return;

    if (isScreenSharing) {
      // Stop screen sharing and switch back to the camera stream
      if (screenStream) {
        // Get the camera video track and enable it
        const cameraTrack = localStream.getVideoTracks()[0];
        cameraTrack.enabled = true;

        // Replace the screen video track with the camera video track
        const screenTrack = screenStream.getVideoTracks()[0];
        peer.replaceTrack(screenTrack, cameraTrack, localStream);

        // Stop all tracks in screenStream
        screenStream.getTracks().forEach((track) => track.stop());
        setScreenStream(null);
      }

      setIsScreenSharing(false);
    } else {
      // Start screen sharing
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        // Get screen video track and replace the camera video track with it
        const screenTrack = screenStream.getVideoTracks()[0];
        const cameraTrack = localStream.getVideoTracks()[0];

        // Disable the camera track
        cameraTrack.enabled = false;

        // Replace the camera track with the screen track
        peer.replaceTrack(cameraTrack, screenTrack, localStream);
        setScreenStream(screenStream);

        // Listen for when screen sharing stops (e.g., user clicks "Stop Sharing" in the browser)
        screenTrack.onended = () => {
          // Automatically switch back to the camera when screen sharing ends
          if (localStream) {
            const cameraTrack = localStream.getVideoTracks()[0];
            cameraTrack.enabled = true;
            peer.replaceTrack(screenTrack, cameraTrack, localStream);
          }
          setIsScreenSharing(false);
          setScreenStream(null);
        };

        setIsScreenSharing(true);
      } catch (err) {
        console.error("Error starting screen share", err);
      }
    }
  }, [isScreenSharing, localStream, peer, screenStream]);



  useEffect(() => {
    socket?.on("offer", (data) => {
      // {offer, to, isVideo, conversationId}
      setOfferData(data);
    });

    socket?.on("answer", (data) => {
      // {offer, to, isVideo, conversationId}
      // When an offer is received, call the answerCall function
      peer?.signal(data.answer); // Signal with the callee's answer to complete connection
    });

    socket?.on("cancelCall", () => {
      setOfferData(null);
      endCall();
    });

    return () => {
      endCall(); // Clean up on unmount
      socket?.off("offer"); // Remove the offer listener
      socket?.off("answer"); // Remove the offer listener
      socket?.off("cancelCall"); // Remove the offer listener
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer, socket]);

  return (
    <SimplePeerContext.Provider
      value={{
        localStream,
        remoteStream,
        startCall,
        answerCall,
        endCall,
        toggleMic,
        toggleCamera,
        isMuted,
        isCameraOn,
        offerData,
        switchMicrophone,
        switchCamera,
        getAudioDevices,
        getVideoDevices,
        isCalling,
        toggleScreenShare,
        isScreenSharing,
        screenStream,
      }}
    >
      {children}
    </SimplePeerContext.Provider>
  );
};
