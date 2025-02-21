import { useCallback, useEffect, useRef } from "react";
import RealsItem from "./RealsItem";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const videos = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,27,28
];

const Reals = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight === scrollHeight;

      const prevButton = document.getElementById(
        "prevButton"
      ) as HTMLButtonElement;
      const nextButton = document.getElementById(
        "nextButton"
      ) as HTMLButtonElement;

      if (prevButton) {
        prevButton.disabled = isAtTop;
      }

      if (nextButton) {
        nextButton.disabled = isAtBottom;
      }
    }
  }, []);

  useEffect(() => {
    listRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      listRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleUpDown = (direction: "next" | "prev") => {
    if (!listRef.current) return;
    if (direction === "next") {
      listRef.current?.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
    if (direction === "prev") {
      listRef.current?.scrollBy({
        top: -window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full h-full relative">
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between z-50">
        <Button size="sm" onClick={()=>navigate(-1)}>
          <ArrowLeft />
        </Button>
        <Button>Create</Button>
      </div>
      <div className="absolute bottom-5 right-5 z-50 hidden md:flex flex-col gap-4">
        <Button id="prevButton" onClick={() => handleUpDown("prev")} size="lg">
          <ChevronUp className="w-8 h-8" />
        </Button>
        <Button id="nextButton" onClick={() => handleUpDown("next")} size="lg">
          <ChevronDown className="w-8 h-8" />
        </Button>
      </div>
      <div className="scrollType w-full h-full" ref={listRef}>
        {videos.map((item, index) => (
          <RealsItem key={index} videoUrl={`/reals/${item}.mp4`} />
        ))}
      </div>
    </section>
  );
};

export default Reals;
