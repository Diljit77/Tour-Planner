import { FiMapPin, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';


export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 shadow-md z-50 h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        <Link to="/" className="flex items-center gap-2 text-[#1B998B] font-bold text-xl">
          <FiMapPin /> WanderAI
        </Link>

        <div className="flex gap-6 text-sm font-medium text-[#102A43] items-center relative">
          <Link to="/suggestions" className="hover:text-[#3FC1C9] transition-colors">Discover</Link>
          <Link to="/dashboard" className="hover:text-[#3FC1C9] transition-colors">My Trips</Link>

          {user ? (
            <div className="relative">
              {/* Profile Circle */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
              >
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center gap-1 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <FiUser /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

