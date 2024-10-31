import { useSocket } from "@/hooks/useSocket";
import { IUserDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";

interface FriendProps {
  type: "audio" | "video";
  friendUser: IUserDoc;
  user: IUserDoc;
  conversationId: string;
}

export interface MessangerContextProps {
  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  sendCall: (arg: FriendProps) => void;
  receiveCall: () => void;
  cancelCall: () => void;
  data: FriendProps | null;
  isCalling: boolean;
  isConnected: boolean;
  offerData: IOfferData | null;
}

interface WebRTCOffer {
  type: "offer";
  sdp: string;
}

interface IOfferData {
  offer: WebRTCOffer;
  to: string;
  user: IUserDoc;
  type: "audio" | "video";
  conversationId: string;
}

export const MessangerContext = createContext<MessangerContextProps | null>(
  null
);

export const MessangerProvider = ({ children }: PropsWithChildren) => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const [friendUserData, setFriendUserData] = useState<FriendProps | null>(
    null
  );
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<IOfferData | null>(null);

  const { socket } = useSocket();
  const { user } = useSelector((state: RootState) => state.auth);

  const peerRef = useRef<Peer.Instance>();

  const getMedia = async (constraints: MediaStreamConstraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (err) {
      console.log(err);
    }
  };



  const sendCall = useCallback(async (arg: FriendProps) => {
    setFriendUserData(arg);

    const constraints: MediaStreamConstraints =
      arg.type === "audio"
        ? { audio: true, video: false }
        : { audio: true, video: true };

    await getMedia(constraints);

    setIsCalling(true);
    
    console.log(localStream)

    // peerRef.current = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: localStream,
    // });

    // peerRef.current.on("signal", (offer) => {
    //   socket?.emit("offer", {
    //     type: arg.type,
    //     user: arg.user,
    //     from: arg.user.authId,
    //     to: arg.friendUser.authId,
    //     offer: offer,
    //     conversationId: arg.conversationId,
    //   });
    // });

    // socket?.on("answer", ({ answer }) => {
    //   peerRef.current?.signal(answer);
    // });

    // peerRef.current.on("stream", (remoteStream) => {
    //   console.log("remoteStream", remoteStream);
    //   setRemoteStream(remoteStream);
    //   setIsConnected(true);
    // });
  },[localStream]);




  const receiveCall = async () => {
    console.log(offerData);
    if (!offerData) return null;

    console.log("run receive call");

    const constraints: MediaStreamConstraints =
      offerData.type === "audio"
        ? { audio: true, video: false }
        : { audio: true, video: true };

    await getMedia(constraints);
    setIsCalling(true);
    setFriendUserData({
      conversationId: offerData.conversationId,
      friendUser: offerData.user,
      user: user as IUserDoc,
      type: offerData.type,
    });

    peerRef.current = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });

    peerRef.current.signal(offerData.offer);

    peerRef.current.on("signal", (ans) => {
      socket?.emit("answer", {
        type: offerData.type,
        user: offerData.user,
        from: offerData.user.authId,
        to: offerData.to,
        answer: ans,
        conversationId: offerData.conversationId,
      });
    });

    peerRef.current.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
      setIsConnected(true);
    });
  };



  const cancelCall = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(undefined);
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = undefined;
    }

    socket?.emit("cancelCall", {
      from: offerData?.user.authId,
      to: friendUserData?.friendUser.authId || offerData?.to,
      conversationId: offerData?.conversationId,
    });

    setIsCalling(false);
    setIsConnected(false);
    setOfferData(null);
    setFriendUserData(null);
  }, [
    friendUserData?.friendUser.authId,
    localStream,
    offerData?.conversationId,
    offerData?.to,
    offerData?.user.authId,
    socket,
  ]);



  useEffect(() => {
    socket?.on("offer", (data) => {
      setOfferData(data);
    });

    socket?.on("offline", () => {
      console.log("offline received user");
    });

    return () => {
      socket?.off("offer");
      socket?.off("offline");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("cancelCall", () => {
      cancelCall();
    });
    return () => {
      socket?.off("cancelCall");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <MessangerContext.Provider
      value={{
        localStream,
        remoteStream,
        sendCall,
        receiveCall,
        cancelCall,
        data: friendUserData,
        isCalling,
        isConnected,
        offerData,
      }}
    >
      {children}
    </MessangerContext.Provider>
  );
};
