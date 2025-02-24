/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CardWrapper from "@/components/live/Card";
import LiveForm from "./LiveForm";
import { useSearchParams } from "react-router-dom";
import StremKey from "./streamKey";
import StreamCamera from "./StreamCamera";
import { IPrivacy } from "@/interfaces/post.interface";
import ChartCardStats from "./ChartCardStats";
import { useSocket } from "@/hooks/useSocket";
import {
  useGetStreamKeyQuery,
  useResetKeyMutation,
} from "@/store/rtk/live/liveSlice";

const LivePage = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const [stremkey, setStreamKey] = useState("");

  const { socket } = useSocket();

  const [liveValue, setLiveValue] = useState<{
    title: string;
    description: string;
    privacy: IPrivacy;
    live: boolean;
  }>({
    description: "",
    privacy: "Public",
    title: "",
    live: false,
  });

  useEffect(() => {
    socket?.on("stop-stream", ({ name }) => {
      if (name === stremkey) {
        setLiveValue((prev) => ({ ...prev, live: false }));
      }
    });
  }, [socket, stremkey]);

  const [resetKey, { isLoading: resetLoading }] = useResetKeyMutation();
  const { data: getData } = useGetStreamKeyQuery("");

  useEffect(() => {
    if (getData) {
      setStreamKey(getData?.streamKey);
      setLiveValue((prev) => ({ ...prev, live: getData.isLive }));
    }
  }, [getData]);

  return (
    <div className="">
      <div className="flex gap-4 flex-1 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col gap-2 p-4">
          <CardWrapper />
          <LiveForm liveValue={liveValue} setLiveValue={setLiveValue} />
        </div>

        <div className="flex-1 flex p-4 flex-col gap-2">
          {type === "camera" && (
            <StreamCamera liveValue={liveValue} setLiveValue={setLiveValue} />
          )}

          {type === "software" && (
            <StremKey
              liveValue={liveValue}
              setLiveValue={setLiveValue}
              stremkey={stremkey}
              resetLoading={resetLoading}
              resetSteamKeyFn={() => {
                resetKey("").then((data) => {
                  const streamData = (data as any).data;
                  setStreamKey(streamData?.streamKey);
                  setLiveValue((prev) => ({
                    ...prev,
                    live: streamData.isLive,
                  }));
                });
              }}
            />
          )}
          {!type && (
            <div className="flex items-center justify-center h-full text-lg">
              <h3 className="p-4 rounded-md bg-rose-300 text-rose-700">
                Select a live stream type (camera or software)
              </h3>
            </div>
          )}
        </div>
      </div>

      <ChartCardStats streamKey={stremkey} />
    </div>
  );
};

export default LivePage;
