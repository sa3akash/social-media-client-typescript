import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="hidden 2xl:flex flex-col max-w-[340px] w-full">
        <Skeleton className="w-full mt-6 h-[400px] rounded-md dark:bg-[#1C1C24]" />
        <Skeleton className="w-full mt-6 h-[400px] rounded-md dark:bg-[#1C1C24]" />
    </div>
  )
}

export default CardSkeleton