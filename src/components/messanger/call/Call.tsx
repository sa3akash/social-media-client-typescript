import CallScreen from "@/components/messanger/call/CallScreen";
import CallAction from "@/components/messanger/call/CallAction";
import { IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
// import useWebrtc from "@/hooks/webrtc/useWebrtc";
import UserAvater from "@/components/common/UserAvater";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";
import useAudioAnalyzer from "@/context/useAudioAnalyzer";

const Call = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { remoteStream, offerData, localStream, endCall, isCalling } =
    useSimplePeer();

  const { activeSpeakerId } = useAudioAnalyzer();

  console.log(activeSpeakerId)


  const friendUser = offerData.to as IUserDoc;

  return (
    <div className="py-4 pl-4 flex flex-col gap-4 h-full">
      {remoteStream && (
        <div className="flex-1 h-full flex flex-row xl:flex-col gap-2 xl:gap-4">
          <CallScreen
            stream={remoteStream}
            won={false}
            user={friendUser}
            type={offerData.isVideo ? "video" : "audio"}
            talking={activeSpeakerId === friendUser?.authId}
          />
          <CallScreen
            stream={localStream}
            won={true}
            user={user}
            type={offerData.isVideo ? "video" : "audio"}
            talking={activeSpeakerId === user?.authId}
          />
        </div>
      )}

      {isCalling && !remoteStream && (
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="dark:bg-[#292932] lg:borderWrapper rounded-lg w-full p-4">
            <h1 className="text-white text-2xl text-center capitalize mb-2">
              {offerData?.isVideo ? "Video" : "Audio"} Calling...
            </h1>
            <div className="flex items-center gap-5 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={user?.profilePicture}
                  name={user?.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] h-[80px] w-[80px] xl:w-[80px] xl:h-[80px] 2xl:w-[120px] 2xl:h-[120px] border-[3px]"
                  style={{
                    borderColor: user?.avatarColor,
                  }}
                />
                <h3>
                  {user?.name.first} {user?.name.last}
                </h3>
              </div>
              <audio src="/caller.mp3" loop autoPlay hidden></audio>

              <div>
                {friendUser.authId === user?.authId ? (
                  <ChevronsLeft className="w-10 h-10" />
                ) : (
                  <ChevronsRight className="w-10 h-10" />
                )}
              </div>

              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={friendUser.profilePicture}
                  name={friendUser.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] h-[80px] w-[80px] xl:w-[80px] xl:h-[80px] 2xl:w-[120px] 2xl:h-[120px] border-[3px]"
                  style={{ borderColor: friendUser.avatarColor }}
                />
                <h3>
                  {friendUser.name.first} {friendUser.name.last}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <CallAction closeConnection={endCall} />
    </div>
  );
};

export default Call;
