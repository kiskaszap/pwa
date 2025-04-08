
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaCheckCircle,
  FaTrophy,
  FaSignOutAlt,
} from "react-icons/fa";

import Register from "./pages/Register";
import Map from "./pages/Map";
import TaskPage from "./pages/TasksPage";
import Splash from "./pages/Splash";
import Selfie from "./pages/Selfie";
import CompletedTasks from "./pages/CompletedTask";
import TrophyPage from "./pages/Trophy";


const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const email = localStorage.getItem("uws_user");

  const handleLogout = () => {
    localStorage.removeItem("uws_user");
    localStorage.removeItem(`userSelfie-${email}`);
    localStorage.removeItem(`completedTasks-${email}`);
    localStorage.removeItem(`failedTasks-${email}`);
    navigate("/login");
  };

  return (
    <div className="relative overflow-visible">
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[#512b84] text-white z-[999] border-t border-[#ffcc00] flex justify-around items-center">
        <Link
          to="/tasks"
          className={`btn btn-ghost ${
            isActive("/tasks") ? "text-[#ffcc00]" : "text-white"
          }`}
        >
          <FaTrophy className="text-2xl" />
        </Link>
        <Link
          to="/map"
          className={`btn btn-ghost ${
            isActive("/map") ? "text-[#ffcc00]" : "text-white"
          }`}
        >
          <FaMapMarkedAlt className="text-2xl" />
        </Link>
        <Link
          to="/completed"
          className={`btn btn-ghost ${
            isActive("/completed") ? "text-[#ffcc00]" : "text-white"
          }`}
        >
          <FaCheckCircle className="text-2xl" />
        </Link>
        <button onClick={handleLogout} className="btn btn-ghost text-white">
          <FaSignOutAlt className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

// App wrapper to support useLocation
const AppContent = () => {
  const location = useLocation();
  const hideBottomNavRoutes = ["/", "/login", "/selfie"];
  const shouldShowBottomNav = !hideBottomNavRoutes.includes(location.pathname);

  return (
    <div className="font-sans bg-gradient-to-r from-[#2A2D7C] to-[#1F2251]">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Register />} />
        <Route path="/map" element={<Map />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/selfie" element={<Selfie />} />
        <Route path="/tasks" element={<TrophyPage />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>

      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
