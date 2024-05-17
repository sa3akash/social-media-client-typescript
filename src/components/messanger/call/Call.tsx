import CallScreen from "./CallScreen";
import CallAction from "./CallAction";
import { IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useWebrtc from "@/hooks/webrtc/useWebrtc";
import UserAvater from "@/components/common/UserAvater";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Call = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    localStream,
    remoteStream,
    cancelCall,
    data,
    isConnected,
    isCalling,
  } = useWebrtc();

  return (
    <div className="py-4 pl-4 flex flex-col gap-4 h-full">
      {isConnected && (
        <div className="flex-1 h-full flex flex-col gap-4">
          <CallScreen
            stream={remoteStream || null}
            won={false}
            user={data?.friendUser as IUserDoc}
            type={data!.type}
          />
          <CallScreen
            stream={localStream || null}
            won={true}
            user={user}
            type={data!.type}
            talking
          />
        </div>
      )}

      {isCalling && !isConnected && data?.user.authId === user?.authId && (
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="dark:bg-[#292932] lg:borderWrapper rounded-lg w-full p-4">
            <h1 className="text-white text-2xl text-center capitalize mb-2">
              {data?.type} Calling...
            </h1>
            <div className="flex items-center gap-5 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={data?.friendUser.profilePicture}
                  name={data?.friendUser.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] border-[3px]"
                  style={{
                    borderColor: data?.friendUser.avatarColor,
                  }}
                />
                <h3>
                  {data?.friendUser.name.first} {data?.friendUser.name.last}
                </h3>
              </div>

              <div>
                {data?.user.authId === user?.authId ? (
                  <ChevronsLeft className="w-10 h-10" />
                ) : (
                  <ChevronsRight className="w-10 h-10" />
                )}
              </div>

              <div className="flex flex-col gap-2 items-center">
                <UserAvater
                  src={data?.user.profilePicture}
                  name={data?.user.name as NameDoc}
                  indicator="hidden"
                  className="md:w-[120px] md:h-[120px] border-[3px]"
                  style={{ borderColor: data?.user.avatarColor }}
                />
                <h3>
                  {data?.user.name.first} {data?.user.name.last}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <CallAction closeConnection={cancelCall} />
    </div>
  );
};

export default Call;
