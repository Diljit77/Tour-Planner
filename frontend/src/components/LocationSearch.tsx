import { useState, useEffect } from 'react';

interface Location {
  name: string;
  lat: string;
  lon: string;
}

export default function LocationSearch({ onSelect }: { onSelect: (loc: Location) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            query
          )}&addressdetails=1&limit=5`,
          { headers: { 'User-Agent': 'WanderAI/1.0 (your@email.com)' } }
        );
        const data = await res.json();
        setResults(
          data.map((item: any) => ({
            name: item.display_name,
            lat: item.lat,
            lon: item.lon,
          }))
        );
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (loc: Location) => {
    setQuery(loc.name);
    setShowDropdown(false);
    onSelect(loc);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a city or village"
        className="pl-10 w-full p-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-[#102A43]"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white rounded-xl shadow-md max-h-60 overflow-auto mt-1">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-[#3FC1C9]/20 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
