// This file defines 3 task modals: QuizModal, TextModal, PhotoModal
import React from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";

export const QuizModal = ({ open, onClose, task }) => {
  const handleAnswer = (selected) => {
    const isCorrect = selected === task.correctAnswer;
    console.log("Selected:", selected, "Correct:", isCorrect);
    toast.success(isCorrect ? " Correct!" : "Wrong answer");
    onClose();
  };

  

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-[1000]">
      <div className="fixed inset-0 bg-black/50 z-[1001]" aria-hidden="true" />
      <div className="flex items-center justify-center  p-4 z-[1002]">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Quiz: {task.name}</h2>
          <p className="mb-3">{task.description}</p>
          {task.options?.map((option, i) => (
            <button
              key={i}
              className="btn btn-outline w-full mb-2"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
          {task.funFact && <p className="text-sm text-gray-500 mt-3">💡 {task.funFact}</p>}
        </div>
      </div>
    </Dialog>
  );
};

export const TextModal = ({ open, onClose, task }) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = () => {
    console.log(" Submitting text input:", input);
    toast.success(" Response submitted");
    setInput("");
    onClose();
  };

  console.log("✍️ Rendering TextModal for:", task);

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-[1000]">
      <div className="fixed inset-0 bg-black/50 z-[1001]" aria-hidden="true" />
      <div className="flex items-center justify-center  p-4 z-[1002]">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4"> Text Task: {task.name}</h2>
          <p className="mb-3">{task.description}</p>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary mt-4 w-full" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Dialog>
  );
};

export const PhotoModal = ({ open, onClose, task }) => {
  const fileInputRef = React.useRef();

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    console.log(" Upload attempt:", file?.name);
    if (file) {
      toast.success(" Photo uploaded!");
      onClose();
    } else {
      toast.error(" No photo selected");
    }
  };

  console.log("Rendering PhotoModal for:", task);

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-[1000]">
      <div className="fixed inset-0 bg-black/50 z-[1001]" aria-hidden="true" />
      <div className="flex items-center justify-center  p-4 z-[1002]">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4"> Photo Task: {task.name}</h2>
          <p className="mb-3">{task.description}</p>
          <input ref={fileInputRef} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
          <button className="btn btn-primary mt-4 w-full" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </Dialog>
  );
};