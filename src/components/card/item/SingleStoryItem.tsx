import Image from '@/components/common/Image';
import { IUserDoc } from '@/data/AddStoryData';
import { cn } from '@/lib/utils';

const SingleStoryItem = ({ item }: { item: IUserDoc }) => {
    return (
        <div className="w-full flex items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-full overflow-hidden border-[2px]",
              item.avatarColor && `border-[${item.avatarColor}]`
            )}
          >
            <Image src={item.profilePicture} />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</span>
            <span className="text-[12px] text-[#696974]">02/05/2001 at 10:20PM</span>
          </div>
        </div>
      );
}

export default SingleStoryItem