
import { ImageUtils } from "@/services/utils/imageUtils";  
import { VideoUtils } from "@/services/utils/videoUtils";  
import { useEffect, useRef, useState } from "react";  
import Heart from "@/assets/heart.png";  

const RealsItem = ({ videoUrl }: { videoUrl: string }) => {  
  const [image, setImage] = useState("");  
  const [bgColor, setBGColor] = useState("");  
  const [isPlaying, setIsPlaying] = useState(false);  
  const [hearts, setHearts] = useState<  
    {  
      id: number;  
      x: number;  
      y: number;  
      rotate: number;  
      duration: number;  
      direction: string;  
    }[]  
  >([]);  

  const videoRef = useRef<HTMLVideoElement>(null);  

  // Fetch thumbnail only when videoUrl changes  
  useEffect(() => {  
    let isMounted = true; // Track if component is mounted  

    const fetchThumbnail = async () => {  
      try {  
        const result = await VideoUtils.getThumbnail(videoUrl, 1);  
        if (isMounted) {  
          setImage(result);  
        }  
      } catch (error) {  
        console.log(error);  
      }  
    };  

    fetchThumbnail();  

    return () => {  
      isMounted = false; // Cleanup on unmount  
    };  
  }, [videoUrl]);  

  // Fetch background color only when image changes  
  useEffect(() => {  
    if (image) {  
      const fetchBackgroundColor = async () => {  
        const color = await ImageUtils.getBackgroundImageColor(image);  
        setBGColor(color as string);  
      };  

      fetchBackgroundColor();  
    }  
  }, [image]);  

  // Play/Pause video based on isPlaying state  
  useEffect(() => {  
    const video = videoRef.current;  
    if (video) {  
      isPlaying ? video.play().catch((error) => console.log("Failed to play video:", error)) : video.pause();  
    }  
  }, [isPlaying]);  

  // Intersection Observer to handle play/pause based on visibility  
  useEffect(() => {  
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {  
      entries.forEach((entry) => {  
        setIsPlaying(entry.isIntersecting);  
      });  
    };  

    const observer = new IntersectionObserver(handleIntersection, {  
      root: null,  
      rootMargin: "0px",  
      threshold: 0.5,  
    });  

    const video = videoRef.current;  
    if (video) {  
      observer.observe(video);  
    }  

    return () => {  
      if (video) {  
        observer.unobserve(video);  
      }  
      observer.disconnect();  
    };  
  }, []);  

  let clickTimeout: NodeJS.Timeout | null = null;  

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {  
    const rect = videoRef.current?.getBoundingClientRect();  
    if (!rect) return;  

    const x = e.clientX - rect.left;  
    const y = e.clientY - rect.top;  

    const newHearts = Array.from({ length: Math.floor(Math.random() * (10 - 1 + 1)) + 1 }).map(() => ({  
      id: Math.random(),  
      x: x + Math.random() * 140 - 80,  
      y: y + Math.random() * 20 - 10,  
      rotate: Math.random() * 45 - 22.5,  
      duration: Math.random() * 0.6 + 1.2,  
      direction: Math.random() > 0.5 ? "left" : "right",  
    }));  

    setHearts((prevHearts) => [...prevHearts, ...newHearts]);  

    setTimeout(() => {  
      setHearts((prevHearts) => prevHearts.filter((heart) => !newHearts.includes(heart)));  
    }, 1800);  
  };  

  const handleSingleClick = () => {  
    if (videoRef.current?.paused) {  
      videoRef.current.play();  
    } else {  
      videoRef.current?.pause();  
    }  
  };  

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {  
    if (clickTimeout) {  
      clearTimeout(clickTimeout);  
      clickTimeout = null;  
      handleDoubleClick(e);  
    } else {  
      clickTimeout = setTimeout(() => {  
        handleSingleClick();  
        clickTimeout = null;  
      }, 250);  
    }  
  };  

  return (  
    <div className="relative w-full h-full scrollTypeItem">  
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40">  
        <div onClick={handleClick} className="relative">  
          <video  
            ref={videoRef}  
            width={464}  
            height={825}  
            src={videoUrl}  
            loop  
            className="flex items-center object-contain justify-center rounded-md w-[464px] h-[825px]"  
            style={{ backgroundColor: bgColor ? bgColor : "#000" }}  
            autoPlay  
            onContextMenu={(e) => e.preventDefault()}  
          ></video>  
          {hearts.map((heart) => (  
            <div  
              key={heart.id}  
              className={`floating-heart ${heart.direction} pointer-events-none`}  
              style={{  
                left: heart.x,  
                top: heart.y,  
                transform: `rotate(${heart.rotate}deg) translate(-50%, -50%)`,  
                animationDuration: `${heart.duration}s`,  
              }}  
            >  
              <img src={Heart} alt="" className="pointer-events-none w-10" />  
            </div>  
          ))}  
        </div>  
      </div>  
      <img  
        src={image}  
        className="w-full h-full object-cover pointer-events-none select-none blur-sm"  
      />  
      <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-40 z-10"></div>  
    </div>  
  );  
};  

export default RealsItem;
