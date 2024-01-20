import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ImageUtils } from "@/services/utils/imageUtils";

interface Props {
  src: string;
  className?: string;
  classNameTwo?: string;
}

const Image: React.FC<Props> = ({ src, className, classNameTwo }) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const [url, setUrl] = useState("");
  const imageRef = useRef(null);
  const [backgroundImageColor, setBackgroundImageColor] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          setUrl(src);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (imageRef && imageRef.current) {
      observer.observe(imageRef.current);
    }
  }, [src]);

  const getBackgroundImageColor = async (url: string) => {
    try {
      const bgColor = await ImageUtils.getBackgroundImageColor(url);
      setBackgroundImageColor(`${bgColor}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBackgroundImageColor(url);
  }, [url]);

  return (
    <div className={cn("w-full h-full", className)} ref={imageRef}>
      {!loadedImg && <Skeleton className="w-full h-[500px]" />}
      <img
        src={url}
        alt="image"
        className={cn("w-full h-full object-cover pointer-events-none", classNameTwo)}
        onLoad={() => setLoadedImg(true)}
        style={{ backgroundColor: backgroundImageColor }}
      />
    </div>
  );
};

export default Image;
