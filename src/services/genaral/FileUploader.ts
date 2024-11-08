
export interface FileUploadProgress {
    file: File;
    progress: number;
  }
  
export class FileUploader {
    static CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size
  
    private file: File;
    private totalChunks: number;
    private progressList: FileUploadProgress[];
    private uploadUrl: string;
    private updateProgressCallback: (progressList: FileUploadProgress[]) => void;
  
    constructor(file: File, uploadUrl: string, updateProgressCallback: (progressList: FileUploadProgress[]) => void) {
      this.file = file;
      this.uploadUrl = uploadUrl;
      this.totalChunks = Math.ceil(file.size / FileUploader.CHUNK_SIZE);
      this.progressList = []
      this.updateProgressCallback = updateProgressCallback; // Callback to update progress in parent component
    }
  
    // Start the upload process
    public async uploadFile() {

        this.progressList.push({ file: this.file, progress: 0 })

      for (let chunkIndex = 0; chunkIndex < this.totalChunks; chunkIndex++) {
        const start = chunkIndex * FileUploader.CHUNK_SIZE;
        const end = Math.min(start + FileUploader.CHUNK_SIZE, this.file.size);
        const chunk = this.file.slice(start, end);
  
        await this.uploadChunk(chunk, chunkIndex);
      }
  
      // After the upload is complete, set the progress to 100%
      this.updateProgress(100);
    }
  
    // Upload a single chunk using fetch
    private async uploadChunk(chunk: Blob, chunkIndex: number) {
      const params = new URLSearchParams({
        name: this.file.name,
        size: `${this.file.size}`,
        currentChunkIndex: `${chunkIndex}`,
        totalChunks: `${this.totalChunks}`,
      });
  
      try {
        const data = await this.readChunkAsDataURL(chunk);
        const url = `${this.uploadUrl}?${params.toString()}`;
        const headers = { "Content-Type": "application/octet-stream" };
  
        const response = await fetch(url, {
          method: "POST",
          body: data,
          headers,
          credentials: "include",
        });
  
        if (response.ok) {
          const result = await response.json();
  
          if (result) {
            const progress = Math.round(((chunkIndex + 1) / this.totalChunks) * 100);
            this.updateProgress(progress);
          } else {
            throw new Error("Failed to upload chunk");
          }
        } else {
          throw new Error("Failed to upload chunk");
        }
      } catch (err) {
        console.error("Error uploading chunk", err);
      }
    }
  
    // Convert chunk to base64 data URL
    private readChunkAsDataURL(chunk: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(chunk);
      });
    }
  
    // Update progress for the file
    private updateProgress(progress: number) {
      // Update progress in the current list and notify the parent component
      this.progressList = [{ file: this.file, progress }];
      this.updateProgressCallback(this.progressList); // Call the callback function to update the parent state
    }
  }
  












// // utils/FileUploader.ts

// export interface FileUploadProgress {
//   file: File;
//   progress: number;
// }

// export class FileUploader {
//   static CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

//   private file: File;
//   private totalChunks: number;
//   private progressList: FileUploadProgress[];
//   private uploadUrl: string;

//   constructor(file: File, uploadUrl: string) {
//     this.file = file;
//     this.uploadUrl = uploadUrl;
//     this.totalChunks = Math.ceil(file.size / FileUploader.CHUNK_SIZE);
//     this.progressList = [];
//   }

//   // Start the upload process
//   public async uploadFile() {
//     const newProgress: FileUploadProgress = { file: this.file, progress: 0 };
//     this.progressList.push(newProgress);

//     for (let chunkIndex = 0; chunkIndex < this.totalChunks; chunkIndex++) {
//       const start = chunkIndex * FileUploader.CHUNK_SIZE;
//       const end = Math.min(start + FileUploader.CHUNK_SIZE, this.file.size);
//       const chunk = this.file.slice(start, end);

//       await this.uploadChunk(chunk, chunkIndex);
//     }
//   }

//   // Upload a single chunk using fetch
//   private async uploadChunk(chunk: Blob, chunkIndex: number) {
//     const params = new URLSearchParams({
//       name: this.file.name,
//       size: `${this.file.size}`,
//       currentChunkIndex: `${chunkIndex}`,
//       totalChunks: `${this.totalChunks}`,
//     });

//     try {
//       const data = await this.readChunkAsDataURL(chunk);
//       const url = `${this.uploadUrl}?${params.toString()}`;
//       const headers = { "Content-Type": "application/octet-stream" };

//       const response = await fetch(url, {
//         method: "POST",
//         body: data,
//         headers,
//         credentials: "include",
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result) {
//           const progress = Math.round(
//             ((chunkIndex + 1) / this.totalChunks) * 100
//           );
//           this.updateProgress(progress);
//         }

//       } else {
//         throw new Error("Failed to upload chunk");
//       }
//     } catch (err) {
//       console.error("Error uploading chunk", err);
//     }
//   }

//   // Convert chunk to base64 data URL
//   private readChunkAsDataURL(chunk: Blob): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(chunk);
//     });
//   }

//   // Update progress for the file
//   private updateProgress(progress: number) {
//     this.progressList = this.progressList.map((item) =>
//       item.file.name === this.file.name ? { ...item, progress } : item
//     );
//   }

//   // Get progress list
//   public getProgressList(): FileUploadProgress[] {
//     return this.progressList;
//   }
// }
