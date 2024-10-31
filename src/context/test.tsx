import React, { useEffect, useState } from "react";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";

const DeviceSelector: React.FC = () => {
  const {
    getAudioDevices,
    getVideoDevices,
    switchMicrophone,
    switchCamera,
    isMuted,
    isCameraOn,
    mute,
    unmute,
    toggleCamera,
  } = useSimplePeer();

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");

  useEffect(() => {
    const loadDevices = async () => {
      const audio = await getAudioDevices();
      const video = await getVideoDevices();

      setAudioDevices(audio);
      setVideoDevices(video);

      if (audio[0]) setSelectedAudioDevice(audio[0].deviceId);
      if (video[0]) setSelectedVideoDevice(video[0].deviceId);
    };

    loadDevices();
  }, [getAudioDevices, getVideoDevices]);

  const handleAudioChange = async (deviceId: string) => {
    setSelectedAudioDevice(deviceId);
    await switchMicrophone(deviceId);
  };

  const handleVideoChange = async (deviceId: string) => {
    setSelectedVideoDevice(deviceId);
    await switchCamera(deviceId);
  };

  return (
    <div>
      <h3>Audio Devices</h3>
      <select
        value={selectedAudioDevice}
        onChange={(e) => handleAudioChange(e.target.value)}
      >
        {audioDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Audio Device ${device.deviceId}`}
          </option>
        ))}
      </select>

      <h3>Video Devices</h3>
      <select
        value={selectedVideoDevice}
        onChange={(e) => handleVideoChange(e.target.value)}
      >
        {videoDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Video Device ${device.deviceId}`}
          </option>
        ))}
      </select>

      <div>
        <button onClick={isMuted ? unmute : mute}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button onClick={toggleCamera}>
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
      </div>
    </div>
  );
};

export default DeviceSelector;
