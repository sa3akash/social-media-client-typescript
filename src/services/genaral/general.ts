import { IMessageFile } from "@/interfaces/chat.interface";

class General {
  public categoriesFile(files: IMessageFile[]) {
    const categorizedFiles = {
      videos: files.filter((file) => file.type.includes("video")),
      audio: files.filter((file) => file.type.includes("audio")),
      images: files.filter((file) => file.type.includes("image")),
      others: files.filter((file) => {
        // Check if the file type does not match any of the specified types
        return !(
          file.type.includes("video") ||
          file.type.includes("audio") ||
          file.type.includes("image")
        );
      }),
    };

    return categorizedFiles;
  }

  public getMimeType(name: string): string {
    const mimeTypes: { [key: string]: string } = {
      // Image formats
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      bmp: "image/bmp",
      tif: "image/tiff",
      tiff: "image/tiff",
      webp: "image/webp",
      svg: "image/svg+xml",

      // Video formats
      mp4: "video/mp4",
      mkv: "video/x-matroska",
      flv: "video/x-flv",
      webm: "video/webm",
      avi: "video/x-msvideo",
      mov: "video/quicktime",
      wmv: "video/x-ms-wmv",

      // Audio formats
      mp3: "audio/mpeg",
      wav: "audio/wav",
      aac: "audio/aac",
      flac: "audio/flac",
      ogg: "audio/ogg",
      opus: "audio/opus",
      m4a: "audio/mp4",

      // Document formats
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      txt: "text/plain",
      csv: "text/csv",
      rtf: "application/rtf",

      // Archive formats
      zip: "application/zip",
      rar: "application/x-rar-compressed",
      tar: "application/x-tar",
      gz: "application/gzip",
      "7z": "application/x-7z-compressed",

      // Code formats
      js: "application/javascript",
      css: "text/css",
      html: "text/html",
      json: "application/json",
      xml: "application/xml",

      // Executable formats
      exe: "application/octet-stream",
      msi: "application/x-msdownload",

      // Miscellaneous
      bin: "application/octet-stream",
      iso: "application/octet-stream",
      dmg: "application/octet-stream",
    };

    const extension = name.split(".").pop() || "";

    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  public formatBytes(bytes:number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}



}

export const general: General = new General();
