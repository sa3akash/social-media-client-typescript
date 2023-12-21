import React from "react";
import { Drawer } from "vaul";

interface Props {
  children: React.ReactNode;
  modelContent: React.ReactNode;
}

const DrawerModelProvider: React.FC<Props> = ({ children,modelContent }) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Content className="flex flex-col rounded-t-[20px] h-[70%] mt-24 fixed bottom-0 left-0 right-0 focus-visible:outline-none ">
          <div className="bg-[#292932] pt-4 flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            {modelContent}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default DrawerModelProvider;
// bg-[#1C1C24]