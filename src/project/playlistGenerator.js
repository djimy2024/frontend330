import moodMap from './data/moodMap.json';

export async function generatePlaylist(mood, token) {
  const genres = moodMap[mood] || ['pop'];
  console.log("Using token:", token);
  console.log("Genres:", genres);
  const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(',')}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Spotify API Error:", error);
  }

  const data = await response.json();
  return data.tracks;
}
