import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import React from 'react'

const FriendsDropDown = () => {
  return (
    <div
    className={cn(
      "fixed max-w-[340px] w-full h-[calc(100%-80px)] top-[80px] right-0 bg-background z-10 transition-all"
    )}
  >
    <ScrollArea className="h-full w-full flex">
      <div>this friends list</div>
    </ScrollArea>
  </div>
  )
}

export default FriendsDropDown