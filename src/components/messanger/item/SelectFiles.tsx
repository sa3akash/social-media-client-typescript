import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useUpload } from "@/hooks/upload/useUpload";
import { useSendMessageMutation } from "@/store/rtk/message/message";
import { Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}
interface Props {
  setOpenSelectedModel: React.Dispatch<React.SetStateAction<boolean>>;
  conversationId?: string;
  receiverId?: string;
  scrollToBottom: () => void
}

interface UplodFile {
  mimetype: string;
  name: string;
  size: number;
  url: string;
}

const SelectFiles: React.FC<Props> = ({
  setOpenSelectedModel,
  conversationId,
  receiverId,
  scrollToBottom
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedList, setUploadedList] = useState<UplodFile[]>([]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: {
    //   "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    //   "video/*": [".mp4", ".webm", ".ogg"],
    // },
    maxSize: 1024 * 1024 * 500, // 50MB
  });

  const removeFile = (file: FileWithPreview) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    URL.revokeObjectURL(file.preview);
    setFiles(newFiles);
  };

  const sendFileMessage = async () => {
    await sendMessage({
      conversationId: conversationId!,
      receiverId: receiverId!,
      files: uploadedList,
      gifUrl: "",
      body: "",
    });
    scrollToBottom();
    setOpenSelectedModel(false);
  };

  return (
    <Dialog open={true} onOpenChange={() => setOpenSelectedModel(false)}>
      <DialogContent className="overflow-y-scroll max-h-[80vh] cardBG">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25"
          }
          ${files.length > 0 ? "h-42" : "h-45"}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Drop the files here ...</p>
          ) : (
            <div>
              <p className="text-lg mb-2">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-sm text-muted-foreground">
                Support for images and videos up to 500MB
              </p>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="space-y-6">
            {files.map((file) => (
              <SingleFile
                key={file.name}
                file={file}
                removeFile={removeFile}
                setUploadedList={setUploadedList}
              />
            ))}
          </div>
        )}
        <Button onClick={sendFileMessage} disabled={isLoading}>
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectFiles;

const SingleFile = ({
  file,
  removeFile,
  setUploadedList,
}: {
  file: FileWithPreview;
  removeFile: (file: FileWithPreview) => void;
  setUploadedList: React.Dispatch<React.SetStateAction<UplodFile[]>>;
}) => {
  const { uploadFileChunk, uploadProgress, uploading } = useUpload();

  return (
    <div className="relative">
      <div className="flex items-start gap-4 p-4 border rounded-lg bg-background/50">
        <div className="relative w-32 h-32 overflow-hidden rounded-md">
          {file.type.startsWith("image/") ? (
            <img
              src={file.preview || "/placeholder.svg"}
              alt={file.name}
              className="object-cover w-full h-full"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          ) : (
            <video
              src={file.preview}
              className="object-cover w-full h-full"
              controls
            />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => removeFile(file)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            {!uploading && uploadProgress < 100 && (
              <Button
                onClick={() => {
                  uploadFileChunk(file).then((data) => {
                    setUploadedList((prev) => [...prev, data]);
                  });
                }}
                className="w-full"
              >
                Upload File
              </Button>
            )}
            {uploadProgress === 100 && (
              <p className="text-sm text-green-600">Upload complete!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
