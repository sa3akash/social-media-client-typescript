import PhotosHeader from '@/components/photos/PhotosHeader'
import { photoPost } from '@/data/PostData'
import SinglePhoto from '@/components/photos/SinglePhoto'

const PhotoPage = () => {
  return (
    <div className='w-full h-full flex flex-col gap-4 mt-8'>
        <PhotosHeader />
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-0'>
            {photoPost.map((post,index)=>(
                <SinglePhoto key={index} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default PhotoPage