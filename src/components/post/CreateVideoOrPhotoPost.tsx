import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ReactDropzone from "react-dropzone";
import { FileUploadProgress } from "@/services/genaral/FileUploader";
import { useToast } from "../ui/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Upload } from "./uploads";
import { IFiles } from "@/interfaces/post.interface";

const CreateVideoOrPhotoPost = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [uploadProgressList, setUploadProgressList] = useState<
    FileUploadProgress[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<IFiles[]>([]);

  const { toast } = useToast();

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  
  const onDrop = async (acceptedFiles: File[]) => {
    // Separate files into images and videos
    const videoFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("video/")
    );
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    // Check for the number of files
    if (videoFiles.length >= 1) {
      setUploadProgressList([
        {
          file: videoFiles[0],
          progress: 0,
        },

      ]);

      Upload(videoFiles[0],(progress,name,data)=>{
        setUploadProgressList((prev) =>
          prev.map((item) =>
            item.file.name === name ? { ...item, progress } : item
          )
        );

        if(progress === 100 && data){
          setUploadedFiles([data])
        }

      })  
      // toast({
      //   title: "Only one video file can be uploaded.",
      //   description: `You have uploaded a video: ${videoFiles[0].name}`,
      // });
      return;
    }

    if (imageFiles.length > 0) {
      setUploadProgressList([
        ...imageFiles.map((fi) => ({ file: fi, progress: 0 })),
      ]);
    } else {
      toast({
        title: "Please select a valid video or image file.",
      });
    }
  };


//  useEffect(()=>{},[])

  return (
    <ScrollArea className="flex-1">
      <div className="flex-1 flex flex-col md:flex-row gap-2 pt-4">
      <div className="flex-1 h-max">
        <Card className="h-max cardBG">
          <CardHeader>
            <CardTitle className="text-lg">Select a video or photo</CardTitle>
            <CardDescription>
              Upload a video or photo to your post
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
           {uploadProgressList.length === 0 && <ReactDropzone
              disabled={isDisabled}
              onDragEnter={handleHover}
              onDragLeave={handleExitHover}
              onDrop={onDrop}
              multiple={true}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`${
                    isHover
                      ? "border-black bg-gray-100/80"
                      : "border-default-gray"
                  } flex justify-center items-center border rounded-md border-dashed flex-col cursor-pointer w-full py-6 ${
                    isDisabled ? "cursor-not-allowed" : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  <h3 className="text-center mt-5">
                    Click to select video <br />
                    or
                    <br />
                    drag video and drop
                  </h3>
                </div>
              )}
            </ReactDropzone>}

            <div className={cn(
                        // "grid gap-1",
                        // uploadProgressList.length === 1 &&
                        //   "grid-cols-1 [repeat(1, 1fr)] grid-rows-1 h-[320px] md:h-[500px]",
                        // uploadProgressList.length === 2 &&
                        //   "grid-cols-2 [repeat(1, 1fr)] grid-rows-1 h-[320px] md:h-[500px]",
                        // uploadProgressList.length === 3 &&
                        //   "grid-cols-2 [repeat(2, 1fr)] grid-rows-2 h-[320px] md:h-[500px]",
                        // uploadProgressList.length === 4 &&
                        //   "grid-cols-2 [repeat(2, 1fr)] grid-rows-2 h-[320px] md:h-[500px]",
                        // uploadProgressList.length === 5 &&
                        //   "grid-cols-2 [repeat(2, 1fr)] grid-rows-3 h-[320px] md:h-[500px]"
                      )}>

            {
              uploadProgressList.map((fileProgress, index) => (
                <div key={index} className="w-full h-max">
                  {
                    fileProgress.file.type.includes('video') ? (<>
                      <div>
                        {fileProgress.progress}
                      </div>
                    </>):(<>
                    
                    </>)

                  }
                  </div>
              ))
            }

            {
              uploadedFiles.map((file, index) =>(
                <div>
                  <video src={file.url} controls></video>
                </div>
              ))
            }

            </div>

           
          </CardContent>
        </Card>
      </div>
      <div className="flex-1">2</div>
    </div>
    </ScrollArea>
  );
};

export default CreateVideoOrPhotoPost;
