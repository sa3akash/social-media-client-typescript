import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import React, {  useRef, useState } from "react";

interface MediaFile {
  file: File;
  preview: string;
  progress: number;
  isVideo: boolean;
  status: "pending" | "uploading" | "completed";
  url: string | null;
}

const VideoAndPhoto = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false)
  const [content, setContent] = useState("")


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newMediaFiles: MediaFile[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        isVideo: file.type.startsWith("video/"),
        status: "pending",
        url: null,
      }));
      setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }
  

  
  const mockUpload = async (file: MediaFile, index: number) => {
    setMediaFiles((prev) => prev.map((f, i) => (i === index ? { ...f, status: "uploading" } : f)))

    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
      setMediaFiles((prev) => prev.map((f, i) => (i === index ? { ...f, progress } : f)))
    }

    const mockUrl = `https://example.com/uploads/${file.file.name}`
    setMediaFiles((prev) => prev.map((f, i) => (i === index ? { ...f, status: "completed", url: mockUrl } : f)))
  }

  const handleSubmit = async () => {
    setIsUploading(true)

    for (let i = 0; i < mediaFiles.length; i++) {
      if (mediaFiles[i].status === "pending") {
        await mockUpload(mediaFiles[i], i)
      }
    }

    setIsUploading(false)
    console.log("Submitting post:", {
      content,
      mediaUrls: mediaFiles.map((f) => f.url).filter(Boolean),
    })

    // Reset form
    setContent("")
    // setMediaFiles([])
  }

  return (
    <div className=" grid grid-cols-2 gap-4">
       {mediaFiles.map((media, index) => (
        <div
          className="relative aspect-square rounded-lg overflow-hidden shadow-md"
          key={index}
        >
          {media.isVideo ? (
            <video src={media.preview} className="w-full h-full object-cover" />
          ) : (
            <img
              src={media.preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {media.status === "uploading" && (
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-2">{media.progress}%</div>
                <Progress value={media.progress} className="h-2 w-32" />
              </div>
            )}
            {media.status === "completed" && (
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-2">Uploaded</div>
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => removeMedia(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))} 



      <Button onClick={() => fileInputRef.current?.click()}>select</Button>
      <Button onClick={handleSubmit}>upload</Button>

      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        multiple
        hidden
      />
    </div>
  );
};

export default VideoAndPhoto;


{/*
    <div className="space-y-4">
        {mediaFiles.map((media, index) => (
          <div key={index} className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="w-20 h-20 flex-shrink-0">
              {media.isVideo ? (
                <video src={media.preview} className="w-full h-full object-cover rounded-md" />
              ) : (
                <img
                  src={media.preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium truncate">{media.file.name}</span>
                {media.status !== "completed" && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedia(index)}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {media.status === "uploading" && <Progress value={media.progress} className="h-2 mb-1" />}
              <div className="text-sm">
                {media.status === "pending" && "Pending upload"}
                {media.status === "uploading" && `Uploading: ${media.progress}%`}
                {media.status === "completed" && (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Uploaded
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    
    **/}