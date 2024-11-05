import { useState, useRef } from "react";

const useVoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0); // Track recording time in seconds

  const recordingIntervalRef = useRef<number | null>(null); // To hold the interval ID
  const mediaStreamRef = useRef<MediaStream | null>(null); // Store the media stream
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream; // Store the media stream
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(blob);
      audioChunksRef.current = []; // Clear audio chunks for the next recording
      setRecordingTime(0); // Reset recording time
      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = window.setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1); //
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    isRecording,
    audioBlob,
    recordingTime: formatTime(recordingTime),
    startRecording,
    stopRecording,
  };
};

export default useVoiceMessage;

// ========================

// import { useState, useRef } from 'react';

// const useVoiceMessage = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [recordingTime, setRecordingTime] = useState<number>(0); // Track recording time in seconds
//   const [totalDuration, setTotalDuration] = useState<number>(0);

//   const recordingIntervalRef = useRef<number | null>(null); // To hold the interval ID
//   const audioElementRef = useRef<HTMLAudioElement | null>(null);
//   const mediaStreamRef = useRef<MediaStream | null>(null); // Store the media stream
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaStreamRef.current = stream; // Store the media stream
//     mediaRecorderRef.current = new MediaRecorder(stream);

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       audioChunksRef.current.push(event.data);
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//       setAudioBlob(blob);
//       audioChunksRef.current = [];  // Clear audio chunks for the next recording
//       setRecordingTime(0); // Reset recording time
//       stream.getTracks().forEach(track => track.stop()); // Stop all tracks to release microphone access
//     };

//     mediaRecorderRef.current.start();
//     setIsRecording(true);
//     setRecordingTime(0); // Reset recording time
//     recordingIntervalRef.current = window.setInterval(() => {
//       setRecordingTime((prevTime) => prevTime + 1); // Increment the recording time every second
//     }, 1000); // Update every second
//   };

//   const stopRecording = () => {
//     setTotalDuration(recordingTime);

//     mediaRecorderRef.current?.stop();
//     setIsRecording(false);
//     if (recordingIntervalRef.current) {
//       clearInterval(recordingIntervalRef.current); // Clear the interval on stop
//       recordingIntervalRef.current = null;
//     }
//   };

//   const playAudio = () => {
//     if (audioElementRef.current) {
//       audioElementRef.current.play();
//     }
//   };

//   const pauseAudio = () => {
//     if (audioElementRef.current) {
//       audioElementRef.current.pause();
//     }
//   };

//   const uploadAudio = async (url: string) => {
//     if (audioBlob) {
//       const formData = new FormData();
//       formData.append('file', audioBlob, 'voice-message.wav');

//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });

//       return response.json(); // Return the response from the server
//     }
//     return null;
//   };

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format as MM:SS
//   };

//   return {
//     isRecording,
//     totalDuration: formatTime(totalDuration),
//     audioBlob,
//     recordingTime: formatTime(recordingTime),
//     audioElementRef, // Expose the audioElementRef for playback control
//     startRecording,
//     stopRecording,
//     playAudio,
//     pauseAudio,
//     uploadAudio,
//   };
// };

// export default useVoiceMessage;
