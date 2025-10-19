import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';

interface Trip {
  _id: string;
  name: string;
  destination: string;
  places: { image?: string }[];
}

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { token } = useAuthStore();

  const fetchTrips = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to fetch trips');
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [token]);

  const handleDeleteTrip = async (tripId: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Trip deleted successfully!');
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete trip');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-28 pt-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-[#102A43]">My Trips</h2>
        <Link
          to="/create-trip"
          className="flex items-center gap-2 bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <FiPlus /> Create New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trips.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow text-center">
            No trips yet. Create your first itinerary!
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform relative flex flex-col"
            >
              <Link to={`/trip/${trip._id}`}>
                <img
                  src={trip.places?.[0]?.image || 'https://via.placeholder.com/400x250?text=Trip'}
                  alt={trip.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-[#102A43] font-medium text-lg">{trip.name}</div>
              </Link>

           
              <button
                onClick={() => handleDeleteTrip(trip._id)}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                title="Delete Trip"
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
