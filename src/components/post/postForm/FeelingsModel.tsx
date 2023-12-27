import { ScrollArea } from "@/components/ui/scroll-area";
import { feelingData } from "@/data/PostData";
import { IFeelings } from "@/interfaces/post.interface";
import { feelingIconMap } from "@/services/utils/map";
import { AppDispatch } from "@/store";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { useDispatch } from "react-redux";

const FeelingsModel = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="absolute bottom-[58px] right-[55px] cardBG border rounded-md">
      <ScrollArea className="h-[170px] w-[150px]">
        {feelingData.map((item, i) => (
          <div
            key={i}
            className="px-4 py-2 flex items-center gap-2"
            onClick={() =>
              dispatch(updatePostItem({ feelings: item as IFeelings }))
            }
          >
            <img
              src={feelingIconMap[item as IFeelings]}
              alt=""
              className="w-6"
            />
            <span>{item}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FeelingsModel;
