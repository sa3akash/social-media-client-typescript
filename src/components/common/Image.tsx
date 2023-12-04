import React, { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  className?: string;
}

const Image: React.FC<Props> = ({ src, className }) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const [url, setUrl] = useState("");
  const imageRef = useRef(null);

  const obserFunction = useCallback(() => {
    const observer = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        setUrl(src);
        observer.disconnect();
      }
    }, {});

    if (imageRef && imageRef.current) {
      observer.observe(imageRef.current);
    }
  }, [src]);

  useEffect(() => {
    obserFunction();
  }, [obserFunction]);
  return (
    <div className={cn("w-full h-full object-cover", className)} ref={imageRef}>
      {!loadedImg && <Skeleton className="w-full h-[500px] object-cover" />}
      <img
        src={url}
        alt="image"
        className="w-full h-full object-cover"
        onLoad={() => setLoadedImg(true)}
      />
    </div>
  );
};

export default Image;
