import moodMap from './data/moodMap.json';

export async function generatePlaylist(mood, token) {
  const genres = moodMap[mood] || ['pop'];
  const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(',')}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.tracks;
}
