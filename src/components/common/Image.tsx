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

  useEffect(() => {
    ImageUtils.getBackgroundImageColor(url)
      .then((getColor) => {
        setBackgroundImageColor(getColor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <div className={cn("w-full h-full select-none", className)} ref={imageRef}>
      {!loadedImg && (
        <Skeleton className="w-full h-full max-h-[320px] md:max-h-[500px]" />
      )}
      <img
        src={url}
        alt="image"
        className={cn(
          "w-full h-full object-contain pointer-events-none",
          classNameTwo
        )}
        onLoad={() => setLoadedImg(true)}
        style={{ backgroundColor: backgroundImageColor }}
      />
    </div>
  );
};

export default Image;
