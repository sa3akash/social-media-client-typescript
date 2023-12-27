import Image from "@/components/common/Image";
import { IFiles } from "@/interfaces/post.interface";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  images: IFiles[];
}

const ImagesShow: React.FC<Props> = ({ images }) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "grid gap-1",
          images.length === 1 &&
            "grid-cols-1 [repeat(1, 1fr)] grid-rows-1 h-[320px] md:h-[500px]",
          images.length === 2 &&
            "grid-cols-2 [repeat(1, 1fr)] grid-rows-1 h-[320px] md:h-[500px]",
          images.length === 3 &&
            "grid-cols-2 [repeat(2, 1fr)] grid-rows-2 h-[320px] md:h-[500px]",
          images.length === 4 &&
            "grid-cols-2 [repeat(2, 1fr)] grid-rows-2 h-[320px] md:h-[500px]",
          images.length === 5 &&
            "grid-cols-2 [repeat(2, 1fr)] grid-rows-3 h-[320px] md:h-[500px]"
        )}
      >
        {images.map((url, i) => (
          <Image
            src={url.path}
            key={i}
            className={cn(
              "",
              i === 0 && images.length === 3 && "row-span-2 col-span-1",
              i === 0 && images.length === 5 && "row-span-2 col-span-1"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesShow;
