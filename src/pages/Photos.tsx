import PhotoPage from "@/components/photos/PhotoPage";
import { ScrollArea } from "@/components/ui/scroll-area";

const Photos = () => {
  return (
    <div className="max-w-[1200px] h-full w-full">
      <ScrollArea className="h-[95%] w-full">
        <div className="h-[calc(100%-224px)] w-full md:w-[95%] md:mx-auto mt-0 mb-12">
         <PhotoPage />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Photos;