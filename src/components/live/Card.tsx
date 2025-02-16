import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { CameraIcon, KeyIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const CardWrapper = () => {
  return (
    <Card className="h-max cardBG">
      <CardHeader>
        <CardDescription>Select a video source</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <IconShow text="Webcam" Icon={CameraIcon} type="camera" />
        <IconShow text="Streaming software" Icon={KeyIcon} type="software" />
      </CardContent>
    </Card>
  );
};

export default CardWrapper;

const IconShow = ({
  Icon,
  text,
  type,
}: {
  Icon: LucideIcon;
  text: string;
  type: "camera" | "software";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={cn(
        "flex-1 flex items-center justify-center h-[120px] rounded-md border-gray-400 border-[2px] flex-col gap-1 cursor-pointer select-none hover:bg-slate-700 p-2 text-center",
        searchParams.get("type") === type ? "border-green-400" : ""
      )}
      onClick={() => {
        setSearchParams({ type: type });
      }}
    >
      <Icon
        className={cn(
          "w-8 h-8",
          searchParams.get("type") === type ? "text-green-400" : ""
        )}
      />
      <span
        className={cn(
          "",
          searchParams.get("type") === type ? "text-green-400" : ""
        )}
      >
        {text}
      </span>
    </div>
  );
};
