import ItineraryForm from '../components/ItineraryForm.'
import FeatureCard from '../components/FeatureCard'
import { FiCompass, FiCloud, FiHeart } from 'react-icons/fi'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000050] to-[#00000020]" />
        <div className="relative z-10 text-white max-w-3xl px-6">
          <h1 className="text-5xl font-bold mb-4">Plan Your Perfect Trip with <span className="text-[#3FC1C9]">AI</span></h1>
          <p className="text-lg mb-6 text-gray-200">Get personalized itineraries, weather insights, and local highlights — instantly.</p>
          <a href="#plan" className="inline-block bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
            ✈️ Start Planning
          </a>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <FeatureCard icon={<FiCompass size={28} />} title="AI-Powered Itineraries" text="Instantly create personalized day-by-day travel plans." />
        <FeatureCard icon={<FiCloud size={28} />} title="Weather-Aware Plans" text="Stay ahead with live weather forecasts for your destinations." />
        <FeatureCard icon={<FiHeart size={28} />} title="Save & Revisit" text="Login to save your favorite trips and revisit anytime." />
      </section>

      {/* Planner Preview */}
      <section id="plan" className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">Start Your Adventure 🌍</h2>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8">
          <ItineraryForm />
        </div>
      </section>
    </div>
  )
}
