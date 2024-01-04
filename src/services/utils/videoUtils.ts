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

  static getVideoThumbnail(
    videoUrl: string,
    callback: (url: string | null) => void,
  ) {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.setAttribute("crossOrigin", "anonymous");

    video.addEventListener("loadedmetadata", () => {
      const middleTime = video.duration / 2;
      video.currentTime = middleTime;
    });

    video.addEventListener("timeupdate", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context!.drawImage(video, 0, 0, canvas.width, canvas.height);

      const thumbnailUrl = canvas.toDataURL("image/jpeg");
      callback(thumbnailUrl);
    });

    video.addEventListener("error", () => {
      console.error("Failed to load the video");
      callback(null);
    });

    video.load();
  }

  static getVideoThumbnailTwo(
    videoUrl: string,
    callback: (thumbnailUrl: string | null) => void,
  ) {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.setAttribute("crossOrigin", "anonymous");
    video.setAttribute("playsinline", "");

    video.addEventListener("loadedmetadata", () => {
      const middleTime = video.duration / 2;
      video.currentTime = middleTime;
    });

    video.addEventListener("timeupdate", () => {
      const canvas = document.createElement("canvas");
      const aspectRatio = 800 / 500;
      const videoRatio = video.videoWidth / video.videoHeight;

      let drawWidth = video.videoWidth;
      let drawHeight = video.videoHeight;
      let startX = 0;
      let startY = 0;

      if (videoRatio > aspectRatio) {
        drawWidth = video.videoHeight * aspectRatio;
        startX = (video.videoWidth - drawWidth) / 2;
      } else {
        drawHeight = video.videoWidth / aspectRatio;
        startY = (video.videoHeight - drawHeight) / 2;
      }

      canvas.width = 800;
      canvas.height = 500;

      const context = canvas.getContext("2d");
      context!.drawImage(
        video,
        startX,
        startY,
        drawWidth,
        drawHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      const thumbnailUrl = canvas.toDataURL("image/jpeg");
      callback(thumbnailUrl);
    });

    video.addEventListener("error", () => {
      console.error("Failed to load the video");
      callback(null);
    });

    video.load();
  }
}
