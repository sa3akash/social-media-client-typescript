import { Skeleton } from '@/components/ui/skeleton'

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
        <Skeleton className="w-full h-[400px] rounded-md dark:bg-[#1C1C24]" />
    </div>
  )
}

export default CardSkeleton