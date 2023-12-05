import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  type: "dot" | "link";
  icon?: string;
  text: string;
  linkText?: string;
  link?: string;
  setOpenModel?: (value: React.SetStateAction<boolean>) => void;
  openModel?: boolean;
  ref?: React.MutableRefObject<null | HTMLDivElement>;
}

const CardHeader: React.FC<Props> = ({
  icon,
  text,
  type,
  link,
  linkText,
  setOpenModel,
  openModel,
  ref,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 ">
      <h3 className="text-[14px] tracking-[0.1px]">{text}</h3>

      {type === "dot" ? (
        <div
          className={cn(
            "w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none",
            openModel && "borderColor"
          )}
          onClick={() => setOpenModel!((prev) => !prev)}
          ref={ref!}
        >
          <img src={icon!} alt="dot" />
        </div>
      ) : (
        <Link
          to={link!}
          className="font-semibold text-[14px] uppercase cursor-pointer select-none"
        >
          {linkText!}
        </Link>
      )}
    </div>
  );
};

export default CardHeader;
