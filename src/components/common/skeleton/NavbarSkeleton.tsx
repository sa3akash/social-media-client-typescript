import { Skeleton } from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-6 md:px-8 h-full">
      <div className="flex items-center gap-4 lg:gap-24 flex-1">
        <Skeleton className="hidden md:block md:w-[200px] h-[40px] rounded-md" />
        <div>
          <Skeleton className="w-[200px] md:w-[500px] h-[40px] rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-4 select-none">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="hidden md:block w-10 h-10 rounded-full" />
        <Skeleton className="hidden md:block w-10 h-10 rounded-full" />
        <Skeleton className="hidden md:block w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default NavbarSkeleton;
