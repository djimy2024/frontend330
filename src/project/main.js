// src/project/main.js
import { initAuth, getAccessToken } from './auth.js';
import { detectMoodFromWebcam } from './moodDetector.js';
import { getSelectedMood } from './moodSelector.js';
import { generatePlaylist } from './playlistGenerator.js';
import { displayPlaylist, showMood } from './display.js';

// Initialize Spotify auth
initAuth();

// Webcam mood detection
document.getElementById('detect-mood').addEventListener('click', async () => {
  const mood = await detectMoodFromWebcam();
  showMood(mood);
  const token = getAccessToken();
  if (!token) {
    alert('You must log in with Spotify first.');
    return;
  }
  const playlist = await generatePlaylist(mood, token);
  displayPlaylist(playlist);
});

// Manual mood selection
document.getElementById('generate-playlist').addEventListener('click', async () => {
  const mood = getSelectedMood();
  showMood(mood);
  const token = getAccessToken();
  if (!token) {
    alert('You must log in with Spotify first.');
    return;
  }
  const playlist = await generatePlaylist(mood, token);
  displayPlaylist(playlist);
});
