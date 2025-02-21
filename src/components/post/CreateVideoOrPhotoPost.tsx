import { useCallback } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

const CreateVideoOrPhotoPost = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload
    console.log(acceptedFiles);
    // You can also process the files here (e.g. send them to a server)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex-1 my-4 space-y-6">
      <div className="cardBG space-y-2 p-4 rounded-md">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input placeholder="What's your mind?" id="title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Descript</Label>
          <Textarea
            placeholder="Write details here"
            id="title"
            className="focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="grid grid-cols-4">

      <div>1</div>
      <div>2</div>
      <div>3</div>


        <div className="cardBG rounded-md min-h-[180px] p-4 ">
        <div {...getRootProps()} className="border border-dashed h-full rounded-md flex items-center justify-center text-center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        </div>
        
      </div>

      <Button className="w-full">Uplaod</Button>
    </div>
  );
};

export default CreateVideoOrPhotoPost;

{
  /* <ScrollArea className="flex-1">
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
    
    </div>
    </ScrollArea> */
}

{
  /**
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
      
      **/
}
