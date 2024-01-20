export class VideoUtils {
  static getBackgroundVideoColor(videoUrl: string) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context!.drawImage(video, 0, 0);
        const imageData = context!.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        const pixels = imageData.data;
        const red = pixels[0];
        const green = pixels[1];
        const blue = pixels[2];
        const bgColor = VideoUtils.convertRGBToHex(red, green, blue);
        resolve(bgColor);
      });
      video.addEventListener("error", (err) => {
        reject(err);
      });
      video.src = videoUrl;
      video.load();
    });
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

  static async getThumbnail(
    url: string,
    timeInSeconds: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous"; // Set the crossOrigin attribute
      video.src = url;
      video.muted = true; // Mute the video to prevent audio playback
      video.currentTime = timeInSeconds; // Seek to the specified time
      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")!
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        resolve(imageUrl);
      };
      video.onerror = (error) => {
        reject(error);
      };
      video.load();
    });
  }

  static checkVideoHorizontalOrVertical(url: string) {
    const video = document.createElement("video");
    video.src = url;
    video.addEventListener("loadedmetadata", () => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      if (width > height) {
        console.log("Horizontal video");
      } else {
        console.log("Vertical video");
      }
    });
  }
}
