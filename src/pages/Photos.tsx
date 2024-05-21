import PhotoPage from "@/components/photos/PhotoPage";
import { ScrollArea } from "@/components/ui/scroll-area";

const Photos = () => {
  return (
    <section className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full md:w-[95%] xl:w-full md:mx-auto mt-0">
          <PhotoPage />
        </div>
      </ScrollArea>
    </section>
  );
};

export default Photos;
