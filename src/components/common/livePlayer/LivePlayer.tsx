import React, { FC, useCallback, useEffect, useRef } from "react";
import "./livePlayer.css";
import flvjs from "flv.js";
import Hls from "hls.js";

interface Props {
  videoUrl: string;
}

const LivePlayer: FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement | null>(null);
  const currentDurationRef = useRef<HTMLDivElement | null>(null);
  const totalDurationRef = useRef<HTMLDivElement | null>(null);
  const playbackSpeedButtonRef = useRef<HTMLButtonElement | null>(null);

  const timeLineContainerRef = useRef<HTMLDivElement | null>(null);

  const flvPlayerRef = useRef<flvjs.Player | null>(null);
  const hlsPlayerRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    // Callback for Intersection Observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (flvjs.isSupported() && videoUrl.endsWith(".flv")) {
            if (!flvPlayerRef.current) {
              const flvPlayer = flvjs.createPlayer({
                type: "flv",
                url: videoUrl,
              });

              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
              flvPlayer.on("ready", () => {
                video.play();
              });

              flvPlayerRef.current = flvPlayer;
            }
          } else if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
            if (!hlsPlayerRef.current) {
              const hls = new Hls();
              hls.loadSource(videoUrl);
              hls.attachMedia(video);
              hlsPlayerRef.current = hls;
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
              });
            }
          } else {
            video.src = videoUrl;
            video.load();
            video.play();
          }
        } else {
          video.pause(); // Pause video when leaving the viewport
        }
      });
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();

      if (flvPlayerRef.current) {
        flvPlayerRef.current.destroy();
        flvPlayerRef.current = null;
      }

      if (hlsPlayerRef.current) {
        hlsPlayerRef.current.destroy();
        hlsPlayerRef.current = null;
      }
    };
  }, [videoUrl]);

  // ---------------------- nessesary function start --------------------

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleTheaterMode = () => {
    if (!videoContainerRef.current) return;
    videoContainerRef.current.classList.toggle("theater");
  };

  const toggleFullScreenMode = () => {
    if (!videoContainerRef.current) return;
    if (document.fullscreenElement == null) {
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMiniPlayerMode = () => {
    if (!videoContainerRef.current) return;
    if (!videoRef.current) return;

    if (videoContainerRef.current.classList.contains("mini-player")) {
      document.exitPictureInPicture();
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };

  const toggleCaptionButton = () => {
    if (videoRef.current) {
      const isHidden = videoRef.current?.textTracks[0].mode === "hidden";
      videoRef.current.textTracks[0].mode = isHidden ? "showing" : "hidden";
      videoContainerRef.current?.classList.toggle("captions", isHidden);
    }
  };

  const toggleVideoSpeed = () => {
    if (videoRef.current) {
      let playbackRate = videoRef.current.playbackRate + 0.25;
      if (playbackRate > 2) playbackRate = 0.25;
      videoRef.current.playbackRate = playbackRate;

      if (playbackSpeedButtonRef.current) {
        playbackSpeedButtonRef.current.innerText = `${playbackRate.toFixed(
          2
        )}x`;
      }
    }
  };

  const handleVolumeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.volume = +e.target.value;
    videoRef.current.muted = +e.target.value === 0;
  };

  const formateDuration = useCallback((time: number) => {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }, []);

  function skip(duration: number) {
    if (!videoRef.current) return;
    videoRef.current.currentTime += duration;
  }

  // ---------------------- nessesary function end --------------------

  // ---------------------- nessesary useEffect start --------------------

  useEffect(() => {
    // play pause video
    if (videoRef.current) {
      videoRef.current.textTracks[0].mode = "hidden";

      videoRef.current.addEventListener("ended", () => {
        videoContainerRef.current?.classList.add("paused");
      });

      videoRef.current.addEventListener("pause", () => {
        videoContainerRef.current?.classList.add("paused");
      });

      videoRef.current.addEventListener("play", () => {
        videoContainerRef.current?.classList.remove("paused");
      });

      videoRef.current.addEventListener("enterpictureinpicture", () => {
        videoContainerRef.current?.classList.add("mini-player");
      });

      videoRef.current.addEventListener("leavepictureinpicture", () => {
        videoContainerRef.current?.classList.remove("mini-player");
      });
      videoRef.current.addEventListener("volumechange", () => {
        if (!volumeSliderRef.current) return;
        if (!videoRef.current) return;

        volumeSliderRef.current.value = `${videoRef.current.volume}`;
        let volumeLevel: string;

        if (videoRef.current?.muted || videoRef.current.volume === 0) {
          volumeLevel = "muted";
          volumeSliderRef.current.value = "0";
        } else if (videoRef.current?.volume >= 0.5) {
          volumeLevel = "high";
        } else {
          volumeLevel = "low";
        }

        if (videoContainerRef.current) {
          videoContainerRef.current.dataset.volumeLevel = volumeLevel;
        }
      });

      videoRef.current.addEventListener("loadeddata", () => {
        if (totalDurationRef.current) {
          totalDurationRef.current.innerText = `${formateDuration(
            videoRef.current?.duration || 0
          )}`;
        }
      });
      videoRef.current.addEventListener("timeupdate", () => {
        if (currentDurationRef.current) {
          currentDurationRef.current.innerText = `${formateDuration(
            videoRef.current?.currentTime || 0
          )}`;
        }

        if (videoRef.current) {
          if (!timeLineContainerRef.current) return;

          const persent =
            videoRef.current?.currentTime / videoRef.current?.duration;

          timeLineContainerRef.current.style.setProperty(
            "--progress-position",
            `${persent}`
          );
        }
      });
    }

    // full screen mode icon toggle
    const handleFullscreenChange = () => {
      if (!videoContainerRef.current) return;
      videoContainerRef.current.classList.toggle(
        "full-screen",
        document.fullscreenElement !== null
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [formateDuration]);

  // keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName.toLowerCase();

      // Ignore shortcuts if focused on interactive elements
      if (tagName === "input" || tagName === "textarea") {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return; // Allow space for buttons
          e.preventDefault();
          togglePlayPause();
          break;
        case "k":
          e.preventDefault();
          togglePlayPause();
          break;
        case "f":
          // e.preventDefault();
          toggleFullScreenMode();
          break;
        case "t":
          // e.preventDefault();
          toggleTheaterMode();
          break;
        case "i":
          // e.preventDefault();
          toggleMiniPlayerMode();
          break;
        case "m":
          // e.preventDefault();
          toggleMute();
          break;
        case "arrowleft":
        case "j":
          skip(-5);
          break;
        case "arrowright":
        case "l":
          skip(5);
          break;
        case "c":
          toggleCaptionButton();
          break;
        default:
          break;
      }
    };

    // Add keydown listener
    document.addEventListener("keydown", handleKeyDown);

    // Clean up listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ---------------------- nessesary useEffect end --------------------

  // ---------------------- handle timeline --------------------

  useEffect(() => {
    if (!timeLineContainerRef.current) return;
    if (!videoRef.current) return;
    if (!videoContainerRef.current) return;

    const timelineContainer = timeLineContainerRef.current;

    const handleTimelineUpdate = (e: MouseEvent) => {
      const rect = timelineContainer?.getBoundingClientRect();

      if (rect) {
        const percent =
          Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

        timelineContainer?.style.setProperty(
          "--preview-position",
          `${percent}`
        );
      }
    };
    const handleTimelineClick = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !timelineContainer) return;

      const rect = timelineContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      video.currentTime = percent * video.duration;
    };

    timeLineContainerRef.current.addEventListener(
      "mousemove",
      handleTimelineUpdate
    );
    timeLineContainerRef.current.addEventListener("click", handleTimelineClick);

    return () => {
      timeLineContainerRef.current?.removeEventListener(
        "mousemove",
        handleTimelineUpdate
      );
    };
  }, []);

  return (
    <div
      className="video-container paused"
      ref={videoContainerRef}
      data-volume-level="high"
    >
      <div className="video-controls-container">
        <div className="timeline-container" ref={timeLineContainerRef}>
          <div className="timeline">
            <div className="thumb-indicator"></div>
          </div>
        </div>

        <div className="controlls">
          {/* play pause button start */}
          <button className="play-pause" onClick={togglePlayPause}>
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          {/* play pause button end */}
          {/* volume */}
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              ref={volumeSliderRef}
              onChange={handleVolumeInputChange}
            />
          </div>
          {/* duration */}
          <div className="duration-container">
            <div className="current-time" ref={currentDurationRef}>
              0:00
            </div>
            /<div className="total-time" ref={totalDurationRef}></div>
          </div>

          <button className="captions-btn" onClick={toggleCaptionButton}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>

          <button
            className="speed-btn"
            ref={playbackSpeedButtonRef}
            onClick={toggleVideoSpeed}
          >
            1x
          </button>

          <button className="mini-player-btn" onClick={toggleMiniPlayerMode}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          {/* theater button */}
          <button className="theater-btn" onClick={toggleTheaterMode}>
            <svg className="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button>
          {/* full screen button */}
          <button className="full-screen-btn" onClick={toggleFullScreenMode}>
            <svg className="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>

      <video className="video" ref={videoRef} autoPlay onContextMenu={(e)=>e.preventDefault()} onClick={togglePlayPause}>
        <track kind="captions" srcLang="en" src="assets/subtitles.vtt" />
      </video>
    </div>
  );
};

export default LivePlayer;
