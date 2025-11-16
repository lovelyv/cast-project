import React, { useState, useRef, useEffect } from "react";

const AudioRecorder = ({ onTranscriptReady }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // committed transcript
  const [liveSegment, setLiveSegment] = useState(""); // current spoken segment
  const [timer, setTimer] = useState(60); // 1-minute countdown
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  // --- Smart punctuation helpers ---
  const addPeriodIfNeeded = (text) => {
    let t = text.trim();
    if (!t) return t;
    if (!/[.!?]$/.test(t)) t += ".";
    return t;
  };

  const applySmartPunctuation = (text) => {
    let t = text.trim().replace(/\s+/g, " ");
    // Simple question detection
    const questionTriggers = [
      "right",
      "okay",
      "ok",
      "is it",
      "does it",
      "did you",
      "aren't you",
      "do you think",
    ];
    const endsLikeQuestion = questionTriggers.some((q) =>
      t.toLowerCase().endsWith(" " + q)
    );
    if (endsLikeQuestion && !t.endsWith("?")) t = t.replace(/[, ]*$/, "?");
    return t;
  };

  // --- Start Recording ---
  const startRecording = async () => {
    chunksRef.current = [];
    setTimer(60);

    try {
      // Force mic prompt
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(blob);
        console.log("Recorded audio URL:", audioURL);
      };
      mediaRecorderRef.current.start();
      setRecording(true);

      startTranscription();

      // Timer countdown
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Microphone permission denied:", err);
      alert("Please allow microphone access to record.");
    }
  };

  // --- Stop Recording ---
  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
    clearInterval(timerRef.current);
    setTimer(60);
  };

  // --- Send transcript to parent ---
  useEffect(() => {
    if (onTranscriptReady) {
      let combined = (
        transcriptRef.current +
        (liveSegment ? " " + liveSegment : "")
      ).trim();
      combined = combined.replace(/\s+/g, " ");
      if (combined && !/[.!?]$/.test(combined)) combined += ".";
      onTranscriptReady(combined);
    }
  }, [transcript, liveSegment, onTranscriptReady]);

  // --- Start Web Speech API Transcription ---
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
          full = addPeriodIfNeeded(applySmartPunctuation(full));
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
      // Restart on recoverable errors
      if (recording && e.error !== "not-allowed") {
        setTimeout(() => {
          try {
            recognition.start();
          } catch {}
        }, 300);
      }
    };

    recognition.onend = () => {
      setLiveSegment("");
      if (recording) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {
            console.log("Restart failed:", err);
          }
        }, 200); // delay needed on Android Chrome
      }
    };

    recognition.start();
  };

  // --- Timer formatting ---
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Audio Recorder + Smart Transcription</h2>
      <button type="button" onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button type="button" onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>

      {recording && (
        <div
          style={{
            margin: "12px 0",
            fontWeight: "bold",
            color: timer <= 10 ? "#b00020" : "#1a3a52",
          }}
        >
          Timer: {formatTime(timer)}
        </div>
      )}

      <h3>Transcript:</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "100px",
          maxHeight: "180px",
          width: "340px",
          overflowY: "auto",
          overflowX: "hidden",
          background: "#fafbfc",
          borderRadius: "6px",
        }}
      >
        <p style={{ margin: 0, wordBreak: "break-word" }}>
          {transcript}
          {liveSegment && (transcript ? " " : "")}
          {liveSegment}
        </p>
      </div>
    </div>
  );
};

export default AudioRecorder;
