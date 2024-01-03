import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const togglePlay = (): void => {
    if (isPlaying) {
      videoRef.current!.pause();
    } else {
      videoRef.current!.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (): void => {
    setCurrentTime(videoRef.current!.currentTime);
  };

  const handleDurationChange = (): void => {
    setDuration(videoRef.current!.duration);
  };

  const handlePlaybackSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    videoRef.current!.playbackRate = speed;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const time = parseFloat(e.target.value);
    videoRef.current!.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderProgressBar = (): JSX.Element => {
    const progress = (currentTime / duration) * 100 || 0;

    console.log(progress)

    return (
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        onChange={handleSeek}
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
      />
      <div>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <span>{formatTime(currentTime)}</span>
        <span> / {formatTime(duration)}</span>
        <select value={playbackSpeed} onChange={handlePlaybackSpeedChange}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
      {renderProgressBar()}
    </div>
  );
};

export default VideoPlayer;