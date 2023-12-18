// import React from "react";
import { userData } from "@/data/AddStoryData";
import SingleStoryItem from "./item/SingleStoryItem";
import { Plus } from "lucide-react";
// import Carousel from "react-multi-carousel";

const AddStory = () => {
  return (
    <div className="h-[100px] w-full cardBG mt-2 flex md:hidden items-center border-b">
      <div className="h-full w-full">
        <div className="flex gap-4 px-4 overflow-auto h-full w-full items-center justify-start">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <Plus className="text-[#0062FF]" size={40} />
            </div>
            <span className="font-[500] text-[12px]">Add Story</span>
          </div>
          {userData.map((data, i) => (
            <SingleStoryItem key={i} item={data} />
          ))}
         
        </div>
      </div>
    </div>
  );
};

export default AddStory;

// const Catosol = () => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 5,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 5,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 3,
//     },
//   };
//   return (
//     <Carousel responsive={responsive} className="w-full">
//       <div>Item 1</div>
//       <div>Item 2</div>
//       <div>Item 3</div>
//       <div>Item 4</div>
//       <div>Item 4</div>
//     </Carousel>
//   );
// };
