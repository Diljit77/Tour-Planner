import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { Link } from "react-router-dom";
import { FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

export default function Discover() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axiosInstance.get("/trips/popular");
        if (res.data.success) setTrips(res.data.trips);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <p className="text-center py-10">Loading Discover Trips...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 pt-16">
      <h1 className="text-4xl font-bold text-[#102A43] mb-10 text-center">
        🌍 Discover Popular Trips
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trips.map((item, index) => {
          const trip = item.trip;
          const image =
            trip?.places?.[0]?.image ||
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

          return (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <img src={image} alt={trip.destination} className="w-full h-64 object-cover" />
              <div className="p-5">
                <h2 className="text-2xl font-bold text-[#102A43] mb-2">{trip.destination}</h2>
                <div className="flex items-center text-gray-600 gap-3 mb-3">
                  <FiClock className="text-[#3FC1C9]" />
                  <span>{item.count} Planned Trips</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip.interests?.slice(0, 3).map((tag:any, i:any) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-[#3FC1C9]/20 to-[#72EFDD]/20 text-[#1B998B] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* <Link
                   to={`/trip/${trip._id}`}
                  className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] px-4 py-2 rounded-xl font-medium hover:scale-105 transition"
                >
                  <FiMapPin /> Explore <FiArrowRight />
                </Link> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
