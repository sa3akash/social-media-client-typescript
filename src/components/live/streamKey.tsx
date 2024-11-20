import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FC, useEffect, useState } from "react";
import { Check, Video, VideoOff } from "lucide-react";
import {
  useGetStreamKeyQuery,
  useResetKeyMutation,
  useStartStremMutation,
  useStopStreamByKeyMutation,
} from "@/store/rtk/live/liveSlice";
import VideoPlayer from "./HLSVideoPlayer";
import { IPrivacy } from "@/interfaces/post.interface";
import { useToast } from "../ui/use-toast";

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

const StremKey: FC<Props> = ({ liveValue, setLiveValue }) => {
  const [key, setKey] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const { toast } = useToast();

  const [resetKey, { isLoading: resetLoading, data: resetDdata }] =
    useResetKeyMutation();
  const { data: getData } = useGetStreamKeyQuery("");

  const handleCopy = () => {
    setShowIcon(true);
    navigator.clipboard.writeText(key).then(() => {
      setTimeout(() => setShowIcon(false), 2000);
    });
  };

  useEffect(() => {
    setKey(getData?.streamKey);
    if (resetDdata) {
      setKey(resetDdata?.streamKey);
    }
  }, [getData?.streamKey, resetDdata]);

  const [startStrem, { data, error, isLoading }] = useStartStremMutation();
  const [stopStreamByKey] = useStopStreamByKeyMutation();

  const goLiveHandle = () => {
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
    });
  };

  const cancelLiveHandle = () => {
    stopStreamByKey({});
    setLiveValue((prev) => ({ ...prev, live: false }));
  };

  useEffect(() => {
    if (data) {
      setLiveValue((prev) => ({ ...prev, live: true }));
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to start live",
      });
      setLiveValue((prev) => ({ ...prev, live: false }));
    }
  }, [data, error, setLiveValue, toast]);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md">
        <Card className="h-max">
          <CardHeader>
            <CardTitle className="text-lg">Streaming software setup</CardTitle>
            <CardDescription>
              Copy and paste the stream key into your streaming software.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            <div className="flex items-center gap-2">
              <Input defaultValue={key} readOnly />
              <Button onClick={handleCopy}>
                {showIcon ? <Check /> : "Copy"}
              </Button>
              <Button onClick={() => resetKey("")} disabled={resetLoading}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
        {key && <VideoPlayer streamUrl={`/hls/${key}.m3u8`} />}
      </div>

      {liveValue.live ? (
        <Button
          className="bg-[#ff0873] text-white hover:bg-[#ff0873df] flex items-center gap-2 h-[50px]"
          onClick={cancelLiveHandle}
        >
          <VideoOff />
          Cancel Live
        </Button>
      ) : (
        <Button
          className="bg-[#0866ff] text-white hover:bg-[#0867ffcd] flex items-center gap-2 h-[50px]"
          onClick={goLiveHandle}
          disabled={isLoading}
        >
          <Video />
          Go Live
        </Button>
      )}
    </>
  );
};

export default StremKey;
