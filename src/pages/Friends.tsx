import FriendPage from "@/components/friends/FriendPage"
import { ScrollArea } from "@/components/ui/scroll-area"

const Friends = () => {
  return (
    <div className="max-w-[1200px] h-full w-full">
    <ScrollArea className="h-[95%] w-full">
      <div className="h-[calc(100%-224px)] w-full md:w-[95%] md:mx-auto">
       <FriendPage />
      </div>
    </ScrollArea>
  </div>
  )
}

export default Friends