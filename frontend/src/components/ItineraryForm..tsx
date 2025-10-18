import LocationSearch from './LocationSearch';
import { useState } from 'react';
import { FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axios';
import { useItineraryStore } from '../store/itineraryStore';
import { toast } from 'react-toastify';

export default function ItineraryForm() {
  const [destination, setDestination] = useState<{ name: string; lat: string; lon: string } | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { setItinerary } = useItineraryStore();
  const navigate = useNavigate();

  const toggleInterest = (tag: string) => {
    setInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return toast.error('Please select a destination!');
    setLoading(true);

    try {
      const res = await axiosInstance.post('/ai/generate', {
        destination, // includes name + lat/lon
        startDate,
        endDate,
        interests,
      });

      if (res.data.success) {
        setItinerary(destination.name, res.data.itinerary);
        navigate(`/trip`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Destination Autocomplete */}
        <div className="flex-1 relative">
          <LocationSearch onSelect={setDestination} />
        </div>

        {/* Start Date */}
        <div className="flex-1 relative">
          <FiCalendar className="absolute left-3 top-3 text-[#3FC1C9]" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="pl-10 w-full p-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-[#102A43]"
            required
          />
        </div>

        {/* End Date */}
        <div className="flex-1 relative">
          <FiCalendar className="absolute left-3 top-3 text-[#3FC1C9]" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="pl-10 w-full p-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-[#102A43]"
            required
          />
        </div>
      </div>

      {/* Interests */}
      <div>
        <p className="font-medium mb-2 text-[#102A43]">Select Interests</p>
        <div className="flex flex-wrap gap-2">
          {['Nature', 'Adventure', 'Culture', 'Food', 'Relaxation'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleInterest(tag)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition flex items-center gap-1 ${
                interests.includes(tag)
                  ? 'bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white border-none shadow-md hover:scale-105'
                  : 'bg-white/20 backdrop-blur-md border-white/30 text-[#102A43]/80 hover:scale-105'
              }`}
            >
              {interests.includes(tag) && <FiCheckCircle />}
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-white font-semibold rounded-xl shadow-md transition-transform ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] hover:scale-[1.02]'
        }`}
      >
        {loading ? 'Generating Itinerary...' : 'Generate My AI Itinerary ✨'}
      </button>
    </form>
  );
}
