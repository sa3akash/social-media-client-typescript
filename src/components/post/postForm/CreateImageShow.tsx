import { cn } from "@/lib/utils";
import { ImageUtils } from "@/services/utils/imageUtils";
import React, { useEffect, useState } from "react";

interface Props {
  images: File[];
}

const CreateImageShow: React.FC<Props> = ({ images }) => {
  return (
    <div className="h-[300px] w-full">
      <div
        className={cn(
          "grid gap-1 h-full",
          images.length === 1 && "grid-cols-1 [repeat(1, 1fr)] grid-rows-1",
          images.length === 2 && "grid-cols-2 [repeat(1, 1fr)] grid-rows-1",
          images.length === 3 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-2",
          images.length === 4 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-2",
          images.length === 5 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-3"
        )}
      >
        {images.map((url, i) => (
          <SingleImage images={images} file={url} index={i} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CreateImageShow;

const SingleImage = ({
  images,
  file,
  index,
}: {
  images: File[];
  file: File;
  index: number;
}) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      setUrl((await ImageUtils.readAsBase64(file)) as string);
    })();
  });

  return (
    <img
      src={url}
      className={cn(
        "w-full h-full object-cover",
        index === 0 && images.length === 3 && "row-span-2 col-span-1",
        index === 0 && images.length === 5 && "row-span-2 col-span-1"
      )}
    />
  );
};
