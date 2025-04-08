
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tasks from "../utils/tasks";
import db from "../db/db";
import { FaRedoAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";


const CompletedTasks = () => {
  const [completedItems, setCompletedItems] = useState([]);
  const [failedItems, setFailedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("uws_user");
      const completedTaskIds = JSON.parse(localStorage.getItem(`completedTasks-${email}`) || "[]");
      const failedTaskIds = JSON.parse(localStorage.getItem(`failedTasks-${email}`) || "[]");

      const photos = await db.photos.toArray();
      const photoMap = {};
      photos.forEach((p) => (photoMap[p.taskId] = p.dataUrl));

      const completed = tasks
        .filter((task) => completedTaskIds.includes(task.id))
        .map((task) => ({
          ...task,
          image: photoMap[task.id] || null,
        }));

      const failed = tasks
        .filter((task) => failedTaskIds.includes(task.id))
        .map((task) => ({
          ...task,
          image: photoMap[task.id] || null,
        }));

      setCompletedItems(completed);
      setFailedItems(failed);
    };

    fetchData();
  }, []);

  const handleRetry = (taskId) => {
    const email = localStorage.getItem("uws_user");
    const failedKey = `failedTasks-${email}`;
    const failed = JSON.parse(localStorage.getItem(failedKey) || "[]");
    const updated = failed.filter((id) => id !== taskId);
    localStorage.setItem(failedKey, JSON.stringify(updated));
    toast.success(" Task reset! Walk back to the location to try again.");
    navigate("/map");
  };
  

  return (
    <div className="h-[calc(100vh-64px)] p-4 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Completed Tasks
      </h2>

      {completedItems.length === 0 ? (
        <p className="text-center text-gray-400 mb-6">No tasks completed yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {completedItems.map((task) => (
            <div
              key={task.id}
              className="card bg-[#512b84] shadow-md p-4 rounded-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{task.name}</h3>
              <p className="text-sm text-white mb-3">{task.description}</p>

              {task.type === "photo" && task.image && (
                <img
                  src={task.image}
                  alt="Uploaded"
                  className="rounded-md w-full object-cover"
                />
              )}
              {task.type === "text" && (
                <p className="text-sm text-green-400">
                  You answered this question.
                </p>
              )}
              {task.type === "quiz" && (
                <p className="text-sm text-green-400">
                  You answered this quiz.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {failedItems.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-red-400">
            Failed Tasks
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {failedItems.map((task) => (
              <div
                key={task.id}
                className="card bg-[#842b2b] shadow-md p-4 rounded-md border border-red-400"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{task.name}</h3>
                <p className="text-sm text-white mb-3">{task.description}</p>
                <p className="text-sm text-red-200 mb-2">This task was marked as failed.</p>
                <button
                  className="btn btn-outline btn-warning w-full"
                  onClick={() => handleRetry(task.id)}
                >
                 <FaRedoAlt className="mr-2" /> Retry Task
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedTasks;
