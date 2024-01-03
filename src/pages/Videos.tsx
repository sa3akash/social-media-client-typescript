import { useEffect, useRef } from "react";

const Videos = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.autoplay = true;
      videoRef.current.load();
    }
  }, []);

  return (
    <div>
      <video
        width="200"
        height="200"
        controls
        autoPlay
        controlsList="nodownload"
        onContextMenu={() => false}
        loop
        ref={videoRef}
      >
        <source
          src="https://res.cloudinary.com/dkj7w978g/video/upload/v1704278561/zx1oh09d2ujirn8npnvl.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Videos;
