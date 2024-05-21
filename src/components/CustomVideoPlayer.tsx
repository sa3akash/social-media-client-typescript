import React, { FC, useRef } from 'react'

interface Props {
    src:string;
    className?:string;
}

const CustomVideoPlayer:FC<Props> = ({src,className}) => {

    const videoRef = useRef<HTMLVideoElement>(null)


  return (
    <div className={className}>
        <video ref={videoRef}></video>
    </div>
  )
}

export default CustomVideoPlayer