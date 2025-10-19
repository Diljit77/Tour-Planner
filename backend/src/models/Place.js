import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  name: String,
  type: String,
  description: String,
  image: String,
  day: Number,
  time: String,
  budget: String,
  link: String,   
});

export default mongoose.model("Place", placeSchema);
