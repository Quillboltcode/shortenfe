import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout, isAuthenticated } = useAuth(); // Access auth state and logout function
  const navigate = useNavigate();
 
  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false); // Close dropdown
    logout(); // Call logout function from AuthContext
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <a href="#">
        <img className="h-9" src="" alt="Shorten Link" />
      </a>

      <div className="hidden sm:flex items-center gap-8 relative">
        <Link
          to="/"
          className="cursor-pointer px-6 py-2 transition text-gray-600 rounded-full"
        >
          Home
        </Link>

        {/* If user is authenticated */}
        {isAuthenticated ? (
          <div className="relative flex items-center gap-4" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src={user?.avatar || "https://i.pravatar.cc/150?img=5"} // Default avatar if none exists
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-indigo-500 hover:opacity-90 transition"
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-60 bg-white rounded-xl shadow-lg py-4 px-6 z-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{user?.username || "Guest"}</h3>
                <p className="text-sm text-gray-600 mb-1">Email: {user?.email || "N/A"}</p>
                <p className="text-sm text-gray-600 mb-4">Password: ••••••••</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-center text-sm bg-red-500 text-white rounded-full py-2 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not authenticated
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}