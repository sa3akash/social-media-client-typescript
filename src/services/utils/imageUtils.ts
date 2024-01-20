export class ImageUtils {
  static checkFile(files: File[]): string {
    for (let i = 0; i < files.length; i++) {
      if (!this.validateFile(files[i])) {
        return `File ${files[i].name} not accepted`;
      }
      if (this.checkFileSize(files[i])) {
        return this.checkFileSize(files[i]);
      }
    }
    return files.length > 5 ? "Maximum 5 files are allowed." : "";
  }
  private static checkFileSize(file: File) {
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

  private static validateFile(file: File) {
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

  // ======================== Image to color ========================

  static async getBackgroundImageColor(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const image = await this.createImage(blob);

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context!.drawImage(image, 0, 0);

      const imageData = context!.getImageData(
        0,
        0,
        image.width,
        image.height,
      ).data;

      // Calculate the total color values
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;
      let totalPixels = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        totalRed += r;
        totalGreen += g;
        totalBlue += b;
        totalPixels++;
      }

      // Calculate the average color
      const averageRed = Math.round(totalRed / totalPixels);
      const averageGreen = Math.round(totalGreen / totalPixels);
      const averageBlue = Math.round(totalBlue / totalPixels);

      const averageColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
      return averageColor;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
        throw error;
      } else {
        return "";
      }
    }
  }

  private static createImage(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(blob);
    });
  }

  // ===================== test code ===================

  // static getBackgroundImageColorLow(imageUrl: string) {
  //   const image: HTMLImageElement = new Image();
  //   image.crossOrigin = "Anonymous";
  //   const backgroundImageColor = new Promise((resolve, reject) => {
  //     image.addEventListener("load", () => {
  //       const canvas = document.createElement("canvas");
  //       const context = canvas.getContext("2d");
  //       canvas.width = image.width;
  //       canvas.height = image.height;
  //       context?.drawImage(image, 0, 0);

  //       const imageData = context?.getImageData(
  //         0,
  //         0,
  //         canvas.width,
  //         canvas.height,
  //       );
  //       const params = imageData?.data;
  //       const bgColor =
  //         params && this.convertRGBToHex(params[0], params[1], params[2]);
  //       resolve(bgColor);
  //     });
  //     image.addEventListener("error", (err) => {
  //       if (!err.isTrusted) reject(err);
  //     });
  //     image.src = imageUrl;
  //   });
  //   return backgroundImageColor;
  // }

  // private static convertRGBToHex(
  //   red: string | number | [],
  //   green: string | number | [],
  //   blue: string | number | [],
  // ) {
  //   red = red.toString(16);
  //   green = green.toString(16);
  //   blue = blue.toString(16);

  //   red = red.length === 1 ? "0" + red : red;
  //   green = green.length === 1 ? "0" + green : green;
  //   blue = blue.length === 1 ? "0" + blue : blue;
  //   return `#${red}${green}${blue}`;
  // }
}
