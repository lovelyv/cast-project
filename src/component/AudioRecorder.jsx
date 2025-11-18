import React, { useState, useRef, useEffect } from "react";

const AudioRecorder = ({ onTranscriptReady, onClose }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // committed transcript
  const [liveSegment, setLiveSegment] = useState(""); // current segment being spoken
  const [timer, setTimer] = useState(60); // 1 minute in seconds
  const [showUnsupported, setShowUnsupported] = useState(false);
  const transcriptStartedRef = useRef(false);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const currentSegmentRef = useRef("");
  const transcriptRef = useRef("");

  // Prevent background scroll when AudioRecorder is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 1. Start Recording
  const startRecording = async () => {
    // Do not clear transcript or liveSegment to allow accumulation
    chunksRef.current = [];
    setTimer(60);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(blob);
      console.log("Recorded audio URL:", audioURL);
      // Optionally, play the audio or send to backend here
    };

    mediaRecorderRef.current.start();
    setRecording(true);
    setShowUnsupported(false);
    transcriptStartedRef.current = false;

    // Start transcription automatically
    startTranscription();

    // Start timer countdown
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Effect: Watch transcript and liveSegment during recording
  useEffect(() => {
    if (recording) {
      if ((transcript && transcript.trim() !== "") || (liveSegment && liveSegment.trim() !== "")) {
        transcriptStartedRef.current = true;
        setShowUnsupported(false);
      }
      // After 2 seconds, if still nothing, show unsupported
      const timeout = setTimeout(() => {
        if (!transcriptStartedRef.current) {
          setShowUnsupported(true);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [recording, transcript, liveSegment]);

  // 2. Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    clearInterval(timerRef.current);
  setTimer(60);
    // No need to call onTranscriptReady here, will be handled by useEffect below
  };
  // Always send the latest transcript (including live segment) to parent
  useEffect(() => {
    if (onTranscriptReady) {
      let combined = (transcriptRef.current + (liveSegment ? (' ' + liveSegment) : '')).trim();
      combined = combined.replace(/\s+/g, ' ');
      if (combined && !/[.!?]$/.test(combined)) combined += '.';
      onTranscriptReady(combined);
    }
  }, [transcript, liveSegment, onTranscriptReady]);

  // 3. Transcribe Using Web Speech API
  const startTranscription = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";


    recognition.onresult = (event) => {
      let segment = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        segment += event.results[i][0].transcript;
      }
      // If the result is final, append to transcript
      if (event.results[event.results.length - 1].isFinal) {
        setTranscript(prev => {
          let full = (prev + ' ' + segment).replace(/\s+/g, ' ').trim();
          // Add a period if not already present
          if (full && !full.endsWith('.')) full += '.';
          transcriptRef.current = full;
          return full;
        });
        setLiveSegment("");
        currentSegmentRef.current = "";
      } else {
        // Otherwise, just update the live segment
        currentSegmentRef.current = segment;
        setLiveSegment(segment);
      }
    };

    recognition.onend = () => {
      // On end, just clear the live segment, do not touch transcript
      setTimeout(() => setLiveSegment(""), 0);
      currentSegmentRef.current = "";
      // If still recording, restart recognition for continuous effect
      if (recording) {
        recognition.start();
      }
    };

    recognition.start();
  setTimeout(() => recognition.stop(), 60 * 1000); // stop after 1 min
  };

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);



  return (
    <div style={{ padding: "20px", opacity: 1 }}>
      <h2>Audio Recorder + Transcription</h2>
      <button type="button" onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button type="button" onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      {recording && (
        <div style={{ margin: '12px 0', fontWeight: 'bold', color: timer <= 10 ? '#b00020' : '#1a3a52' }}>
          Timer: {formatTime(timer)}
        </div>
      )}
      
      <h3>Transcript:</h3>
      <p>{transcript}{liveSegment && (transcript ? ' ' : '')}{liveSegment}</p>
    </div>
  );
};

export default AudioRecorder;
