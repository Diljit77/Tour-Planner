export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80" alt="Profile Banner" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center">
          <h2 className="text-3xl text-white font-bold">Your Profile</h2>
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 text-[#102A43]">
        Profile settings and preferences here.
      </div>
    </div>
  )
}

