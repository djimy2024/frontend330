// display.js

const playlistContainer = document.getElementById('playlist');
const detectedMoodEl = document.getElementById('detected-mood');

export function showDetectedMood(mood) {
  detectedMoodEl.textContent = `Mood detected: ${mood}`;
  detectedMoodEl.className = ''; // clear old classes
  detectedMoodEl.classList.add(`mood-${mood}`);
}

export function showPlaylist(tracks) {
  playlistContainer.innerHTML = ''; // clear old playlist

  tracks.forEach(track => {
    const trackEl = document.createElement('div');
    trackEl.classList.add('track');

    const img = document.createElement('img');
    img.src = track.albumArt || '';
    img.alt = `${track.name} album cover`;

    const name = document.createElement('p');
    name.textContent = track.name;

    const artist = document.createElement('p');
    artist.textContent = track.artist;

    trackEl.appendChild(img);
    trackEl.appendChild(name);
    trackEl.appendChild(artist);

    // Optional: preview audio
    if (track.previewUrl) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = track.previewUrl;
      trackEl.appendChild(audio);
    }

    playlistContainer.appendChild(trackEl);
  });
}
