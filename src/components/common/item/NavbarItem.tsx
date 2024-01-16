import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { resetNotifications } from "@/store/reducers/NotificationReducer";

interface Props {
  children: React.ReactNode;
}

const NavbarItem: React.FC<Props> = ({ children }) => {

  const dispatch:AppDispatch = useDispatch()
  const navigate = useNavigate();
  const {user} = useSelector((store:RootState)=>store.auth)

  const logout = () => {
    dispatch(setAuth(null))
    dispatch(resetNotifications())
  }

  return (
    <Menubar className="bg-transparent border-none focus:bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate(`/u/${user?._id}`)}>
            Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={logout}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavbarItem;