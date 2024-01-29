import Image from "@/components/common/Image";
import React from "react";
import DownlaodIcon from "@/assets/images/ic_Download.svg";
import { saveAs } from "file-saver";
import { IFiles } from "@/interfaces/post.interface";

interface Props {
  file: IFiles;
}

const MessageImageShow: React.FC<Props> = ({ file }) => {
  return (
    <div className="relative group rounded-md">
      <Image
        src={file.path}
        className="h-[195px] "
        classNameTwo="object-cover"
      />
      <div
        className="cursor-pointer select-none absolute bottom-3 right-4 hidden group-hover:block z-10"
        onClick={() => saveAs(file.path, `${file.filename}-${Date.now()}.jpg`)}
      >
        <img src={DownlaodIcon} alt="d" />
      </div>
      <div className="bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-10 hidden group-hover:block" />
    </div>
  );
};

export default MessageImageShow;
