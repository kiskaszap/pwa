// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Splash = () => {
//   const navigate = useNavigate();
//   const deferredPromptRef = useRef(null);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       deferredPromptRef.current = e;
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     const timer = setTimeout(() => {
//       const isLoggedIn = localStorage.getItem("uws_user") && localStorage.getItem("selfie");
//       navigate(isLoggedIn ? "/map" : "/login");
//     }, 3500);

//     return () => {
//       window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//       clearTimeout(timer);
//     };
//   }, [navigate]);

//   const handleLogoClick = async () => {
//     if (deferredPromptRef.current) {
//       deferredPromptRef.current.prompt();
//       await deferredPromptRef.current.userChoice;
//       deferredPromptRef.current = null;
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center text-white bg-[#1d1e3c]">
//       <img
//         src="/uwsLogo.png"
//         alt="UWS Logo"
//         className="w-48 h-48 mb-4 animate-pulse cursor-pointer"
//         onClick={handleLogoClick}
//       />
//     </div>
//   );
// };

// export default Splash;
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const deferredPromptRef = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const timer = setTimeout(() => {
      const email = localStorage.getItem("uws_user");
      const selfie = email ? localStorage.getItem(`userSelfie-${email}`) : null;

      if (!email) {
        navigate("/login");
      } else if (!selfie) {
        navigate("/selfie");
      } else {
        navigate("/map");
      }
    }, 3500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [navigate]);

  const handleLogoClick = async () => {
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt();
      await deferredPromptRef.current.userChoice;
      deferredPromptRef.current = null;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-[#1d1e3c]">
      <img
        src="/uwsLogo.png"
        alt="UWS Logo"
        className="w-48 h-48 mb-4 animate-pulse cursor-pointer"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default Splash;
