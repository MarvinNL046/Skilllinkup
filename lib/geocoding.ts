export async function geocodeAddress(query: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { 'User-Agent': 'SkillLinkup/1.0' } }
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
  } catch {
    return null;
  }
}

// Dutch city coordinates for common cities (fallback when Nominatim is unavailable)
export const DUTCH_CITIES: Record<string, { lat: number; lon: number }> = {
  'amsterdam': { lat: 52.3676, lon: 4.9041 },
  'rotterdam': { lat: 51.9244, lon: 4.4777 },
  'den haag': { lat: 52.0705, lon: 4.3007 },
  'utrecht': { lat: 52.0907, lon: 5.1214 },
  'eindhoven': { lat: 51.4416, lon: 5.4697 },
  'groningen': { lat: 53.2194, lon: 6.5665 },
  'tilburg': { lat: 51.5555, lon: 5.0913 },
  'almere': { lat: 52.3508, lon: 5.2647 },
  'breda': { lat: 51.5719, lon: 4.7683 },
  'nijmegen': { lat: 51.8126, lon: 5.8372 },
  // Belgian cities
  'brussel': { lat: 50.8503, lon: 4.3517 },
  'antwerpen': { lat: 51.2194, lon: 4.4025 },
  'gent': { lat: 51.0543, lon: 3.7174 },
};
