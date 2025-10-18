import Place from "../models/Place.js";
import Trip from "../models/Trip.js";

export const addPlace = async (req, res) => {
  const place = new Place({ ...req.body, trip: req.params.tripId });
  await place.save();

  const trip = await Trip.findById(req.params.tripId);
  trip.places.push(place._id);
  await trip.save();

  res.json(place);
};

export const deletePlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  const trip = await Trip.findById(place.trip);
  trip.places = trip.places.filter(p => p.toString() !== req.params.id);
  await trip.save();
  await place.remove();

  res.json({ message: "Place deleted" });
};
