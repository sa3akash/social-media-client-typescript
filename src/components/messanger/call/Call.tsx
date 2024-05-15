import React, { FC, useEffect, useRef, useState } from "react";
import CallScreen from "./CallScreen";
import CallAction from "./CallAction";
import { IUserDoc } from "@/interfaces/auth.interface";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSocket } from "@/hooks/useSocket";

interface Props {
  setOpenCall: React.Dispatch<
    React.SetStateAction<{
      type: "audio" | "video";
      isCalling: boolean;
      isConnected: boolean;
      userData: IUserDoc;
    } | undefined>
  >;
  openCall: {
    type: "audio" | "video";
    isCalling: boolean;
    isConnected: boolean;
    userData: IUserDoc;
  } | undefined;
}

const Call: FC<Props> = ({ openCall, setOpenCall }) => {

  const {user} = useSelector((state:RootState)=>state.auth)

  const closeConnection = () => {
    console.log("closeConnection");
    setOpenCall(undefined);
  };

  const {socket} = useSocket()

  const peerRef = useRef<Peer.Instance>();
  const peer2Ref = useRef<Peer.Instance>();

  const [localStream,setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream,setRemoteStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const constains =
      openCall?.type === "video"
        ? {
            audio: true,
            video: true,
          }
        : {
            audio: true,
            video: false,
          };

    navigator.mediaDevices
      .getUserMedia(constains)
      .then((stream) => {
        setLocalStream(stream);
        const peer1 = new Peer({ initiator: true, stream: stream })
        peerRef.current = peer1;

        peer1.on('signal', data => {
          socket?.emit('signal', {signal: data, authId: openCall?.userData.authId})
        })

      })
      .catch((err) => console.log(err));

    
  }, [openCall?.type, openCall?.userData.authId, socket]);




  return (
    <div className="py-4 pl-4 flex flex-col gap-4 h-full">
      <div className="flex-1 h-full flex flex-col gap-4">
        <CallScreen stream={remoteStream} won={false} user={openCall?.userData as IUserDoc} type={openCall!.type}/>
        <CallScreen stream={localStream} won={true} user={user} type={openCall!.type}/>
      </div>
      <CallAction closeConnection={closeConnection} />
    </div>
  );
};

export default Call;
