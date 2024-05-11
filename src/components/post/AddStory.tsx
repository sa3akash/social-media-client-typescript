import { userData } from "@/data/AddStoryData";
import SingleStoryItem from "@/components/post/item/SingleStoryItem";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export interface Artwork {
  artist: string;
  art: string;
}
export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

const AddStory = () => {
  return (
    // <div className="h-[100px] w-full cardBG mt-2 flex md:hidden items-center border-b">
    //   <div className="h-full w-full overflow-auto">
    //     <div className="flex gap-4 px-4 overflow-auto h-full w-full items-center justify-start">
    //       <div className="flex flex-col items-center gap-2">
    //         <div className="w-14 h-14 bg-primary rounded-full overflow-hidden flex items-center justify-center">
    //           <Plus className="text-[#0062FF]" size={40} />
    //         </div>
    //         <span className="font-[500] text-[12px]">Add Story</span>
    //       </div>
    //       <ScrollArea className="whitespace-nowrap">
    //       {userData.map((data, i) => (
    //         <SingleStoryItem key={i} item={data} />
    //       ))}
    //       {userData.map((data, i) => (
    //         <SingleStoryItem key={i} item={data} />
    //       ))}
    //       <ScrollBar orientation="horizontal" />
    //      </ScrollArea>
    //     </div>
    //   </div>
    // </div>

    <div className="cardBG p-4 mt-4 rounded-xl flex gap-2">
      <ScrollArea className="whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4">
          <div className="h-[200px] w-[120px]"></div>
          {works.map((artwork) => (
            <figure
              key={artwork.artist}
              className="shrink-0 h-[200px] w-[120px]"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Photo by{" "}
                <span className="font-semibold text-foreground">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default AddStory;
