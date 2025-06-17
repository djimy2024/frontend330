// display.js
const playlistElement = document.getElementById('playlist');
const detectedMoodElement = document.getElementById('detectedMood');

export function displayMood(mood) {
  detectedMoodElement.textContent = `Detected mood: ${mood}`;
  detectedMoodElement.className = `mood-${mood}`;
}

export function displayPlaylist(tracks) {
  playlistElement.innerHTML = '';
  for (const track of tracks) {
    const li = document.createElement('li');
    li.textContent = `${track.name} — ${track.artists.map(a => a.name).join(', ')}`;
    playlistElement.appendChild(li);
  }
}
