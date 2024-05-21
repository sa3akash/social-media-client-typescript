import React from 'react'

interface Props {
  text:string;
}

const VideoTextTitle:React.FC<Props> = ({text}) => {
  return (
    <div className='px-6 py-4 font-medium'>{text}</div>
  )
}

export default VideoTextTitle;