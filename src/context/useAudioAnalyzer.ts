import { useState } from "react";

const useAudioAnalyzer = () => {
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  let audioContext: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;

  const createAudioAnalyzer = (stream: MediaStream, userId: string) => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Monitor audio levels
    const checkSpeaking = () => {
      analyser?.getByteFrequencyData(dataArray);
      const volume =
        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      if (volume > 100) {
        setActiveSpeakerId(userId);
      } else if (activeSpeakerId === userId) {
        setActiveSpeakerId(null); // Clear when user stops talking
      }
      requestAnimationFrame(checkSpeaking);
    };

    checkSpeaking();
  };

  return { createAudioAnalyzer,activeSpeakerId };
};

export default useAudioAnalyzer;
