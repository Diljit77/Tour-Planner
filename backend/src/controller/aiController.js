import { generateItinerary } from "../utils/ai.js";

export const generateAIItinerary = async (req, res) => {
  const { destination, startDate, endDate, interests } = req.body;
  try {
    console.log("Generating itinerary for:", { destination, startDate, endDate, interests });
    const itinerary = await generateItinerary({ destination, startDate, endDate, interests });
return res.status(200).json({itinerary,success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI generation failed" });
  }
};
