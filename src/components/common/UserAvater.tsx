import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameDoc } from "@/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import { Utils } from "@/services/utils/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  src?: string;
  className?: string;
  name: NameDoc;
  avatarColor?: string;
  fallbackClassName?: string;
  authId?: string;
  indicator?: string;
  style?: object 
}

const UserAvater: React.FC<Props> = ({
  src,
  className,
  name,
  avatarColor,
  fallbackClassName,
  authId,
  indicator,
  style
}) => {
  const { onlineUsers } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative flex items-center justify-center h-full min-w-[35px]">
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)} style={style}>
        <AvatarImage src={src} className="object-cover" />
        <AvatarFallback
          className={cn(
            "bg-primary text-primary-foreground font-semibold",
            fallbackClassName
          )}
          style={{
            background: `${avatarColor}`,
            color: `${avatarColor && "white"}`,
          }}
        >
          {Utils.getAvaterName(name?.first, name?.last)}
        </AvatarFallback>
      </Avatar>
      {onlineUsers.some((id) => id === authId) && (
        <div className={cn("absolute bottom-1 right-0 w-3 h-3 rounded-full bg-[#82C43C] border-[2px] border-white",
        indicator
        )} />
      )}
    </div>
  );
};

export default UserAvater;
