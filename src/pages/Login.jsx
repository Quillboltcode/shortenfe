import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth(); // Destructure login and isAuthenticated
  const [error, setError] = useState(""); // Add error state for user feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear any previous errors
      await login(email, password); // Call login function from AuthContext
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Display error message
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50">
      <form onSubmit={handleSubmit} className="w-80 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome back! Please sign in to continue
        </p>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="Google Logo"
            className="w-6 h-6"
          />
          <span className="ml-2 text-sm text-gray-700">Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full my-5">
          <div className="w-full h-px bg-gray-300/90"></div>
          <p className="w-full text-nowrap text-sm text-gray-500/90">
            or sign in with email
          </p>
          <div className="w-full h-px bg-gray-300/90"></div>
        </div>

        {/* Email Input */}
        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8H4.063z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        {/* Remember Me and Forgot Password */}
        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
          <div className="flex items-center gap-2">
            <input className="h-5" type="checkbox" id="rememberMe" />
            <label className="text-sm" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a className="text-sm underline" href="#">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-500/90 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}