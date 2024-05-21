import { Skeleton } from '@/components/ui/skeleton'

const ForgotSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-[30px] w-[100px]'/>
        <Skeleton className='h-[40px] w-full'/>
      </div>
      <div>
        <Skeleton className='h-[40px] w-full]'/>
      </div>
    </div>
  )
}

export default ForgotSkeleton