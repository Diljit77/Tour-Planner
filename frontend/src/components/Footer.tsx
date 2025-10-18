import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white/20 backdrop-blur-md p-6 mt-10 text-center text-[#102A43]/80">
      <div className="flex justify-center gap-4 mb-2">
        <FiFacebook size={20} />
        <FiInstagram size={20} />
        <FiTwitter size={20} />
      </div>
      <p>© 2025 WanderAI. All rights reserved.</p>
      <p>Contact: info@wanderai.com</p>
    </footer>
  );
}
