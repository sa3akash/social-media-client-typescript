import { useState } from "react";
import CardWrapper from "@/components/live/Card";
import LiveForm from "./LiveForm";
import { useSearchParams } from "react-router-dom";
import StremKey from "./streamKey";
import StreamCamera from "./StreamCamera";
import { IPrivacy } from "@/interfaces/post.interface";

const LivePage = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

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

  return (
    <div className="flex gap-4 flex-1 flex-col lg:flex-row">
      <div className="flex-1 flex flex-col gap-2 p-4">
        <CardWrapper />
        <LiveForm liveValue={liveValue} setLiveValue={setLiveValue} />
      </div>

      <div className="flex-1 flex p-4 flex-col gap-2">
        {type === "camera" && <StreamCamera liveValue={liveValue} setLiveValue={setLiveValue}/>}

        {type === "software" && (
          <StremKey liveValue={liveValue} setLiveValue={setLiveValue} />
        )}
        {!type && (
          <div className="flex items-center justify-center h-full text-lg">
            <h3 className="p-4 rounded-md bg-rose-300 text-rose-700">Select a live stream type (camera or software)</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePage;
