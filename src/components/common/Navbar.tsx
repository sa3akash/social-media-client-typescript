import { Link } from "react-router-dom";
import Search from "@/assets/images/ic_Search.svg";
import Chat from "@/assets/images/Chat.svg";
import Dropdown from "@/assets/images/ic_Dropdown.svg";
import Friends from "@/assets/images/ic_Friends_Request.svg";
import Notification from "@/assets/images/Notification.svg";
import { cn } from "@/lib/utils";
import { PageURL } from "@/services/utils/pageUrl";
import UserAvater from "@/components/common/UserAvater";
// import ChatOff from '@/assets/images/ic_Chat_off.svg'
import Notification_off from "@/assets/images/ic_Notification_off.svg";

import NavbarItem from "@/components/common/item/NavbarItem";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import { useRef } from "react";
import NotificationDrop from "@/components/common/item/NotificationDrop";
import FriendsDropDown from "@/components/common/item/FriendsDropDown";
import MessageDropDown from "@/components/common/item/MessageDropDown";
import { NameDoc } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "@/components/common/ThemeToggle";
import Logo from '@/assets/images/Logo.svg';


const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const { notifications } = useSelector(
    (store: RootState) => store.notification
  );

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6 md:px-8 h-full">
        <div className="flex items-center gap-6 lg:gap-24 flex-1">
          <Link to={PageURL.Feed} className="hidden md:block select-none min-w-[180px]">
            <img
              src={Logo}
              alt="Logo"
              className="filter brightness-0 dark:brightness-100 pointer-events-none"
            />
          </Link>
          <div className="flex select-none h-10 max-w-[500px] w-[95%] rounded-md border-input dark:bg-[#292932] borderWrapper p-1 md:px-3 md:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-row-reverse md:flex-row">
            <div className="block md:hidden w-8 h-8 object-cover rounded-full overflow-hidden">
              <NavbarItem>
                <UserAvater
                  src={user?.profilePicture}
                  name={user?.name as NameDoc}
                  avatarColor={user?.avatarColor}
                />
              </NavbarItem>
            </div>
            <input
              className="focus:outline-none bg-transparent flex-1"
              type="search"
              placeholder="Search"
            />
            <img src={Search} alt="search" className="pr-2 md:pr-0 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-0 md:gap-4 select-none">
          <NavItem imageSrc={Friends} DropNode={<FriendsDropDown />} />
          <NavItem imageSrc={Chat} DropNode={<MessageDropDown />} text="chat" />
          <NavItem
            imageSrc={
              notifications.some((n) => !n.read)
                ? Notification
                : Notification_off
            }
            DropNode={<NotificationDrop />}
          />
          <NavbarItem>
            <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <UserAvater
                src={user?.profilePicture}
                name={user?.name as NameDoc}
                avatarColor={user?.avatarColor}
              />
              <img src={Dropdown} alt="drop" className="pointer-events-none"/>
            </div>
          </NavbarItem>
        </div>
        <ModeToggle />
      </div>
    </>
  );
};

export default Navbar;

interface NavItemProps {
  imageSrc: string;
  DropNode: React.ReactNode;
  text?: string;
}

const NavItem = ({ imageSrc, DropNode, text }: NavItemProps) => {
  const detactRef = useRef<HTMLDivElement | null>(null);

  const [notficationOpen, setNotificationOpen] = useDetectOutsideClick(
    detactRef,
    false
  );

  return (
    <div ref={detactRef}>
      <div
        className={cn(
          "hidden md:block cursor-pointer p-2 rounded-full transition-all",
          notficationOpen && "bg-muted",
          text === "chat" && "block md:block"
        )}
        onClick={() => setNotificationOpen((prev) => !prev)}
      >
        <img src={imageSrc} alt="Notification" className="pointer-events-none"/>
      </div>
      {notficationOpen && <>{DropNode}</>}
    </div>
  );
};
