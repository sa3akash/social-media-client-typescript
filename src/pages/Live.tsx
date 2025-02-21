import LivePage from "@/components/live/LivePage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StreamProvider } from "@/context/StreamContext";

const Live = () => {
  return (
    <div className="flex gap-4 flex-1">
      <ScrollArea className="!flex flex-1" id="scrollOverOff">
        <StreamProvider>
          <LivePage />
        </StreamProvider>
      </ScrollArea>
    </div>
  );
};

export default Live;
