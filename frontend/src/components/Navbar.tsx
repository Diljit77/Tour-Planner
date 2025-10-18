import { FiMapPin, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 shadow-md z-50 h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
        <Link to="/" className="flex items-center gap-2 text-[#1B998B] font-bold text-xl">
          <FiMapPin /> WanderAI
        </Link>
        <div className="flex gap-6 text-sm font-medium text-[#102A43] items-center">
        
          <Link to="/suggestions" className="hover:text-[#3FC1C9] transition-colors">Discover</Link>
          <Link to="/dashboard" className="hover:text-[#3FC1C9] transition-colors">My Trips</Link>
          <Link 
            to="/auth/login" 
            className="flex items-center gap-1 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <FiUser /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
