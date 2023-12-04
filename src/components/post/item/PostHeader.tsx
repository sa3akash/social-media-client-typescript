import Image from '@/components/common/Image';
import { ICreator } from '@/data/PostData'
import React, { useRef } from 'react'
import MoreDot from '@/assets/images/ic_More_3_dot.svg'
import { cn } from '@/lib/utils';
import useDetectOutsideClick from '@/hooks/useDetactOutsideClick';
import PostHeaderModel from '@/components/post/item/PostHeaderModel';

interface Props {
    user: ICreator;
    createAt: string | Date
}

const PostHeader:React.FC<Props> = ({user,createAt}) => {

    const docRef = useRef(null);
    const [openModel,setOpenModel] = useDetectOutsideClick(docRef,false);

  return (
        <div className='p-4 flex items-center justify-between gap-4 relative overflow-visible'>
            <div className='flex items-center gap-2'>
                <div className='h-11 w-11 rounded-full overflow-hidden'>
                    <Image src={user.profilePicture}/>
                </div>
                <div>
                    <h3 className='capitalize font-semibold text-[14px] tracking-[0.1px]'>{`${user.name.first} ${user.name.last}`}</h3>
                    <span className='text-[12px] roboto text-[#696974]'>20/02/2003</span>
                </div>
            </div>
            <div className={cn('w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none',openModel && 'borderColor')} onClick={()=>setOpenModel(prev=>!prev)} ref={docRef}>
                <img src={MoreDot} alt="dot" />
                {openModel && <PostHeaderModel />}
            </div>
        </div>
  )
}

export default PostHeader