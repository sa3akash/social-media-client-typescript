import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="hidden 2xl:flex flex-col max-w-[340px] w-[95%]">
        <Skeleton className="w-full mt-6 h-[400px] rounded-md" />
        <Skeleton className="w-full mt-6 h-[400px] rounded-md" />
    </div>
  )
}

export default CardSkeleton