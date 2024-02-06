import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameDoc } from "@/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import { Utils } from "@/services/utils/utils";

interface Props {
  src?: string;
  className?: string;
  name: NameDoc;
  avatarColor?: string;
  fallbackClassName?: string;
}

const UserAvater: React.FC<Props> = ({
  src,
  className,
  name,
  avatarColor,
  fallbackClassName
}) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} className="object-cover" />
      <AvatarFallback
        className={cn('bg-primary text-primary-foreground font-semibold',fallbackClassName)}
        style={{background: `${avatarColor}`, color: `${avatarColor && "white"}`}}
      >
        {Utils.getAvaterName(name?.first,name?.last)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvater;
