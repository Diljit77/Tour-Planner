
import type  { InputHTMLAttributes } from 'react';

export default function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full p-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-[#102A43] placeholder-[#102A43]/60 focus:outline-none focus:ring-2 focus:ring-[#3FC1C9] transition"
    />
  );
}
