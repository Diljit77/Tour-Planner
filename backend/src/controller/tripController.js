import Trip from "../models/Trip.js";
import Place from "../models/Place.js";

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).populate("places");
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};

export const getTripById = async (req, res) => {
  const { id } = req.params;
  
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const trip = await Trip.findOne({ _id: id, user: req.user._id }).populate("places");
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trip", error: err.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete trip" });
  }
};

export const createTripWithItinerary = async (req, res) => {
  const { name, destination, startDate, endDate, interests, itinerary } = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    
    const trip = new Trip({
      user: req.user._id,
      name,
      destination,
      startDate,
      endDate,
      interests,
      plan: itinerary,
    });
    await trip.save();

  
    const placeIds = [];
    for (const day of itinerary) {
      for (const activity of day.activities) {
        const place = new Place({
          trip: trip._id,
          name: activity.place,
          type: activity.type,
          description: activity.description,
          image: activity.image,
          day: day.day,
          time: activity.time,
          budget: activity.budget,
          link: activity.link,
        });
        await place.save();
        placeIds.push(place._id);
      }
    }

    trip.places = placeIds;
    await trip.save();

    res.status(201).json({ message: "Trip saved successfully", trip });
  } catch (err) {
    console.error("Trip save error:", err);
    res.status(500).json({ message: "Failed to save trip", error: err.message });
  }
};
