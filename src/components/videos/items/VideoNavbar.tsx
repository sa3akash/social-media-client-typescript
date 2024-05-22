import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const vidoeNavbarItems = [
  {
    text: "Videos",
    href: "posts",
  },
  {
    text: "Reals",
    href: "reals",
  },
  {
    text: "Live",
    href: "live",
  },
];

const VideoNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <div className="flex items-center gap-4 cardBG py-4 px-6 mt-2 md:mt-6 rounded-lg">
      {vidoeNavbarItems.map((i, index) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSearchParams({ tab: i.href })}
          key={index}
          className={cn(
            "font-semibold",
            tab === i.href
              ? "dark:bg-[#292932] lg:borderWrapper text-white"
              : "border"
          )}
        >
          {i.text}
        </Button>
      ))}
    </div>
  );
};

export default VideoNavbar;
