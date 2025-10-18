import { FiHeart, FiMapPin } from 'react-icons/fi';

const dummy = [
  {id:1, name:'Bali, Indonesia', tags:['Nature','Relaxation'], img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'},
  {id:2, name:'Sahara Desert', tags:['Adventure','Relaxation'], img:'https://images.unsplash.com/photo-1549887534-4d2b2d88c7d4?auto=format&fit=crop&w=800&q=80'},
  {id:3, name:'Kyoto, Japan', tags:['Culture','Nature'], img:'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=800&q=80'}
];

export default function Suggestions() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-28">
      <h2 className="text-3xl font-bold mb-10 text-[#102A43] text-center">
        Suggested Trips for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummy.map(d => (
          <div
            key={d.id}
            className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer flex flex-col"
          >
            <div className="relative h-52">
              <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/30 rounded-full p-2 shadow">
                <FiMapPin className="text-[#3FC1C9]" size={20} />
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="font-semibold text-[#102A43] text-lg">{d.name}</div>
              <div className="mt-2 flex gap-2 flex-wrap text-sm">
                {d.tags.map(t => (
                  <div key={t} className="px-2 py-1 bg-white/30 rounded-full text-[#102A43]">
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-auto flex gap-2 pt-4">
                <button className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white font-medium hover:scale-105 transition-transform flex items-center justify-center gap-1">
                  <FiHeart /> Add to Planner
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg border border-white/30 text-[#102A43] font-medium hover:scale-105 transition-transform">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
