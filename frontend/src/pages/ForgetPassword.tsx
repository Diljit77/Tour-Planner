import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FiMapPin } from 'react-icons/fi';
import { useState } from 'react';
import { forgotPasswordAPI } from '../utils/authAPI';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgot = async (e: any) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email first!");
    try {
      await forgotPasswordAPI(email);
      toast.success("resent link sent succesfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
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
          <h3 className="text-2xl font-bold mb-6 text-[#102A43] text-center">Forgot Password</h3>
          <p className="text-[#102A43]/80 mb-4 text-center">Enter your email to reset your password.</p>

          <form className="space-y-4" onSubmit={handleForgot}>
            <FormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="w-full py-3 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform">
              Send Reset Link
            </button>
          </form>

          <p className="mt-4 text-center text-[#102A43]/80 text-sm">
            Remembered your password? <Link to="/auth/login" className="text-[#3FC1C9] font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
