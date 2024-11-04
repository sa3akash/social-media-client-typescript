import MessangerLinkPreview from '@/components/link/MessangerLinkPreview'
import { extractLinks } from '@/services/genaral/messageUtils'
import React from 'react'

interface Props {
    text: string
}

const MessagePreview:React.FC<Props> = ({text}) => {

    const extractText = extractLinks(text)
  return (
    <div className='max-w-prose'>
        <p dangerouslySetInnerHTML={{ __html: extractText.originalString }} className='px-4 py-2' />
        {extractText.links.length > 0 ? <MessangerLinkPreview url={extractText.links[0]}/> : null}
    </div>
  )
}

export default MessagePreview