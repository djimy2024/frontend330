// playlistGenerator.js

import { getAccessToken } from './auth.js';
import moodMap from './data/moodMap.json';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export async function generatePlaylist(mood) {
  const genres = moodMap[mood] || ['pop'];
  const accessToken = getAccessToken();

  const seedGenres = genres.slice(0, 2).join(','); 
  const limit = 10;

  const url = `${SPOTIFY_BASE_URL}/recommendations?limit=${limit}&seed_genres=${seedGenres}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlist');
  }

  const data = await response.json();
  return data.tracks.map(track => ({
    name: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    albumArt: track.album.images[0]?.url,
    previewUrl: track.preview_url,
  }));
}
