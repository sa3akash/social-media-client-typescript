import { useUploadSingleFileMutation } from "@/store/rtk/upload/upload";
import { useState } from "react";

export const useUpload = () => {
  //   const { user } = useSelector((state: RootState) => state.auth);

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploadSingleFile] = useUploadSingleFileMutation();

  const uploadFileChunk = async (file: File) => {
    setUploading(true);
    setError(null);
    setUploadProgress(0);
    const chunkSize = 1024 * 1024 * 5; // 5MB chunks
    const chunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);

      const params = new URLSearchParams({
        name: file.name,
        size: `${file.size}`,
        currentChunkIndex: `${i}`,
        totalChunks: `${chunks}`,
        type: `${file.type}`,
      });

      try {
        const data = await readChunkAsDataURL(chunk);

        const result = await uploadSingleFile({
          data: data,
          params: params.toString(),
        }).unwrap();
        setUploadProgress(Math.round(((i + 1) / chunks) * 100));

        if (result.url) {
          return result;
        }

        // Update progress
      } catch (error) {
        console.error("Upload error:", error);
        setUploading(false);
        setError("Upload failed");
        return;
      }
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const params = new URLSearchParams({
      name: `${file.name + Date.now()}`,
      size: `${file.size}`,
      currentChunkIndex: `${0}`,
      totalChunks: `${1}`,
      type: `${file.type || "audio/wav"}`,
    });
    try {
      const data = await readChunkAsDataURL(file);

      const result = await uploadSingleFile({
        data: data,
        params: params.toString(),
      }).unwrap();

      if (result.url) {
        return result;
      }

      // Update progress
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      setError("Upload failed");
      return;
    }
  };
  return { uploadFile, uploadFileChunk, uploadProgress, uploading, error };
};

const readChunkAsDataURL = (chunk: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(chunk);
  });
};
