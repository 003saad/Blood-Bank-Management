import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserContext"; // Import the useUser hook

export default function Navbar() {
  const { setUserData, userData, loading, handleLogout } = useUser(); // Access user data from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location/path
  const navigate = useNavigate(); // For navigation

  // Re-render Navbar when userData changes
  useEffect(() => {
    console.log("User data has been updated", userData);
  }, [userData]);

  // Helper to check if the path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  if (loading) return <div>Loading...</div>; // Show loading state while user data is being fetched

  return (
    <nav className="bg-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="w-8">
            <Heart className="h-8 w-8 text-white" fill="white" />
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex items-center justify-center space-x-4">
            {["Home", "Patient", "Donor", "Admin"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`${
                  isActive(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "bg-red-700"
                    : "text-white hover:bg-red-700"
                } font-medium`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* User Section and Logout */}
          <div className="flex items-center space-x-2">
            {userData ? (
              <>
                <span className="text-white font-medium">
                  Welcome, {userData.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-white bg-red-700 rounded-md hover:bg-red-800"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "Patient", "Donor", "Admin"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`${
                  isActive(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "bg-red-700"
                    : "text-white hover:bg-red-700"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
