import React, { useState } from 'react';  

const CHUNK_SIZE = 5 * 1024 * 1024; // 10MB  

const FileUpload: React.FC = () => {  
  const [file, setFile] = useState<File | null>(null);  
  const [uploadProgress, setUploadProgress] = useState<number>(0);  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    if (event.target.files && event.target.files.length > 0) {  
      setFile(event.target.files[0]);  
      setUploadProgress(0); // Reset progress on new file selection  
    }  
  };  

  const uploadFile = async () => {  
    if (!file) return; // Return if no file selected  

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);  
    
    for (let i = 0; i < totalChunks; i++) {  
      const start = i * CHUNK_SIZE;  
      const end = Math.min(file.size, start + CHUNK_SIZE);  
      const chunk = file.slice(start, end); // Slice the file  

      // Verify if the chunk is defined  
      if (!chunk) {  
        console.error(`Chunk ${i} is undefined. Check file slicing.`);  
        return;  
      }  

      const formData = new FormData();  
      formData.append('file', chunk, file.name); // Use the original file name  
      formData.append('chunkIndex', i.toString());  
      formData.append('totalChunks', totalChunks.toString());  

      try {  
        const response = await fetch('http://localhost:5500/api/v1/upload-single', {  
          method: 'POST',  
          body: formData,  
          credentials:'include'
        });  

        if (!response.ok) throw new Error('Upload failed');  

        const result = await response.json();  
        console.log('Chunk uploaded:', result);  
      } catch (error) {  
        console.error('Error uploading chunk:', error);  
        // Handle error, maybe break or retry  
        return; // Stop further uploads on error  
      }  

      // Update progress  
      const progress = ((i + 1) / totalChunks) * 100;  
      setUploadProgress(progress);  
    }  
  };  

  return (  
    <div>  
      <input type="file" onChange={handleFileChange} />  
      <button onClick={uploadFile}>Upload</button>  
      <div>Upload Progress: {uploadProgress.toFixed(2)}%</div>  
    </div>  
  );  
};  

export default FileUpload;