import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@studentmail.uws.ac.uk")) {
      toast.error("Only @uws.ac.uk emails allowed ");
      return;
    }

    localStorage.setItem("uws_user", email);
    toast.success("🎓 Logged in with UWS email!");

    setTimeout(() => {
      navigate("/selfie"); // Navigate to selfie screen after login
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2A2D7C]">
          Login with UWS Email
        </h2>

        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text text-sm text-gray-700 font-medium">
              Email Address
            </span>
          </div>
          <input
  type="email"
  placeholder="bannerID@studentmail.uws.ac.uk"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A2D7C] text-base box-border"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
        </label>

        <button
  type="submit"
  className="w-full mt-4 bg-[#00A36C] hover:bg-[#00905e] text-white font-semibold py-2 rounded-md transition box-border"
>
  Login
</button>
      </form>
    </div>
  );
};

export default Register;
