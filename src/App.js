// 
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import {FaMapMarkedAlt, FaCheckCircle, FaTrophy, FaSignOutAlt  } from "react-icons/fa";




import Register from "./pages/Register";
import Map from "./pages/Map";
import TaskPage from "./pages/TasksPage";
import Splash from "./pages/Splash";
import Selfie from "./pages/Selfie";
import CompletedTasks from "./pages/CompletedTask";
import TrophyPage from "./pages/Trophy";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("uws_user");
    localStorage.removeItem("userSelfie"); // vagy `userSelfie-${email}`
    navigate("/login");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-[#512b84] text-white z-[999] border-t border-[#ffcc00] flex justify-around items-center">
      <Link to="/tasks" className={`btn btn-ghost ${isActive("/tasks") ? "text-[#ffcc00]" : "text-white"}`}>
        <FaTrophy className="text-2xl" />
      </Link>
      <Link to="/map" className={`btn btn-ghost ${isActive("/map") ? "text-[#ffcc00]" : "text-white"}`}>
        <FaMapMarkedAlt className="text-2xl" />
      </Link>
      <Link to="/completed" className={`btn btn-ghost ${isActive("/completed") ? "text-[#ffcc00]" : "text-white"}`}>
        <FaCheckCircle className="text-2xl" />
      </Link>
      <button onClick={handleLogout} className="btn btn-ghost text-white">
        <FaSignOutAlt className="text-2xl" />
      </button>
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className=" font-sans bg-gradient-to-r from-[#2A2D7C] to-[#1F2251]">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Register />} />
          <Route path="/map" element={<Map />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/selfie" element={<Selfie />} />
        

          {/* Optional: future pages for drawer tabs */}
          <Route path="/tasks" element={<TrophyPage/>} />
          <Route path="/completed" element={<CompletedTasks/>} />
        </Routes>

        {/* Show drawer on all routes except splash/login/selfie */}
        {!["/", "/login", "/selfie"].includes(window.location.pathname) && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
