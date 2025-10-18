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
    Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
  );

  const interestsText = interests.length ? interests.join(", ") : "general tourism";

const prompt = `
You are a highly experienced travel planner AI.
Generate a strictly valid JSON itinerary ONLY, do NOT include any text outside JSON.
Create a ${daysCount}-day travel plan for ${destination} from ${startDate} to ${endDate}.
Focus on user interests: ${interestsText}.

Important rules:
- All activities MUST be located in ${destination}. 
- Do not invent places outside ${destination}.
- Each activity must include:
  - "time" (e.g., "9:00 AM")
  - "place" (must be an actual location in ${destination})
  - "type" (Restaurant, Temple, Museum, Park, etc.)
  - "description" (1-2 sentences)
  - "budget" (estimated cost, e.g., "INR 200–500 per person" or "Entry: 10Rs", or "Free")
  - "link" (optional, official website or Google Maps URL if known)
- Do NOT include any extra objects or brackets.
- Return strictly valid JSON in this format:

[
  {
    "day": 1,
    "title": "Day 1 - Short title",
    "activities": [
      { 
        "time": "9:00 AM", 
        "place": "Actual Place in ${destination}", 
        "type": "Museum", 
        "description": "Brief info...", 
        "budget": "Entry: $10", 
        "link": "https://example.com"
      }
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

    let itinerary = JSON.parse(jsonString);

    // 2️⃣ Ensure every activity place includes destination
    for (const day of itinerary) {
      for (const activity of day.activities) {
        if (!activity.place.includes(destination)) {
          activity.place = `${activity.place}, ${destination}`;
        }
      }
    }

    // 3️⃣ Fetch images from Wikipedia for each activity
    for (const day of itinerary) {
      for (const activity of day.activities) {
        const image = await getWikipediaImage(activity.place);
        activity.image =
          image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
      }
    }

    // 4️⃣ Return final itinerary with images
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
