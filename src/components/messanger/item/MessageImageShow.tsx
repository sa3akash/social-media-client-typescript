import React from "react";
import DownlaodIcon from "@/assets/images/ic_Download.svg";
import { saveAs } from "file-saver";
import { IMessageFile } from "@/interfaces/chat.interface";
import { general } from "@/services/genaral/general";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import AudioMessage from "./AudioMessage";
import { File } from "lucide-react";

interface Props {
  files: IMessageFile[];
  won: boolean;
}

const MessageImageShow: React.FC<Props> = ({ files, won }) => {
  if (!files.length) return;

  const fileData = general.categoriesFile(files);

  return (
    <div className={cn("flex-1 flex rounded-md", won ? "justify-end" : "justify-start")}>
      {fileData.audio.length > 0 && (
        <div className="flex-1 flex flex-col gap-1">
          {fileData.audio.map((a, i) => (
            <AudioMessage url={a.url} wonMessage={won} key={i}/>
          ))}
        </div>
      )}

      {fileData.videos.length > 0 && (
         <div
         className={cn('',
          fileData.videos.length > 1 ? "grid md:grid-cols-2 gap-1":"",
          fileData.videos.length > 2 ? "grid md:grid-cols-2 xl:grid-cols-3 gap-1":""
         )}
         >
         {fileData.videos.map((p, i) => (
           <div key={i}>
            <video src={p.url} controls ></video>
           </div>
         ))}
       </div>
      )}

      {fileData.images.length > 0 && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper flex-1"
        >
          {fileData.images.map((p, i) => (
            <SwiperSlide key={i} className="">
              <div key={i} className={cn('relative group w-full',
                fileData.images.length > 2 ? 'w-[300px]':''
              )}>
                <img src={p.url} />
                <img src={DownlaodIcon} alt="d" className="z-50 absolute right-4 bottom-4 hidden group-hover:block cursor-pointer" onClick={()=>saveAs(p.url,p.name)}/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {fileData.others.length > 0 && (
        <div>
          {fileData.others.map((o, i) => (
            <div key={i} className={cn('py-2 px-4 rounded-md flex items-center gap-2 hover:underline cursor-pointer',
              won ? "bg-[#0084ff]" : "bg-[#292932]"
            )}
            onClick={()=>saveAs(o.url,o.name)}
            >
              <div>
                <File className="w-5 h-5"/>
              </div>
              <div className="flex items-center gap-2">
              <span>{o.name}</span> |
              <span className="text-sm">{general.formatBytes(+o.size!)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {item.files.map((f, i) => (
                <div className="relative group rounded-md">
                {
                 file.type.includes('image') && (
                   <>
                   <Image
                   src={file.url}
                   className="h-[195px] "
                   classNameTwo="object-cover"
                   />
                   <div
                   className="cursor-pointer select-none absolute bottom-3 right-4 hidden group-hover:block z-10"
                   onClick={() => saveAs(file.url, `${Date.now()}-${file.name}`)}
                 >
                   <img src={DownlaodIcon} alt="d" />
                 </div>
                 <div className="bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-10 hidden group-hover:block" />
                   </>
                 )
                }
           
                {
                 file.type.includes('video') && (
                   <video controls className="h-[195px]">
                     <source src={file.url} type="video/mp4" />
                   </video>
                 )
                }
           
                 
               </div>
              ))} */}
    </div>
  );
};

export default MessageImageShow;

{
  /* <div className={cn('',
          fileData.images.length > 1 ? "grid md:grid-cols-2 gap-2":"",
          fileData.images.length > 2 ? "grid md:grid-cols-2 xl:grid-cols-3":""

        )}>
          {fileData.images.map((p,i)=>(
            <div key={i}>
              <Image src={p.url}  />
            </div>
          ))}
        </div> */
}


