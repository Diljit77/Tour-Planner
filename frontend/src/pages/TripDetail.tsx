import { useState, type ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItineraryStore } from "../store/itineraryStore";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiMapPin,
  FiCoffee,
  FiHome,
  FiShoppingBag,
  FiStar,
  FiMap,
} from "react-icons/fi";

const typeIcons: Record<string, ReactNode> = {
  Restaurant: <FiCoffee className="text-teal-500 w-6 h-6" />,
  Village: <FiHome className="text-teal-500 w-6 h-6" />,
  Shopping: <FiShoppingBag className="text-teal-500 w-6 h-6" />,
  Landmark: <FiMapPin className="text-teal-500 w-6 h-6" />,
  Other: <FiStar className="text-teal-500 w-6 h-6" />,
};

export default function TripDetail() {
  const { id } = useParams(); // ✅ detect if viewing saved trip
  const itinerary = useItineraryStore((state) => state.itinerary);
  const destination = useItineraryStore((state) => state.destination);
  const setItinerary = useItineraryStore((state) => state.setItinerary);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // If trip has an ID from backend, mark as already saved
  useEffect(() => {
    if (id) setSaved(true);
  }, [id]);

  if (!itinerary || !destination) {
    return <div className="text-center py-20 text-slate-700">No itinerary found</div>;
  }

  const handleDeletePlace = (dayIndex: number, placeIndex: number) => {
    if (!destination) return;
    const newItinerary = itinerary.map((day, idx) =>
      idx === dayIndex
        ? { ...day, activities: day.activities.filter((_, i) => i !== placeIndex) }
        : day
    );
    setItinerary(destination, newItinerary);
  };

  const handleSaveTrip = async () => {
    if (!user || !token) {
      toast.info("Please login to save your trip!");
      return;
    }

    if (!itinerary || !itinerary.length) return;

    setSaving(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (itinerary.length - 1));

      const tripData = {
        name: `${destination} Trip - ${startDate.toLocaleDateString()}`,
        destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        interests: [],
        itinerary,
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/trips/save`, tripData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Trip saved successfully!");
      setSaved(true); // ✅ now mark as saved
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save trip");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-white to-[#F1F8E9] px-4 md:px-6 py-10 pt-20">
      <div className="text-center mb-8">
        {!user ? (
          <p className="text-red-500">Login to save your trip!</p>
        ) : saved ? (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-2 rounded-xl shadow cursor-not-allowed"
          >
            ✅ Trip Saved
          </button>
        ) : (
          <button
            onClick={handleSaveTrip}
            disabled={saving}
            className="bg-gradient-to-r from-[#3FC1C9] to-[#72EFDD] text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
          >
            {saving ? "Saving..." : "💾 Save Trip"}
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-8 md:space-y-10 relative">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3FC1C9]">
                {day.title}
              </h2>
              <div className="h-1 w-20 sm:w-24 bg-[#3FC1C9] mx-auto mt-3 rounded-full animate-pulse"></div>
            </div>

            <div className="relative border-l-4 border-dashed border-teal-300 pl-10 sm:pl-14 space-y-12 sm:space-y-16">
              {day.activities.map((act, actIndex) => (
                <div key={actIndex} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="absolute -left-0 sm:-left-23 top-0 sm:top-1/2 sm:-translate-y-1/2 z-20">
                    <div className="relative w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white font-bold shadow-[0_0_20px_5px_rgba(20,184,166,0.6)] animate-pulse">
                      <span className="text-xs sm:text-sm text-center whitespace-nowrap">{act.time || "N/A"}</span>
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin-slow"></div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md border border-white/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full md:w-[85%] ml-0 md:ml-6">
                    <div className="flex flex-col md:flex-row">
                      {act.image && (
                        <div className="md:w-1/3 w-full h-36 sm:h-44 overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-t-none">
                          <img
                            src={act.image}
                            alt={act.place}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4 sm:p-5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-start">
                          <div className="flex-1">
                            <p className="text-base sm:text-lg font-bold text-[#1B998B] flex items-center gap-2">
                              {typeIcons[act.type] || typeIcons["Other"]}
                              {act.place}
                            </p>
                            <p className="text-sm sm:text-base font-medium text-[#3FC1C9]">{act.type}</p>
                            <p className="text-gray-700 mt-2 text-sm sm:text-sm leading-relaxed">{act.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <FiMap
                                className="text-teal-500 w-5 h-5 cursor-pointer hover:text-teal-600 transition"
                                title="View on Map"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.place)}`, "_blank")}
                              />
                              <span
                                className="text-sm text-teal-600 cursor-pointer"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.place)}`, "_blank")}
                              >
                                View Location
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-600 mt-1">
                              {act.budget ? `Budget: ${act.budget}` : "Budget: N/A"}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeletePlace(dayIndex, actIndex)}
                            className="text-red-500 hover:text-red-700 transition mt-4 md:mt-0"
                            title="Delete Place"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
