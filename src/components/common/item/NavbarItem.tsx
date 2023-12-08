import React from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface Props {
  children: React.ReactNode;
}

const NavbarItem: React.FC<Props> = ({ children }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <Menubar className="bg-transparent border-none focus:bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate(`/u/${user?._id}`)}>
            Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => logout()}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavbarItem;

{
  /* <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <Button onClick={() => navigate(`/u/${user?._id}`)} className="w-full">Profile</Button>
        <Button onClick={() => logout()} className="w-full">Logout</Button>
      </PopoverContent>
    </Popover> */
}
