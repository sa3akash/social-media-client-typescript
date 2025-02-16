import { IFiles } from "@/interfaces/post.interface";




export const Upload = async (file:File,fn:(progress:number,name:string,data?:IFiles)=>void) => {

    const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB chunk size
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);


    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
  
        const params = new URLSearchParams({
            name: file.name,
            size: `${file.size}`,
            currentChunkIndex: `${chunkIndex}`,
            totalChunks: `${totalChunks}`,
            type: `${file.type}`
          });

          try {
            const uploadUrl = `http://localhost:5500/api/v1/upload?${params.toString()}`

            const data = await readChunkAsDataURL(chunk);
            const headers = { "Content-Type": "application/octet-stream" };
      
            const response = await fetch(uploadUrl, {
              method: "POST",
              body: data,
              headers,
              credentials: "include",
            });
      
            if (response.ok) {
              const result = await response.json();
      
              if (result) {
                const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
               
                if(result.url){
                    fn(progress,file.name,result);
                  }else{
                    fn(progress,file.name);
                  }
              } else {
                throw new Error("Failed to upload chunk");
              }
            }
          } catch (err) {
            console.error("Error uploading chunk", err);
          }


      }
}

const readChunkAsDataURL = (chunk: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(chunk);
      });
}