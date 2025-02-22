"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2, X, UploadCloud, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MediaPreview } from "./media-preview";
import { useToast } from "@/components/ui/use-toast";
import { useUpload } from "@/hooks/upload/useUpload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  SinglePostDoc,
  updateFilesItem,
  updatePostItem,
  updateRemoveItem,
} from "@/store/reducers/SinglePostReducer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { IFiles } from "@/interfaces/post.interface";
import { ModelType } from "@/store/reducers/ModelReducer";

interface UploadFormProps {
  post?: SinglePostDoc;
  setOpenSelectFile: (value: React.SetStateAction<boolean>) => void;
  type: ModelType | null;
}

const VideoAndPhoto = ({ post, setOpenSelectFile, type }: UploadFormProps) => {
  const [files, setFiles] = useState<IFiles[]>([]);

  const filesRef = useRef(files);
  filesRef.current = files;

  const dispatch: AppDispatch = useDispatch();

  const { toast } = useToast();

  const { post: postTile, description } = useSelector(
    (store: RootState) => store.SinglePost
  );

  useEffect(() => {
    if (post?.files && type === "editPost") {
      setFiles(
        post.files.map((file) => ({
          ...file,
          preview: file.url,
        }))
      );
    }
  }, [post, setOpenSelectFile, type]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Calculate how many additional files can be added
      const totalFilesAllowed = 5;
      const currentFilesCount = files.length;

      const availableSlots = totalFilesAllowed - currentFilesCount;

      if (availableSlots <= 0) {
        toast({
          title: "You can't upload more than 5 files",
          variant: "destructive",
        });
        return;
      }

      // Limit acceptedFiles to the available slots
      const filesToAdd = acceptedFiles.slice(0, availableSlots);

      const newFiles: IFiles[] = filesToAdd.map((file) => ({
        mimetype: file.type,
        size: file.size,
        name: file.name,
        file: file,
        preview: URL.createObjectURL(file),
        url: "",
      }));

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    maxSize: 1024 * 1024 * 500,
    multiple: true,
  });

  const removeFile = (file: IFiles) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    URL.revokeObjectURL(file.preview!);
    setFiles(newFiles);
    dispatch(updateRemoveItem({ name: file.name! }));
  };

  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.preview && !file.url) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <div className="px-3 space-y-2 mt-4">
      <Input
        className="cardBG"
        placeholder="Write a caption"
        value={postTile}
        onChange={(e) => {
          dispatch(updatePostItem({ post: e.target.value }));
        }}
      />
      <Textarea
        placeholder="Write a description..."
        className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border cardBG"
        rows={2}
        value={description}
        onChange={(e) => {
          dispatch(updatePostItem({ description: e.target.value }));
        }}
      />
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25"
            }`}
        >
          <input {...getInputProps()} />
          <ImagePlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Drop your media here ...</p>
          ) : (
            <div>
              <p className="text-lg mb-2">Drag & drop your media here</p>
              <p className="text-sm text-muted-foreground">
                Share multiple photos and videos (up to 500MB each)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preview Section */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {files.map((file, index) => (
                <SingleMediaPreview
                  key={index}
                  file={file}
                  removeFile={removeFile}
                />
              ))}
            </div>
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <Button type="button" variant="outline" className="w-full">
                <ImagePlus className="w-4 h-4 mr-2" />
                Add more media
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAndPhoto;

interface SingleMediaPreviewProps {
  file: IFiles;
  removeFile: (file: IFiles) => void;
}

const SingleMediaPreview = ({ file, removeFile }: SingleMediaPreviewProps) => {
  const { uploadFileChunk, uploadProgress, uploading } = useUpload();
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="aspect-square relative rounded-lg overflow-hidden bg-muted group">
      <MediaPreview file={file} />
      {uploading && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="text-center space-y-3 p-4">
            <div className="relative">
              <Progress
                value={uploadProgress}
                className="h-2 w-48 transition-all duration-300 ease-in-out"
              />
              <p className="text-sm font-medium mt-2 text-white">
                {uploadProgress.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* File Info */}
      {!uploading && file.mimetype?.startsWith("video/") && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-2 rounded group-hover:hidden transition-all">
          <p>Duration: {(file.duration! / 60)?.toFixed(2)} Minites</p>
          <p>Resolution: {file.resolution}</p>
          <p>Size: {(file.size! / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background/90"
        onClick={() => removeFile(file)}
      >
        <X className="w-4 h-4" />
      </Button>
      {file.file && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-14 rounded-full bg-background/80 hover:bg-background/90"
          onClick={() => {
            uploadFileChunk(file.file!).then((response) => {
              dispatch(updateFilesItem(response));
            });
          }}
          disabled={uploading}
        >
          {uploading ? (
            uploadProgress === 100 ? (
              <Check />
            ) : (
              <Loader2 className="animate-spin" />
            )
          ) : (
            <UploadCloud className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};
