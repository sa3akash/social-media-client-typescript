import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import {
  BsFullscreen,
  BsFullscreenExit,
  CgMiniPlayer,
  CiVolume,
  CiVolumeHigh,
  CiVolumeMute,
  FaPause,
  FaPlay,
  TbRewindBackward10,
  TbRewindForward10,
} from "./icons/Icons";
import "./videoPlayer.css";
import { RangeSlider } from "./Slider";

type VideoPlayerProps = {
  src: string;
  loop?: boolean;
  poster?: string;
  captions?: string;
  width?: string;
  height?: string;
  qualityOptions?: number[];
  className?: string;
};

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const prefixZero = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

const formatTime = (time: number) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600);

  if (hours === 0) return `${minutes}:${prefixZero.format(seconds)}`;
  else
    return `${hours}:${prefixZero.format(minutes)}:${prefixZero.format(
      seconds
    )}`;
};

// const deformatTime = (time: string) => {
//   const timeArr = time.split(":").map((i) => Number(i) || 0);

//   if (timeArr.length === 2) return timeArr[0] * 60 + timeArr[1];
//   else return timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
// };

const VideoPlayerCustom = ({
  width = "40rem",
  height = "20.5rem",
  src,
  poster,
  captions,
  qualityOptions = [480, 720, 1080, 1440],
  loop = false,
  className,
}: VideoPlayerProps) => {
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const speedPanelRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const isDragging = useRef(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const [speed, setSpeed] = useState(1);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [isCaptions, setIsCaptions] = useState(false);

  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("0:0");
  const [buffered, setBuffered] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  const toggleSettings = useCallback(
    () => setIsSettingsOpen((prev) => !prev),
    []
  );
  const toggleSpeed = useCallback(() => setIsSpeedOpen((prev) => !prev), []);
  const toggleCaptions = useCallback(() => setIsCaptions((prev) => !prev), []);
  const toggleTheater = useCallback(() => setIsTheater((prev) => !prev), []);

  const handlePlayPause = useCallback(
    () =>
      setIsPaused((prev) => {
        if (prev) {
          videoPlayerRef.current?.play();
        } else {
          videoPlayerRef.current?.pause();
        }
        return !prev;
      }),
    []
  );

  const handleFullScreenChange = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }

    setIsFullScreen((prev) => !prev);
  }, [isFullScreen]);

  const handleMiniPlayerChange = () =>
    videoPlayerRef.current?.requestPictureInPicture();

  const handleSpeedChange = (speed: number) => {
    setSpeed(speed);
    toggleSpeed();
  };

  
  const handleQualityChange = () => {
    toggleSettings();
  };


  const handleRewindBackward10 = useCallback(() => {
    const player = videoPlayerRef.current;
    if (!player) return;
    player.currentTime -= 10;
  }, []);



  const handleRewindForward10 = useCallback(() => {
    const player = videoPlayerRef.current;
    if (!player) return;
    player.currentTime += 10;
  }, []);



  const handleMuteUnmute = useCallback(() => {
    setIsMuted((prev) => {
      if (prev) setVolume(previousVolume);
      else {
        setPreviousVolume(volume);
        setVolume(0);
      }

      return !prev;
    });
  }, [previousVolume, volume]);


  const handleMouseDown = () => {
    isDragging.current = true;
  };



  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const percent =
      (Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width) *
      100;
    setTimelineProgress(percent);
  };

  const handleMouseUp = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const videoPlayer = videoPlayerRef.current;

    if (!videoPlayer) return;

    isDragging.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * videoPlayer.duration;
    videoPlayer.currentTime = time;
  };


  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    if (
      settingsPanelRef.current &&
      !settingsPanelRef.current.contains(event.target as Node)
    ) {
      setIsSettingsOpen(false);
    }

    if (
      speedPanelRef.current &&
      !speedPanelRef.current.contains(event.target as Node)
    ) {
      setIsSpeedOpen(false);
    }
  }, []);


  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Escape") {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
      if (e.key === "f") {
        handleFullScreenChange();
      }

      if (e.key === "m") {
        handleMuteUnmute();
      }
      if (e.key === " ") {
        handlePlayPause();
      }

      if (e.key === "s") {
        toggleSettings();
      }

      if (e.key === "c") {
        toggleCaptions();
      }

      if (e.key === "t") {
        toggleTheater();
      }

      if (e.key === "ArrowRight") {
        handleRewindForward10();
      }

      if (e.key === "ArrowLeft") {
        handleRewindBackward10();
      }
    },
    [
      handleFullScreenChange,
      handleMuteUnmute,
      handlePlayPause,
      handleRewindBackward10,
      handleRewindForward10,
      toggleCaptions,
      toggleSettings,
      toggleTheater,
    ]
  );


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);


  const loadedDataHandler = useCallback(() => {
    const player = videoPlayerRef.current;
    if (player) {
      setDuration(formatTime(videoPlayerRef.current.duration));
    }
  }, []);


  const timeupdateHandler = useCallback(() => {
    const player = videoPlayerRef.current;
    if (player) {
      setCurrentTime(formatTime(player.currentTime));

      if (isDragging.current === false)
        setTimelineProgress((player.currentTime / player.duration) * 100);

      let bufferedPercentage = 0;
      if (player.buffered.length > 0) {
        bufferedPercentage =
          (player.buffered.end(player.buffered.length - 1) / player.duration) *
          100;
      }

      setBuffered(bufferedPercentage);
    }
  }, [setCurrentTime, setTimelineProgress, setBuffered]);


  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;

    if (videoPlayer) {
      videoPlayer.addEventListener("loadeddata", loadedDataHandler);
      videoPlayer.addEventListener("timeupdate", timeupdateHandler);
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.removeEventListener("loadeddata", loadedDataHandler);
        videoPlayer.removeEventListener("timeupdate", timeupdateHandler);
      }
    };
  }, [loadedDataHandler, timeupdateHandler]);


  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);


  useEffect(() => {
    if (videoPlayerRef.current) videoPlayerRef.current.playbackRate = speed;
  }, [speed]);


  useEffect(() => {
    if (videoPlayerRef.current) videoPlayerRef.current.volume = volume / 100;
  }, [volume]);


  useEffect(() => {
    if (videoPlayerRef.current) {
      if (isCaptions) {
        videoPlayerRef.current.textTracks[0].mode = "showing";
      } else {
        videoPlayerRef.current.textTracks[0].mode = "hidden";
      }
    }

    return () => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.textTracks[0].mode = "hidden";
      }
    };
  }, [isCaptions]);


  useEffect(() => {
    return () => {
      setIsPaused(true);
      setIsSettingsOpen(false);
      setIsSpeedOpen(false);
      setTimelineProgress(0);
      setBuffered(0);
      setIsLoading(false);
      setSpeed(1);
    };
  }, [src, poster]);

  // observer for if user see this video element then play
  useEffect(() => {
    const video = videoPlayerRef.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };
    // Callback fired when the video enters or leaves the viewport
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video!.src = src;
          video!.play().catch((error) => {
            console.log("Failed to play video:", error);
          });
        } else {
          video!.pause(); // Pause when video leaves viewport
        }
        if (video?.paused) {
          setIsPaused(true);
        } else {
          setIsPaused(false);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    // Observe the video element
    if (video) {
      observer.observe(video as HTMLVideoElement);
    }
    // Cleanup the Intersection Observer when component unmounts
    return () => {
      observer.unobserve(video as HTMLVideoElement);
      observer.disconnect();
    };
  }, [src]);

  const SettingPanel = isSettingsOpen && (
    <div ref={settingsPanelRef} className="_6pp-video-player-setting-panel">
      <ul>
        {qualityOptions.map((i, idx) => (
          <li
            key={i}
            style={{
              borderTopLeftRadius: idx === 0 ? "0.5rem" : 0,
              borderTopRightRadius: idx === 0 ? "0.5rem" : 0,
              borderBottomLeftRadius:
                idx === qualityOptions.length - 1 ? "0.5rem" : 0,
              borderBottomRightRadius:
                idx === qualityOptions.length - 1 ? "0.5rem" : 0,
            }}
            onClick={() => handleQualityChange()}
          >
            {i}p
          </li>
        ))}
      </ul>
    </div>
  );

  const SpeedPanel = isSpeedOpen && (
    <div ref={speedPanelRef} className="_6pp-video-player-speed-panel">
      <ul>
        {speedOptions.map((i, idx) => (
          <li
            key={i}
            style={{
              borderTopLeftRadius: idx === 0 ? "0.5rem" : 0,
              borderTopRightRadius: idx === 0 ? "0.5rem" : 0,
              borderBottomLeftRadius:
                idx === speedOptions.length - 1 ? "0.5rem" : 0,
              borderBottomRightRadius:
                idx === speedOptions.length - 1 ? "0.5rem" : 0,
            }}
            onClick={() => handleSpeedChange(i)}
          >
            {i}x
          </li>
        ))}
      </ul>
    </div>
  );

  const TimeLine = (
    <div
      className="_6pp-video-player-timeline-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div
        className="_6pp-video-player-timeline-thumb"
        style={{
          left: `${timelineProgress}%`,
        }}
      />
      <div
        className="_6pp-video-player-timeline-progress"
        style={{
          width: `${timelineProgress}%`,
        }}
      />
      <div
        className="_6pp-video-player-timeline-buffer-progress"
        style={{
          width: `${buffered}%`,
        }}
      />
    </div>
  );

  const ControlsPanel = (
    <div className="_6pp-video-player-controls">
      <button
        title="Rewind Backward 10 Seconds"
        onClick={handleRewindBackward10}
      >
        {TbRewindBackward10}
      </button>
      <button
        disabled={isLoading}
        onClick={handlePlayPause}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? FaPlay : FaPause}
      </button>

      <button title="Fast Forward 10 Seconds" onClick={handleRewindForward10}>
        {TbRewindForward10}
      </button>

      <button title="Volume" onClick={handleMuteUnmute}>
        {isMuted ? CiVolumeMute : volume > 50 ? CiVolumeHigh : CiVolume}
      </button>

      <div className="_6pp-video-player-volume-slider">
        <RangeSlider
          value={volume}
          changeHandler={(e) => setVolume(Number(e.target.value))}
        />
      </div>

      <div className="_6pp-video-player-duration">
        <span>{currentTime}</span> <span>/</span> <span>{duration}</span>
      </div>

      <button
        title="Plackback Speed"
        style={{ fontSize: "1.25rem", marginLeft: "auto" }}
        onClick={toggleSpeed}
      >
        {speed}x
      </button>

      <button onClick={handleMiniPlayerChange} title="Mini Player">
        {CgMiniPlayer}
      </button>

      <button
        onClick={handleFullScreenChange}
        title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
      >
        {isFullScreen ? BsFullscreenExit : BsFullscreen}
      </button>
    </div>
  );

  const Loader = (
    <div className="_6pp-video-player-loading">
      <div className="_6pp-video-player-loading-spinner"></div>
    </div>
  );

  return (
    <div
      className="_6pp-video-player-container"
      style={{
        width: isFullScreen ? "100vw" : isTheater ? "100%" : width,
        height: isFullScreen ? "100vh" : isTheater ? "70vh" : height,
        position: isFullScreen ? "fixed" : "relative",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Panel for adjusting quality setting */}
      {SettingPanel}

      {/* Panel for adjusting Speed */}

      {SpeedPanel}

      <div className="_6pp-video-player-controls-container">
        {/* Timeline Below */}
        {TimeLine}

        {/* Controls Panel with all controls */}

        {ControlsPanel}
      </div>

      {isLoading ? Loader : null}

      <video
        ref={videoPlayerRef}
        // src={src}
        className={`_6pp-video-player-video ${className}`}
        style={{
          filter: isLoading ? "blur(5px)" : "none",
        }}
        onClick={handlePlayPause}
        poster={poster}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onEnded={handlePlayPause}
        loop={loop}
      >
        <track src={captions} kind="captions" srcLang="en" label="English" />
      </video>
      <div className="_6pp-video-player-backdrop"></div>
    </div>
  );
};

export { VideoPlayerCustom };
