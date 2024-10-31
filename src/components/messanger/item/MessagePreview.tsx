import React from 'react'

interface Props {
    text: string
}

const MessagePreview:React.FC<Props> = ({text}) => {
  return (
    <div>
        {text}
    </div>
  )
}

export default MessagePreview