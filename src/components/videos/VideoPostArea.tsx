import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import VideoNavbar from './items/VideoNavbar'
import AllVideoPosts from './AllVideoPosts'

const VideoPostArea = () => {
  return (
    <div className="w-full h-full md:w-[95%] mx-auto">
      <ScrollArea className="h-full w-full">
        <VideoNavbar/>
        <AllVideoPosts />
      </ScrollArea>
    </div>
  )
}

export default VideoPostArea