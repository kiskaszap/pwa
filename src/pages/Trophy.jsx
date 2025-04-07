import React from "react";
import { FaMedal, FaTrophy, FaCrown, FaGem } from "react-icons/fa";

const TrophyPage = () => {
    const email = localStorage.getItem("uws_user");
  const completed = email ? JSON.parse(localStorage.getItem(`completedTasks-${email}`) || "[]") : [];
  const total = completed.length;

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center ">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">
     Trophies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col items-center">
          <FaMedal
            size={64}
            className={total >= 6 ? "text-yellow-600" : "text-gray-400"}
          />
          <p className="mt-2 font-semibold text-white">Bronze</p>
          <p className="text-sm text-white">6 tasks</p>
        </div>

        <div className="flex flex-col items-center">
          <FaTrophy
            size={64}
            className={total >= 12 ? "text-gray-500" : "text-gray-400"}
          />
          <p className="mt-2 font-semibold text-white">Silver</p>
          <p className="text-sm text-white">12 tasks</p>
        </div>

        <div className="flex flex-col items-center">
          <FaCrown
            size={64}
            className={total >= 16 ? "text-yellow-400" : "text-gray-400"}
          />
          <p className="mt-2 font-semibold text-white">Gold</p>
          <p className="text-sm text-white">16 tasks</p>
        </div>

        <div className="flex flex-col items-center">
          <FaGem
            size={64}
            className={total === 17 ? "text-indigo-500" : "text-gray-400"}
          />
          <p className="mt-2 font-semibold text-white">Diamond</p>
          <p className="text-sm text-white">All 17 tasks</p>
        </div>
      </div>

      <p className="text-center text-white">
        You have completed{" "}
        <span className="font-bold text-indigo">{total}</span> out of 17 tasks.
      </p>
    </div>
  );
};

export default TrophyPage;
