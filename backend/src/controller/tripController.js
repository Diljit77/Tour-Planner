import Trip from "../models/Trip.js";


export const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).populate("places");
  res.json(trips);
};

export const createTrip = async (req, res) => {
  const trip = new Trip({ ...req.body, user: req.user._id });
  await trip.save();
  res.json(trip);
};

export const deleteTrip = async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: "Trip deleted" });
};
