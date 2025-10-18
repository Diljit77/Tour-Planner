import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { getWikipediaImage } from "./wikipedia.js"; 

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateItinerary = async ({ destination, startDate, endDate, interests = [] }) => {
  if (!destination || !startDate || !endDate) {
    throw new Error("Destination, startDate, and endDate are required.");
  }

  const daysCount = Math.max(
    1,
    Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
  );

  const interestsText = interests.length ? interests.join(", ") : "general tourism";

  const prompt = `
You are a highly experienced travel planner AI.
Generate a strictly valid JSON itinerary ONLY, do NOT include any text outside JSON.
Create a ${daysCount}-day travel plan for ${destination} from ${startDate} to ${endDate}.
Focus on user interests: ${interestsText}.

Each day should have:
- time (e.g., "9:00 AM")
- place name
- type (Restaurant, Temple, Museum, Park, etc.)
- short description (1-2 sentences)

Return JSON strictly in this format:

[
  {
    "day": 1,
    "title": "Day 1 - Short title",
    "activities": [
      { "time": "9:00 AM", "place": "Place Name", "type": "Museum", "description": "Brief info..." }
    ]
  }
]
`;

  try {
    // 1️⃣ Call Gemini
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = result.text || "";
    text = text.replace(/```(?:json)?/g, "").trim();

    const match = text.match(/\[.*\]/s);
    if (!match) throw new Error("AI output does not contain a valid JSON array.");

    let jsonString = match[0];
    jsonString = jsonString.replace(/[“”]/g, '"');
    jsonString = jsonString.replace(/,(\s*[\]}])/g, "$1");

    const itinerary = JSON.parse(jsonString);

    // 2️⃣ Fetch images from Wikipedia for each activity
    for (const day of itinerary) {
      for (const activity of day.activities) {
        const image = await getWikipediaImage(activity.place);
        activity.image =
          image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
      }
    }

    // 3️⃣ Return final itinerary with images
    return itinerary;
  } catch (err) {
    console.error("⚠️ Gemini generation failed, using mock data:", err);
    return [
      {
        day: 1,
        title: "Error generating itinerary",
        activities: [
          {
            time: "N/A",
            place: "Please provide valid trip details.",
            type: "N/A",
            description: err.message || "Something went wrong",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
          },
        ],
      },
    ];
  }
};
