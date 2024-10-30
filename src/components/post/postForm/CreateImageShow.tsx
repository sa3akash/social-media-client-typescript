import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageUtils } from "@/services/utils/imageUtils";
import { Trash } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  images: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const CreateImageShow: React.FC<Props> = ({ images, setFiles }) => {

  return (
    <div className="h-[220px] md:h-[300px] w-full">
      <div
        className={cn(
          "grid gap-1 h-full ",
          images.length === 1 && "grid-cols-1 [repeat(1, 1fr)] grid-rows-1",
          images.length === 2 && "grid-cols-2 [repeat(1, 1fr)] grid-rows-1",
          images.length === 3 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-2",
          images.length === 4 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-2",
          images.length === 5 && "grid-cols-2 [repeat(2, 1fr)] grid-rows-3"
        )}
      >
        {images.map((url, i) => (
          <SingleImage
            images={images}
            file={url}
            index={i}
            key={i}
            setFiles={setFiles}
          />
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
  setFiles,
}: {
  images: File[];
  file: File;
  index: number;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      setUrl((await ImageUtils.readAsBase64(file)) as string);
    })();
  }, [file]);

  return (
    <div
      className={cn(
        "w-full h-full object-cover relative group",
        index === 0 && images.length === 3 && "row-span-2 col-span-1",
        index === 0 && images.length === 5 && "row-span-2 col-span-1"
      )}
    >
      {file.type === "video/mp4" ? (
        <video
          src={url}
          className="w-full h-full object-cover"
          autoPlay
          muted
        ></video>
      ) : (
        <img src={url} className="w-full h-full object-cover" />
      )}
      <div className="absolute top-0 left-0 w-full ml-auto h-14 hidden group-hover:block p-2">
        <Button
          onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
        >
          <Trash className="w-5" />
        </Button>
      </div>
    </div>
  );
};
