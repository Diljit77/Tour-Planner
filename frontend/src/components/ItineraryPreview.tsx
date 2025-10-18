export default function ItineraryPreview({ plan }: { plan?: any }) {
  if (!plan)
    return (
      <div className="text-center text-[#102A43]/70 py-8 italic">
        No plan yet — generate one to see it here.
      </div>
    );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#102A43]">
        Itinerary for {plan.destination} — {plan.days} day(s)
      </h3>
      <div className="grid gap-4">
        {plan.itinerary.map((d: any) => (
          <div
            key={d.day}
            className="bg-white/20 backdrop-blur-md rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
          >
            <div className="font-medium text-[#3FC1C9]">Day {d.day} — {d.date}</div>
            <div className="mt-2 space-y-1 text-[#102A43]">
              {d.activities.map((a: any, i: number) => (
                <div key={i}>
                  <strong>{a.time}:</strong> {a.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
