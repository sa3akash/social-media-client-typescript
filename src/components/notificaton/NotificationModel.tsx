import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CheckSquare, Trash } from "lucide-react";
import { useDeleteNotificationMutation, useMarkReadMutation } from "@/store/rtk/notification/notificationSlice";

interface Props {
  children: React.ReactNode;
  id: string;
}

const NotificationModel: React.FC<Props> = ({ children, id }) => {

  const [markRead] = useMarkReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation()

  return (
    <Menubar className="h-full flex items-center justify-center">
      <MenubarMenu>
        <MenubarTrigger
          className="flex items-center justify-center w-10 h-6 hover:bg-gray-600 rounded-full focus-visible:outline-none"
        >
          {children}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              markRead(id);
            }}
          >
            <CheckSquare className="w-4 h-4 text-primary" />
            Read
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification(id);
            }}
          >
            <Trash className="w-4 h-4 text-primary" /> Delete
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NotificationModel;
