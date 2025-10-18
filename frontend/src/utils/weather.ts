export async function fetchWeather(city: string, country?: string) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey) throw new Error("Missing API key");

  const location = country ? `${city},${country}` : city;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      location
    )}&units=metric&appid=${apiKey}`
  );

  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  // process 3-hourly data into daily averages
  const dailyWeather: any[] = [];
  const daysMap: Record<string, any[]> = {};

  data.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
    if (!daysMap[date]) daysMap[date] = [];
    daysMap[date].push(item);
  });

  Object.keys(daysMap).forEach((date) => {
    const temps = daysMap[date].map((d) => d.main.temp);
    const weather = daysMap[date][0].weather[0]; // first item
    dailyWeather.push({
      date,
      temp: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length),
      description: weather.main,
      icon: `https://openweathermap.org/img/wn/${weather.icon}.png`,
    });
  });

  return dailyWeather;
}

