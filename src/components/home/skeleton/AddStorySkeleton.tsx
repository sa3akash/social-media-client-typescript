import { Skeleton } from "@/components/ui/skeleton";

const AddStorySkeleton = () => {
  return (
    <div className='md:hidden mt-4'>
     <Skeleton className="w-full h-[100px] md:rounded-lg m-auto" />
    </div>
  )
}

export default AddStorySkeleton