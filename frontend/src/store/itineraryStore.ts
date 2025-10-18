
import { create } from 'zustand';

interface Activity {
  time: string;
  place: string;
  type: string;
  description: string;
  image?: string;
}

interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

interface ItineraryState {
  itinerary: Day[] | null;
  destination: string | null;
  setItinerary: (destination: string, itinerary: Day[]) => void;
  clearItinerary: () => void;
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  itinerary: null,
  destination: null,
  setItinerary: (destination, itinerary) => set({ destination, itinerary }),
  clearItinerary: () => set({ destination: null, itinerary: null }),
}));
