import React, { useState, useRef, useEffect } from "react";

const AudioRecorder = ({ onTranscriptReady }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // committed transcript
  const [liveSegment, setLiveSegment] = useState(""); // current segment being spoken
  const [timer, setTimer] = useState(60); // 1 minute in seconds
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const currentSegmentRef = useRef("");
  const transcriptRef = useRef("");
  

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
    for (let i = event.resultIndex; i < event.results.length; i++) {
      segment += event.results[i][0].transcript;
    }

    if (event.results[event.results.length - 1].isFinal) {
      setTranscript((prev) => {
        let full = (prev + " " + segment).trim();
        if (full && !/[.!?]$/.test(full)) full += ".";
        transcriptRef.current = full;
        return full;
      });
      setLiveSegment("");
    } else {
      setLiveSegment(segment);
    }
  };

  recognition.onerror = (e) => {
    console.log("Speech recognition error:", e);
    // Optional: restart automatically on certain errors
    if (recording && e.error !== "not-allowed") {
      setTimeout(() => recognition.start(), 300);
    }
  };

  recognition.onend = () => {
    // Restart recognition only if recording is ongoing
    if (recording) {
      try {
        recognition.start();
      } catch (err) {
        console.log("Recognition restart failed:", err);
      }
    }
  };

  // Start recognition immediately in the same user gesture
  recognition.start();
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
    <div style={{ padding: "20px" }}>
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
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', maxHeight: '180px', width: '340px', overflowY: 'auto', overflowX: 'hidden', background: '#fafbfc', borderRadius: '6px' }}>
        <p style={{ margin: 0, wordBreak: 'break-word' }}>{transcript}{liveSegment && (transcript ? ' ' : '')}{liveSegment}</p>
      </div>
    </div>
  );
};

export default AudioRecorder;
