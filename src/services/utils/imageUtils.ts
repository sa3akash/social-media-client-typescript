export class ImageUtils {
  static validateFile(file: File) {
    const validFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
    ];
    return file && validFileTypes.indexOf(file.type) > -1;
  }

  static checkFileSize(file: File) {
    let fileError = "";
    const isValid = ImageUtils.validateFile(file);
    if (!isValid) {
      fileError = `File ${file.name} not accepted`;
    }
    // 50 MB
    if (file.size > 50000000) {
      fileError = "File is too large.";
    }
    return fileError;
  }

  static checkFile(files: File[]): string {
    for (let i = 0; i < files.length; i++) {
      if (!ImageUtils.validateFile(files[i])) {
        return `File ${files[i].name} not accepted`;
      }
      if (ImageUtils.checkFileSize(files[i])) {
        return ImageUtils.checkFileSize(files[i]);
      }
    }
    return files.length > 5 ? "Maximum 5 files are allowed." : "";
  }

  static async addFileToRedux(files: File[]) {
    console.log(files);
  }

  static readAsBase64(file: File) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.addEventListener("error", (err) => {
        reject(err);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  }

  static getBackgroundImageColor(imageUrl: string) {
    const image: HTMLImageElement = new Image();
    image.crossOrigin = "Anonymous";
    const backgroundImageColor = new Promise((resolve, reject) => {
      image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);

        const imageData = context?.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        const params = imageData?.data;
        const bgColor =
          params && ImageUtils.convertRGBToHex(params[0], params[1], params[2]);
        resolve(bgColor);
      });
      image.addEventListener("error", (err) => {
        if (!err.isTrusted) reject(err);
      });
      image.src = imageUrl;
    });
    return backgroundImageColor;
  }

  static convertRGBToHex(
    red: string | number | [],
    green: string | number | [],
    blue: string | number | [],
  ) {
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    red = red.length === 1 ? "0" + red : red;
    green = green.length === 1 ? "0" + green : green;
    blue = blue.length === 1 ? "0" + blue : blue;
    return `#${red}${green}${blue}`;
  }

  static async imageUrlToBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  static imageBlobToFile(blob: Blob, type: string): File {
    const file = new File([blob], Date.now().toString(), {
      type: type,
    });
    return file;
  }
}
