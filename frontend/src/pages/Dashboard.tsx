import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

const trips = [
  {id:1, name:'Bali Adventure', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'},
  {id:2, name:'Kyoto Culture', img:'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=800&q=80'}
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-28 pt-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-[#102A43]">My Trips</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
          <FiPlus /> Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trips.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow text-center">
            No trips yet. Create your first itinerary!
          </div>
        ) : trips.map(trip => (
          <Link
            key={trip.id}
            to={`/trip/${trip.id}`}
            className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform flex flex-col"
          >
            <img src={trip.img} alt={trip.name} className="w-full h-64 object-cover" />
            <div className="p-4 text-[#102A43] font-medium text-lg">{trip.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
