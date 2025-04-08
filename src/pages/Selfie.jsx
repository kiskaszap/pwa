
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Selfie = () => {
  const [selfie, setSelfie] = useState(null);
  const [cameraAllowed, setCameraAllowed] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        streamRef.current = mediaStream;
        setCameraAllowed(true);
      }
    } catch {
      toast.error("Camera access denied");
      setCameraAllowed(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const dataUrl = canvas.toDataURL("image/png");
    setSelfie(dataUrl);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleRetake = () => {
    setSelfie(null);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play();
    } else {
      startCamera();
    }
  };

  const handleSave = () => {
    if (!selfie) {
      toast.error("Please take a selfie before saving");
      return;
    }

    const email = localStorage.getItem("uws_user");
    if (email) {
      localStorage.setItem(`userSelfie-${email}`, selfie);
    }

    toast.success("Selfie saved successfully");

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    navigate("/map");
  };

  if (!cameraAllowed) {
    return (
      <div className="h-screen w-full bg-[#1d1e3c] flex items-center justify-center text-center text-white px-4">
        <div>
          <h1 className="text-xl font-bold mb-4">
            Camera access denied or unavailable.
          </h1>
          <p className="mb-4">
            Please allow camera access and reload the app.
          </p>
          <button
            className="btn btn-warning"
            onClick={() => window.location.reload()}
          >
            Retry Camera Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#1d1e3c] px-4">
      <div className="card w-full max-w-md shadow-lg bg-white p-8">
        <h2 className="text-2xl font-bold mb-4 text-[#1d1e3c] text-center">
          Take Your Selfie
        </h2>

        {!selfie ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="320"
            height="240"
            className="rounded border mb-4"
          />
        ) : (
          <img
            src={selfie}
            alt="Captured Selfie"
            className="rounded border mb-4"
            width="320"
            height="240"
          />
        )}

        <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />

        {!selfie ? (
          <button className="btn bg-[#009878] text-white w-full mb-4" onClick={handleCapture}>
            Capture Selfie
          </button>
        ) : (
          <>
            <button className="btn bg-[#009878] text-white w-full mb-4" onClick={handleSave}>
              Save and Continue
            </button>
            <button className="btn btn-outline w-full" onClick={handleRetake}>
              Retake Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Selfie;
