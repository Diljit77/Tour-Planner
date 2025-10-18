import { useEffect, useState, type ReactNode } from "react";
import { useItineraryStore } from "../store/itineraryStore";
import {
  FiTrash2,
  FiMapPin,
  FiCoffee,
  FiHome,
  FiShoppingBag,
  FiStar,
  FiMap,
} from "react-icons/fi";
import { fetchWeather } from "../utils/weather";

const typeIcons: Record<string, ReactNode> = {
  Restaurant: <FiCoffee className="text-teal-500 w-6 h-6" />,
  Village: <FiHome className="text-teal-500 w-6 h-6" />,
  Shopping: <FiShoppingBag className="text-teal-500 w-6 h-6" />,
  Landmark: <FiMapPin className="text-teal-500 w-6 h-6" />,
  Other: <FiStar className="text-teal-500 w-6 h-6" />,
};

export default function TripDetail() {
  const { itinerary, destination, setItinerary } = useItineraryStore();
  const [weather, setWeather] = useState<
    { temp: number; description: string; icon: string }[]
  >([]);

  useEffect(() => {
    if (destination) {
      fetchWeather(destination)
        .then(setWeather)
        .catch(console.error);
    }
  }, [destination]);
  if (!itinerary || !itinerary.length)
    return (
      <div className="text-center py-20 text-slate-700">
        No itinerary found
      </div>
    );


  const handleDeletePlace = (dayIndex: number, placeIndex: number) => {
    const newItinerary = itinerary.map((day, idx) =>
      idx === dayIndex
        ? {
            ...day,
            activities: day.activities.filter((_, i) => i !== placeIndex),
          }
        : day
    );
    setItinerary(destination!, newItinerary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-white to-[#F1F8E9] px-4 md:px-6 py-10 pt-20">
    
      <div className="text-center mb-12 px-2 md:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B998B] drop-shadow-sm animate-fadeIn">
          {destination} – Your AI Itinerary
        </h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg animate-fadeIn delay-100">
          Explore your journey step-by-step 🗺️
        </p>
      </div>

     
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-20">
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-8 md:space-y-10 relative">
        
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3FC1C9] animate-fadeIn">
                 {day.title}
              </h2>
                {weather[dayIndex] && (
    <div className="flex items-center justify-center gap-2 mt-2">
      <img
        src={weather[dayIndex].icon}
        alt={weather[dayIndex].description}
        className="w-6 h-6"
      />
      <span className="text-sm font-semibold text-teal-600">
        {weather[dayIndex].temp}°C | {weather[dayIndex].description}
      </span>
    </div>
  )}
              <div className="h-1 w-20 sm:w-24 bg-[#3FC1C9] mx-auto mt-3 rounded-full animate-pulse"></div>
            </div>

         
            <div className="relative border-l-4 border-dashed border-teal-300 pl-10 sm:pl-14 space-y-12 sm:space-y-16">
              {day.activities.map((act, actIndex) => (
                <div key={actIndex} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                 
                  <div className="absolute -left-0 sm:-left-23 top-0 sm:top-1/2 sm:-translate-y-1/2 z-20">
                    <div className="relative w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] 
                        flex items-center justify-center text-white font-bold shadow-[0_0_20px_5px_rgba(20,184,166,0.6)] animate-pulse">
                      <span className="text-xs sm:text-sm text-center whitespace-nowrap">
                        {act.time || "N/A"}
                      </span>
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
                            <p className="text-sm sm:text-base font-medium text-[#3FC1C9]">
                              {act.type}
                            </p>
                            <p className="text-gray-700 mt-2 text-sm sm:text-sm leading-relaxed">
                              {act.description}
                            </p>

                 
                            <div className="flex items-center gap-2 mt-2">
                              <FiMap
                                className="text-teal-500 w-5 h-5 cursor-pointer hover:text-teal-600 transition"
                                title="View on Map"
                                onClick={() => {
                                  const query = encodeURIComponent(act.place);
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
                                }}
                              />
                              <span
                                className="text-sm text-teal-600 cursor-pointer"
                                onClick={() => {
                                  const query = encodeURIComponent(act.place);
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
                                }}
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

                
                  {actIndex !== day.activities.length - 1 && (
                    <div className="absolute left-0 sm:left-0 top-full flex justify-center w-8 text-teal-400 animate-bounce-slow">
                
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
