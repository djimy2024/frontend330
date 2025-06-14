import { fetchAccessToken, getAccessToken, initButtons } from './auth.js';
import { detectMoodFromWebcam } from './moodDetector.js';
import { getSelectedMood } from './moodSelector.js';
import { generatePlaylist } from './playlistGenerator.js';
import { displayPlaylist, showMood } from './display.js';

await fetchAccessToken();
initButtons();

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById('webcam').srcObject = stream;
  })
  .catch(err => {
    console.error("Webcam error:", err);
  });

document.getElementById('detect-mood').addEventListener('click', async () => {
  const mood = await detectMoodFromWebcam();
  showMood(mood);
  const token = getAccessToken();
  if (!token) return alert('Login with Spotify first.');
  const playlist = await generatePlaylist(mood, token);
  displayPlaylist(playlist);
});

document.getElementById('generate-playlist').addEventListener('click', async () => {
  const mood = getSelectedMood();
  showMood(mood);
  const token = getAccessToken();
  if (!token) return alert('Login with Spotify first.');
  const playlist = await generatePlaylist(mood, token);
  displayPlaylist(playlist);
});