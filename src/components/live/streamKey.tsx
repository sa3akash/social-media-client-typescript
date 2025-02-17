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
import HLSVideoPlayer from "./HLSVideoPlayer";
import { IPrivacy } from "@/interfaces/post.interface";
import { useToast } from "../ui/use-toast";
import { config } from "@/config";

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
  const [showIcon, setShowIcon] = useState<'key' | 'server' | null>(null);
  const { toast } = useToast();

  const [resetKey, { isLoading: resetLoading, data: resetDdata }] =
    useResetKeyMutation();
  const { data: getData } = useGetStreamKeyQuery("");

  const handleCopy = (value:'key' | 'server') => {
    setShowIcon(value);
    if(value === 'key'){
      navigator.clipboard.writeText(key).then(() => {
        setTimeout(() => setShowIcon(null), 2000);
      });
    }else{
      navigator.clipboard.writeText(config.RTMP_SERVER_URL).then(() => {
        setTimeout(() => setShowIcon(null), 2000);
      });
    }
   
  };

  useEffect(() => {

    if (resetDdata) {
      setKey(resetDdata?.streamKey);
      setLiveValue(prev => ({ ...prev, live: resetDdata.isLive }))

    }
    if (getData) {
      setKey(getData?.streamKey);
      setLiveValue(prev => ({ ...prev, live: getData.isLive }))

    }
  }, [getData, resetDdata, setLiveValue]);

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
        title: `${(error as { data: { message: string } }).data.message ||
          "Failed to start live"
          }`,
      });
      setLiveValue((prev) => ({ ...prev, live: false }));
    }
  }, [data, error, setLiveValue, toast]);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md">
        <Card className="h-max cardBG">
          <CardHeader>
            <CardTitle className="text-lg">Streaming software setup</CardTitle>
            <CardDescription>
              Copy and paste the stream key into your streaming software.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-max">Server</div>
              <Input defaultValue={config.RTMP_SERVER_URL} readOnly className="flex-1" />
              <Button onClick={() => handleCopy('server')} className="min-w-max">
                {showIcon === 'server' ? <Check /> : "Copy"}
              </Button>

            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-max">Key</div>
              <Input defaultValue={key} readOnly className="flex-1" />
              <div className="flex gap-2 items-center">
                <Button onClick={()=>handleCopy('key')} className="min-w-max">
                  {showIcon === 'key' ? <Check /> : "Copy"}
                </Button>
                <Button onClick={() => resetKey("")} disabled={resetLoading || liveValue.live}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* {key && <LivePlayer videoUrl={`/live/${key}_360p/index.m3u8`} />} */}
        {key && <HLSVideoPlayer streamName={key} />}
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
