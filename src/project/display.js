export function showMood(mood) {
  const moodDisplay = document.getElementById('detected-mood');
  moodDisplay.textContent = `Mood: ${mood}`;
  moodDisplay.className = ''; 
  moodDisplay.classList.add(`mood-${mood}`); 
}


export function displayPlaylist(tracks) {
  const container = document.getElementById('playlist');
  container.innerHTML = '';
  tracks.forEach(track => {
    const div = document.createElement('div');
    div.className = 'track';
    div.innerHTML = `
      <img src="${track.album.images[0].url}" alt="${track.name}" />
      <p>${track.name} - ${track.artists[0].name}</p>
    `;
    container.appendChild(div);
  });
}
