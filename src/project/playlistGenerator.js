// playlistGenerator.js
import moodMap from './data/moodMap.json' assert { type: 'json' };
import { getAccessToken } from './auth.js';

export async function generatePlaylist(mood) {
  const genres = moodMap[mood] || ['pop'];

  const token = getAccessToken();
  if (!token) throw new Error('Not logged in');

  // Search for tracks by genres, limit 10 tracks
  const genreQuery = genres.map(g => `genre:"${g}"`).join(' ');
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(genreQuery)}&type=track&limit=10`;

  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Spotify search failed');
  }

  const data = await response.json();
  return data.tracks.items; // array of track objects
}
