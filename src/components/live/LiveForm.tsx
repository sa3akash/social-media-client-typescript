import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ChevronDown } from "lucide-react";
import { PrivacyIconMap } from "@/services/utils/map";
import { IPrivacy } from "@/interfaces/post.interface";

interface Props {
  liveValue: {
    title: string;
    description: string;
    privacy: IPrivacy;
    live: boolean;
},
setLiveValue: React.Dispatch<React.SetStateAction<{
  title: string;
  description: string;
  privacy: IPrivacy;
  live: boolean;
}>>

}

const LiveForm:FC<Props> = ({liveValue,setLiveValue}) => {





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLiveValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };







  return (
    <div className="flex-1">
      <Card className="flex-1 h-max cardBG">
        <CardHeader>
          <CardTitle className="text-lg">Add post details</CardTitle>
          <CardDescription>
            Added live post title and description
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 flex-col">
          <Input
            placeholder="Title"
            className="h-[50px]"
            name="title"
            onChange={handleChange}
          />
          <Textarea
            className="outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="rounded-md roboto font-semibold flex items-center gap-1 justify-center select-none cursor-pointer px-3 h-[50px] w-max border">
                <img
                  src={PrivacyIconMap[liveValue.privacy]}
                  alt="public"
                  className="w-4 filter dark:invert mr-1"
                />
                <span className="text-sm">{liveValue.privacy}</span>
                <ChevronDown className="w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="cardBG">
              <DropdownItem
                privacy="Public"
                onClick={() =>
                  setLiveValue((prev) => ({ ...prev, privacy: "Public" }))
                }
              />
              <Separator />
              <DropdownItem
                privacy="Private"
                onClick={() =>
                  setLiveValue((prev) => ({ ...prev, privacy: "Private" }))
                }
              />
              <Separator />

              <DropdownItem
                privacy="Only me"
                onClick={() =>
                  setLiveValue((prev) => ({ ...prev, privacy: "Only me" }))
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveForm;

// single privacy dropdown menu item
const DropdownItem = ({
  onClick,
  privacy,
}: {
  privacy: IPrivacy;
  onClick: () => void;
}) => {
  return (
    <DropdownMenuItem onClick={onClick} className="flex items-center gap-2">
      <img
        src={PrivacyIconMap[privacy]}
        alt={privacy}
        className="w-4 filter dark:invert"
      />
      <div>
        <h4 className="text-[16px] font-semibold">{privacy}</h4>
        <span className="capitalize text-[12px]">
          {privacy === "Public"
            ? "Anyone On square"
            : privacy === "Private"
              ? "Your Followers On square"
              : "For You Only"}
        </span>
      </div>
    </DropdownMenuItem>
  );
};
