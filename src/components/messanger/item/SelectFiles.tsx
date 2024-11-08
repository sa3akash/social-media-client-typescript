import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { IMessageFile } from "@/interfaces/chat.interface";
import { useSendMessageMutation } from "@/store/rtk/message/message";
import { useUploadSingleFileMutation } from "@/store/rtk/upload/upload";
import React, { useState } from "react";
import ReactDropzone from "react-dropzone";

interface FileUploadProgress {
  file: File;
  progress: number;
}

interface Props {
  setOpenSelectedModel: React.Dispatch<React.SetStateAction<boolean>>;
  conversationId?: string;
  receiverId?: string;
}

export const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const SelectFiles: React.FC<Props> = ({ setOpenSelectedModel,conversationId,receiverId }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [uploadProgressList, setUploadProgressList] = useState<
    FileUploadProgress[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());

  const [properData,setProperData] = useState<IMessageFile[]|null>(null)

  const [uploadSingleFile] = useUploadSingleFileMutation();

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  const { toast } = useToast();

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setIsDisabled(true);
      const newFiles = acceptedFiles.filter(
        (file) => !uploadedFiles.has(file.name)
      );

      setUploadProgressList((prev) => [
        ...prev,
        ...newFiles.map((fi) => ({ file: fi, progress: 0 })),
      ]);

      // Sequential upload of all files
      for (const file of newFiles) {
        await uploadFile(file);
      }

      setUploadedFiles(
        new Set([...uploadedFiles, ...newFiles.map((file) => file.name)])
      ); // Track uploaded files

      handleExitHover();
      setIsDisabled(false);
    } catch (err) {
      setIsDisabled(false);
      console.log(err);
      toast({
        title: `${(err as { data: { message: string } }).data.message}`,
        variant: "destructive",
      });
    }
  };

  // Upload file with sequential chunks
  const uploadFile = async (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    // Sequentially upload chunks of the file
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      // Wait for each chunk to be uploaded before proceeding to the next
      await uploadChunk(chunk, file, chunkIndex, totalChunks);
    }
  };

  // Upload a single chunk
  const uploadChunk = async (
    chunk: Blob,
    file: File,
    chunkIndex: number,
    totalChunks: number
  ) => {
    const params = new URLSearchParams({
      name: file.name,
      size: `${file.size}`,
      currentChunkIndex: `${chunkIndex}`,
      totalChunks: `${totalChunks}`,
      type: `${file.type}`
    });

    const data = await readChunkAsDataURL(chunk);

    try {
      const result = await uploadSingleFile({
        data: data,
        params: params.toString(),
      }).unwrap();

      if (result) {
        const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        // Update the specific file's progress
        setUploadProgressList((prev) =>
          prev.map((item) =>
            item.file.name === file.name ? { ...item, progress } : item
          )
        );

        if(result.type){
          setProperData(prev=>(prev ? [...prev, result] : [result]))
        }

      }
    } catch (err) {
      console.error("Error uploading chunk", err);
      toast({
        title: "Error uploading chunk",
        variant: "destructive",
      });
    }
  };

  // Convert chunk to base64 data URL
  const readChunkAsDataURL = (chunk: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(chunk);
    });
  };

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  
  const sendFileMessage = ()=> {
    sendMessage({
      conversationId: conversationId!,
      receiverId: receiverId!,
      files: properData,
      gifUrl: '',
      body: ''
    })

    setOpenSelectedModel(false);
  }

  return (
    <Dialog open={true} onOpenChange={() => setOpenSelectedModel(false)}>
      <DialogContent className="">
        <ReactDropzone
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
                isHover ? "border-black bg-gray-100/80" : "border-default-gray"
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
        </ReactDropzone>

        <div>
          {uploadProgressList.map((upload, index) => (
            <div key={index} className="text-sm font-normal">
              {index + 1}. {upload.file.name.slice(0, 25)}{" "}
              <strong>
                : {upload.progress}%{" "}
                {upload.progress === 100 ? "Completed" : "progressing"}
              </strong>
            </div>
          ))}
        </div>
        <Button disabled={isDisabled || isLoading} onClick={sendFileMessage}>Send</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectFiles;
