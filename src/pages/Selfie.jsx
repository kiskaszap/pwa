// // src/pages/Selfie.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Selfie = () => {
//   const [selfie, setSelfie] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode: "user" } })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch(() => {
//         toast.error("📷 Camera access denied");
//       });
//   }, []);

//   const handleCapture = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, 320, 240);
//     const dataUrl = canvas.toDataURL("image/png");
//     setSelfie(dataUrl);
//   };

//   const handleSave = () => {
//     if (!selfie) {
//       toast.error("📸 Please take a selfie before saving");
//       return;
//     }

//     localStorage.setItem("userSelfie", selfie);
//     toast.success("✅ Selfie saved successfully");
//     navigate("/map");
//   };

//   return (
//     <div className="flex items-center justify-center bg-base-200 px-4">
//       <div className="card w-full max-w-md shadow-lg bg-base-100 p-8">
//         <h2 className="text-2xl font-bold mb-4 text-primary text-center">
//           Take Your Selfie
//         </h2>

//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           width="320"
//           height="240"
//           className="rounded border mb-2"
//         />

//         <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />

//         <button className="btn btn-secondary w-full mb-4" onClick={handleCapture}>
//           Capture Selfie
//         </button>

//         {selfie && <img src={selfie} alt="Selfie Preview" className="rounded shadow mb-4" />}

//         <button className="btn btn-primary w-full" onClick={handleSave}>
//           Save and Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Selfie;

// src/pages/Selfie.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Selfie = () => {
  const [selfie, setSelfie] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch {
      toast.error("📷 Camera access denied");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const dataUrl = canvas.toDataURL("image/png");
    setSelfie(dataUrl);

    // Pause the video to "freeze" the frame
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleRetake = () => {
    setSelfie(null);

    // Resume video and restart camera
    if (videoRef.current && stream) {
      videoRef.current.play();
    } else {
      startCamera(); // In case video stream is lost
    }
  };

  const handleSave = () => {
    if (!selfie) {
      toast.error(" Please take a selfie before saving");
      return;
    }

    const email = localStorage.getItem("uws_user");
if (email) {
  localStorage.setItem(`userSelfie-${email}`, selfie);
}

    toast.success(" Selfie saved successfully");
    navigate("/map");
  };

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
