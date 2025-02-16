export class Utils {
  static getAvaterName(fname: string, lname: string): string {
    const firstLetter = fname?.charAt(0)?.toUpperCase();
    const lastLetter = lname?.charAt(0)?.toUpperCase();
    return firstLetter + lastLetter;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static uniqueArray(data: any[]) {
    return Array.from(new Set(data.map((obj) => obj._id))).map((id) => {
      return data.find((obj) => obj._id === id);
    });
  }

  static checkDateSame(prevDate: string, nextDate: string) {
    const date1 = new Date(prevDate);
    const date2 = new Date(nextDate);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  static extractHashtags(inputString: string) {
    const hashtagRegex = /#\w+/g;
    const matches = inputString.match(hashtagRegex);
    return matches ? Array.from(new Set(matches)) : [];
  }

  static getFileExtension(url: string): string {
    // Extract the file extension from the URL
    const extension = url.split(".").pop();
    return extension ? extension.toLowerCase() : "";
  }

  static getFileType(extension: string): string {
    // Define supported file types
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "ts"];
    const audioExtensions = ["mp3", "wav", "aac", "ogg", "flac"];
    const zipExtensions = ["zip", "rar", "7z"];
    const documentExtensions = [
      "txt",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ];

    // Check the file type based on the extension
    if (videoExtensions.includes(extension)) {
      return "video";
    } else if (audioExtensions.includes(extension)) {
      return "audio";
    } else if (zipExtensions.includes(extension)) {
      return "zip file";
    } else if (documentExtensions.includes(extension)) {
      return "document";
    } else {
      return "unknown";
    }
  }

  static checkFileUrl(url: string): { fileType: string; extension: string } {
    // Get the file extension from the URL
    const extension = Utils.getFileExtension(url);
    const fileType = Utils.getFileType(extension);

    return {
      fileType,
      extension,
    };
  }
}
