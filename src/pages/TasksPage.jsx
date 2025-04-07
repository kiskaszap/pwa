import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tasks from "../utils/tasks";
import { toast } from "react-hot-toast";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === id);
  const [cameraAllowed, setCameraAllowed] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [textInput, setTextInput] = useState("");

  const email = localStorage.getItem("uws_user");

  useEffect(() => {
    if (task?.type === "photo") {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          setCameraAllowed(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          toast.error("📷 Camera access denied");
          setCameraAllowed(false);
        });
    }
  }, [task]);

  const handleComplete = () => {
    if (!email) return toast.error("User not logged in!");

    const key = `completedTasks-${email}`;
    const completed = JSON.parse(localStorage.getItem(key) || "[]");

    if (!completed.includes(task.id)) {
      completed.push(task.id);
      localStorage.setItem(key, JSON.stringify(completed));
    }

    toast.success("✅ Task completed!");
    navigate("/map");
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const dataUrl = canvasRef.current.toDataURL("image/png");

      if (!email) return toast.error("User not logged in!");
      localStorage.setItem(`photo-${email}-${task.id}`, dataUrl);

      handleComplete();
    }
  };
  const handleFail = () => {
    if (!email) return toast.error("User not logged in!");
  
    const key = `failedTasks-${email}`;
    const failed = JSON.parse(localStorage.getItem(key) || "[]");
  
    if (!failed.includes(task.id)) {
      failed.push(task.id);
      localStorage.setItem(key, JSON.stringify(failed));
    }
  
    toast.error(" Task marked as failed");
    navigate("/map");
  };
  

  const handleQuizSubmit = (option) => {
    const isCorrect = option === task.correctAnswer;
    if (isCorrect) {
      toast.success(" Correct!");
      handleComplete();
    } else {
      toast.error(" Wrong answer");
      handleFail(); // Ez már elmenti failed listába és visszavisz mapre
    }
  };
  

  const handleTextSubmit = () => {
    if (!email) return toast.error("User not logged in!");
    localStorage.setItem(`text-${email}-${task.id}`, textInput);
    toast.success("📝 Response submitted");
    handleComplete();
  };

  if (!task) return <div className="p-4"> Task not found</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4 bg-[#1d1e3c]">

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">📍 {task.name}</h2>
        <p className="mb-4 text-gray-700">{task.description}</p>

        {task.type === "quiz" && (
          <>
            {task.options?.map((option, i) => (
              <button
                key={i}
                className="btn btn-outline w-full mb-2"
                onClick={() => handleQuizSubmit(option)}
              >
                {option}
              </button>
            ))}
            {task.funFact && (
              <p className="text-sm text-gray-500 mt-3">💡 {task.funFact}</p>
            )}
          </>
        )}

        {task.type === "text" && (
          <div className="pr-4 flex flex-col items-center">
           <textarea
  className="block w-full py-3 border border-gray-300 rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  rows={3}
  value={textInput}
  onChange={(e) => setTextInput(e.target.value)}
  placeholder="Write your answer..."
></textarea>

            <button className="btn btn-primary w-full" onClick={handleTextSubmit}>
              Submit
            </button>
          </div>
        )}

        {task.type === "photo" && cameraAllowed ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              width="320"
              height="240"
              className="mb-4 rounded border"
            />
            <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />
            <button className="btn btn-primary w-full" onClick={handleCapture}>
              Capture Photo
            </button>
          </>
        ) : (
          task.type === "photo" && (
            <p className="text-red-600 font-semibold">
              Camera access denied. Please allow camera permissions and refresh the page.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TaskPage;
