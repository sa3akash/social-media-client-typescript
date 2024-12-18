// import useWebrtc from "@/hooks/webrtc/useWebrtc";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { ChevronsLeft, ChevronsRight, Phone, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";

const CallingModel = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const { answerCall, endCall, remoteStream, offerData } = useSimplePeer();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      endCall();
    }, 1000 * 30);

    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!offerData) return null;
  if (!user) return null;

  const acceptCall = () => {
    navigate(
      `/messanger?conversationId=${offerData.conversationId}&receiverId=${offerData?.to?._id}`
    );
    answerCall();
  };

  return (
    !remoteStream &&
    offerData &&
    user.authId !== offerData.callerId && (
      <div className="fixed bottom-10 left-10 bg-background z-20 w-[400px] rounded-lg dark:bg-[#292932] lg:borderWrapper shadow">
        <audio src="/calling.mp3" loop autoPlay hidden></audio>
        <div className="h-full flex items-center justify-center">
          <div className="w-full p-4">
            <h1 className="text-white text-2xl text-center capitalize mb-2">
              {offerData.isVideo ? "Video" : "Audio"} Calling...
            </h1>
            <div className="flex items-center gap-5 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={offerData.to.profilePicture}
                  name={offerData.to.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] border-[3px]"
                  style={{ borderColor: offerData?.to.avatarColor }}
                />
                <h3>
                  {offerData.to.name.first} {offerData.to.name.last}
                </h3>
              </div>

              <div>
                {offerData?.to.authId === user?.authId ? (
                  <ChevronsLeft className="w-10 h-10" />
                ) : (
                  <ChevronsRight className="w-10 h-10" />
                )}
              </div>

              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={user.profilePicture}
                  name={user.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] border-[3px]"
                  style={{
                    borderColor: user.avatarColor,
                  }}
                />
                <h3>
                  {user.name.first} {user.name.last}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-5 justify-center mt-4">
              <Button
                variant="ghost"
                className="w-16 h-16 bg-rose-500 hover:bg-rose-600 rounded-full transition-all"
                onClick={endCall}
              >
                <Phone />
              </Button>
              <Button
                variant="ghost"
                className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full transition-all"
                onClick={acceptCall}
              >
                <PhoneCall />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CallingModel;
