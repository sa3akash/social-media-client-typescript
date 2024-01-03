import { ImageUtils } from "@/services/utils/imageUtils";
import React, { useEffect, useState } from "react";

interface Props {
  gifUrl: string;
}

const GifPreview: React.FC<Props> = ({ gifUrl }) => {
  const [backgroundImageColor, setBackgroundImageColor] = useState<string>("");

  const getBackgroundImageColor = async (url: string) => {
    try {
      const bgColor = await ImageUtils.getBackgroundImageColor(url);
      setBackgroundImageColor(`${bgColor}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBackgroundImageColor(gifUrl);
  }, [gifUrl]);
  return (
    <img
      src={gifUrl}
      className="w-full h-full max-h-[500px] object-contain"
      style={{ backgroundColor: backgroundImageColor }}
    />
  );
};

export default GifPreview;
