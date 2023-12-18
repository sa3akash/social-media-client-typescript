import { Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.svg";
import Search from "@/assets/images/ic_Search.svg";
import Chat from "@/assets/images/Chat.svg";
import Dropdown from "@/assets/images/ic_Dropdown.svg";
import Friends from "@/assets/images/ic_Friends_Request.svg";
import Notification from "@/assets/images/Notification.svg";
import { cn } from "@/lib/utils";
import { PageURL } from "@/services/utils/pageUrl";
import UserAvater from "@/components/common/UserAvater";
import useAuth from "@/hooks/useAuth";
// import ChatOff from '@/assets/images/ic_Chat_off.svg'
// import Notification_off from '@/assets/images/ic_Notification_off.svg'

import NavbarItem from "@/components/common/item/NavbarItem";
import { Utils } from "@/services/utils/utils";

const active = true;

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between gap-2 px-6 md:px-8 h-full">
      <div className="flex items-center gap-6 lg:gap-24 flex-1">
        <Link to={PageURL.Feed} className="hidden md:block">
          <img
            src={Logo}
            alt="Logo"
            className="filter brightness-0 dark:brightness-100"
          />
        </Link>
        <div className="flex select-none h-10 max-w-[500px] w-[95%] rounded-md border-input dark:bg-[#292932] borderWrapper p-1 md:px-3 md:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-row-reverse md:flex-row">
          <div className="block md:hidden w-8 h-8 object-cover rounded-full overflow-hidden">
            <NavbarItem>
              <UserAvater
                src={user?.profilePicture}
                name={Utils.getAvaterName(user!.name.first, user!.name.last)}
              />
            </NavbarItem>
          </div>
          <input
            className="focus:outline-none bg-transparent flex-1"
            type="search"
            placeholder="Search"
          />
          <img src={Search} alt="search" className="pr-2 md:pr-0" />
        </div>
      </div>

      <div className="flex items-center gap-0 md:gap-4 select-none">
        <div
          className={cn(
            "hidden md:block cursor-pointer",
            active && "bg-muted p-2 rounded-full"
          )}
        >
          <img src={Friends} alt="Friends" />
        </div>
        <div
          className={cn(
            "cursor-pointer",
            active && "bg-muted p-2 rounded-full"
          )}
        >
          <img src={Chat} alt="chat" />
        </div>
          <div
            className={cn(
              "hidden md:block cursor-pointer",
              active && "bg-muted p-2 rounded-full"
            )}
          >
            <img src={Notification} alt="Notification" />
          </div>
        <NavbarItem>
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <UserAvater
              src={user?.profilePicture}
              name={Utils.getAvaterName(user!.name.first, user!.name.last)}
            />
            <img src={Dropdown} alt="drop" />
          </div>
        </NavbarItem>
      </div>
    </div>
  );
};

export default Navbar;
