import { IFiles } from "@/interfaces/post.interface"
import type React from "react"

import { memo, useRef, useState } from "react"

interface MediaPreviewProps {
  file: IFiles
  onLoad?: () => void
}

export const MediaPreview = memo(function MediaPreview({ file, onLoad }: MediaPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget
    if (!file.duration) {
      file.duration = video.duration
    }
    if (!file.resolution) {
      file.resolution = `${video.videoWidth}x${video.videoHeight}`
    }
    if (!file.display_aspect_ratio) {
      file.display_aspect_ratio = `${video.videoWidth}:${video.videoHeight}`
    }
    setIsLoading(false)
    onLoad?.()
  }

  const src = file.url || file.preview || "/placeholder.svg"

  if (file.mimetype?.startsWith("image/")) {
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={file.name || "Preview"}
        className={`
          object-cover w-full h-full
          transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
        loading="lazy"
    
        onLoad={() => {
          setIsLoading(false)
          onLoad?.()
        }}
        
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={`
        object-cover w-full h-full
        transition-opacity duration-300
        ${isLoading ? "opacity-0" : "opacity-100"}
      `}
      controls
      preload="metadata"
      onLoadedMetadata={handleVideoLoad}
      // Prevent video from reloading when component re-renders
      key={src}
    />
  )
})

