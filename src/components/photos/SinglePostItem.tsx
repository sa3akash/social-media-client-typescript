import { LegacyRef, forwardRef } from "react";
import Image from "@/components/common/Image";
import DownlaodIcon from "@/assets/images/ic_Download.svg";
import { saveAs } from "file-saver";

interface Props {
  post: string;
  imageUrl: string;
}

const SinglePostItem = forwardRef(
  ({ imageUrl, post }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const title = post?.length > 16 ? post.slice(0, 12) + "..." : post;

    return (
      <div
        className="group w-full h-[250px] md:h-[250px] rounded-lg relative cursor-pointer"
        ref={ref}
      >
        <Image src={imageUrl} classNameTwo="object-cover" />
        <div className="hidden group-hover:block bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-20">
          <div className="w-full h-full flex items-center justify-between px-4 py-4">
            <div className="flex-1">
              <h3 className="capitalize font-semibold text-[18px]">{title}</h3>
              <div className="text-[14px] roboto tracking-[0.1px] flex items-center gap-1 select-none">
                <div className="cursor-pointer hover:underline">Like</div>
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <div className="cursor-pointer hover:underline">Comment</div>
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <div className="cursor-pointer hover:underline">Share</div>
              </div>
            </div>
            <div
              className="cursor-pointer select-none"
              onClick={() => saveAs(imageUrl, `${post}-${Date.now()}.jpg`)}
            >
              <img src={DownlaodIcon} alt="d" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default SinglePostItem;
