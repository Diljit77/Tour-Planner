import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  interests: [String],
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }]
});

export default mongoose.model("Trip", tripSchema);
