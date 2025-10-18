import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FiMapPin } from 'react-icons/fi';
import { useState } from 'react';
import { loginAPI, googleLoginAPI, forgotPasswordAPI } from '../utils/authAPI';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false); // 🔹 new state for forgot password
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleEmailLogin = async (e: any) => {
    e.preventDefault();
    try {
      if(!email || !password) return toast.error("Please enter both email and password");
      const data = await loginAPI(email, password);
      setUser(data.user, data.token)
      toast.success(`Welcome ${data.user.email}`);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleGoogle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await googleLoginAPI();
      setUser(data.user, data.token)
      toast.success(`Welcome ${data.user.displayName || data.user.email}`);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error("Google sign-in failed. Make sure pop-ups are allowed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return toast.error("Enter your email first!");
    setForgotLoading(true); // 🔹 start loader
    try {
      const data = await forgotPasswordAPI(email);
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setForgotLoading(false); // 🔹 stop loader
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-[#F1FAF6]/50 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 text-[#1B998B] font-bold text-xl">
            <FiMapPin /> WanderAI
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-[#102A43] text-center">Welcome Back</h3>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <FormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full py-3 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform">
              Sign In
            </button>
          </form>

          <div className="flex justify-between items-center mt-2 text-sm">
            <button 
              onClick={handleForgotPassword} 
              className="text-[#3FC1C9] hover:underline flex items-center gap-2"
              disabled={forgotLoading} // 🔹 disable while loading
            >
              {forgotLoading ? "Sending..." : "Forgot password?"}
            </button>
            <Link to="/auth/signup" className="text-[#3FC1C9] hover:underline">Sign Up</Link>
          </div>

          <div className="my-4 flex items-center justify-center gap-2 text-sm text-[#102A43]/70">
            <span>or continue with</span>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 border border-white/30 rounded-xl py-2 bg-white/20 backdrop-blur-md text-[#102A43] transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            <FcGoogle size={20} /> {loading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
