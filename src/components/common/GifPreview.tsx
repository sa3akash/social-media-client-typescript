import React from "react";
import Image from "@/components/common/Image";

interface Props {
  gifUrl: string;
}

const GifPreview: React.FC<Props> = ({ gifUrl }) => {

  return (
    <Image
      src={gifUrl}
      className="h-[320px] md:h-[500px]"
      classNameTwo="w-full h-full !object-contain"
    />
  );
};

export default GifPreview;
