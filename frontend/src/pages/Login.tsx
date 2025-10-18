import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { FiMapPin } from 'react-icons/fi';

export default function Login() {
  return (
    <div className="min-h-screen bg-[url('/images/hero-bg.jpg')] bg-cover bg-center relative flex items-center justify-center px-6">
 
      <div className="absolute inset-0 bg-[#F1FAF6]/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md">
<div className="flex text-center justify-center ">
    <Link to="/" className="flex items-center text-center gap-2 text-[#1B998B] font-bold text-xl">
             <FiMapPin /> WanderAI
           </Link>
</div>
 


        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-[#102A43] text-center">Welcome Back</h3>

          <form className="space-y-4">
            <FormInput type="email" placeholder="Email" />
            <FormInput type="password" placeholder="Password" />
            <button className="w-full py-3 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform">
              Sign In
            </button>
          </form>

          <div className="flex justify-between items-center mt-2 text-sm">
            <Link to="/auth/forgot" className="text-[#3FC1C9] hover:underline">
              Forgot password?
            </Link>
            <Link to="/auth/signup" className="text-[#3FC1C9] hover:underline">
              Sign Up
            </Link>
          </div>

          <div className="my-4 flex items-center justify-center gap-2 text-sm text-[#102A43]/70">
            <span>or continue with</span>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-xl py-2 bg-white/20 backdrop-blur-md text-[#102A43] hover:scale-105 transition-transform">
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="mt-4 text-center text-[#102A43]/80 text-sm">
            You can explore the website without login. Login gives extra benefits.
          </p>
        </div>
      </div>
    </div>
  );
}
