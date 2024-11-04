import React, { useRef, useState } from "react";
import ProfileImage from "@/assets/default_avatar.png";

const MarketPlace = () => {
  const [context, setContext] = useState(false);
  const [contextCordinates, setContextCoordinates] = useState({ x: 0, y: 0 });

  const handleContextCordinates = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setContextCoordinates({ x: e.clientX, y: e.clientY });
    // setContextCoordinates({x:e.pageX, y:e.pageY});
    setContext(true);
  };

  console.log(contextCordinates);
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="" onClick={handleContextCordinates} onContextMenu={handleContextCordinates}>
        <img src={ProfileImage} alt="" className="w-[120px] cursor-pointer" />
      </div>
        {context && <ContextMenu contextCordinates={contextCordinates} />}
    </div>
  );
};

export default MarketPlace;

const ContextMenu = ({
  contextCordinates,
}: {
  contextCordinates: {
    x: number;
    y: number;
  };
}) => {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="bg-red-500 fixed p-4 z-[100] shadow-md"
      ref={contextMenuRef}
      style={{
        top: contextCordinates.y + "px",
        left: contextCordinates.x + "px",
      }}
    >
      context
    </div>
  );
};
