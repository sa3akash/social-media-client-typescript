import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import SujestedPage from '../card/SujestedPage'
import SujestedFriends from '../card/SujestedFriends'

const VideoCardArea = () => {
  return (
    <div className="hidden 2xl:flex flex-col max-w-[340px] w-[95%]">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-4 mt-6">
          <SujestedFriends />
          <SujestedPage />
        </div>
      </ScrollArea>
    </div>
  )
}

export default VideoCardArea