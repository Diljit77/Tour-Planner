import Trip from "../models/Trip.js";
export const getPopularTrips = async (req, res) => {
  try {
    const popularTrips = await Trip.aggregate([
      {
        $group: {
          _id: "$destination", // 
          count: { $sum: 1 }, 
          exampleTrip: { $first: "$$ROOT" } 
        }
      },
      { $sort: { count: -1 } }, 
      { $limit: 3 }, 
    ]);

  
    const trips = await Promise.all(
      popularTrips.map(async (t) => {
        const trip = await Trip.findById(t.exampleTrip._id).populate("places");
        return {
          destination: t._id,
          count: t.count,
          trip,
        };
      })
    );
console.log("Popular trips fetched:", trips);
    res.json({ success: true, trips });
  } catch (err) {
    console.error("Error fetching popular trips:", err);
    res.status(500).json({ success: false, message: "Failed to fetch popular trips" });
  }
};
