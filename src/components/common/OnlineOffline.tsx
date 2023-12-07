import useNetwork from "@/hooks/useNetwork";
import { WifiOff } from "lucide-react";
import { Button } from "../ui/button";

const OnlineOffline = () => {
  const network = useNetwork();

  return (
    !network && (
      <div className="fixed left-5 md:left-8 bottom-8 z-50 max-w-full md:max-w-[40%] lg:max-w-[30%] mx-auto w-[90%] bg-primary text-primary-foreground flex items-center justify-between px-4 py-2 md:py-4 rounded-lg">
        <div className="flex items-center gap-4">
          <WifiOff className="h-7 w-7" />
          <div className="flex flex-col text-[12px] md:text-[14px]">
            <div className="font-semibold">You are currently offline.</div>
            <div>Please check your network connection.</div>
          </div>
        </div>
        <Button
          className="select-none capitalize bg-secondary text-secondary-foreground hover:bg-secondary/90"
          onClick={() => window.location.reload()}
        >
          refresh
        </Button>
      </div>
    )
  );
};

export default OnlineOffline;

{
  /* <div className="fixed left-5 md:left-8 bottom-8 z-50 max-w-full md:max-w-[40%] lg:max-w-[30%] mx-auto w-[90%] bg-primary text-primary-foreground flex items-center justify-between px-4 py-2 md:py-4 rounded-lg">
<Wifi className="h-7 w-7 text-green-400" />
<div className="flex flex-col">
  <div className="font-semibold">You are now online.</div>
  <div>Your internet connection was restored..</div>
</div>
</div> */
}
