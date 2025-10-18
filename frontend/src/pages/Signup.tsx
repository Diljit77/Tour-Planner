import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FiMapPin } from 'react-icons/fi';
import { useState } from 'react';
import { signupAPI, googleLoginAPI } from '../utils/authAPI';
import { toast } from 'react-toastify';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const data = await signupAPI(name, email, password);
      localStorage.setItem("token", data.token);
      toast.success(`Account created for ${data.user.email}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const data = await googleLoginAPI();
      localStorage.setItem("token", data.token);
      toast.error(`Welcome ${data.user.displayName || data.user.email}`);
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
          <h3 className="text-2xl font-bold mb-6 text-[#102A43] text-center">Create Account</h3>

          <form className="space-y-4" onSubmit={handleSignup}>
            <FormInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full py-3 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform">
              Sign Up
            </button>
          </form>

          <div className="my-4 flex items-center justify-center gap-2 text-sm text-[#102A43]/70">
            <span>or continue with</span>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-xl py-2 bg-white/20 backdrop-blur-md text-[#102A43] hover:scale-105 transition-transform"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="mt-4 text-center text-[#102A43]/80 text-sm">
            Already have an account? <Link to="/auth/login" className="text-[#3FC1C9] font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
