// main.js
import { login, getAccessToken, fetchAccessToken } from './auth.js';
import { startWebcam, captureSnapshot, detectMood } from './moodDetector.js';
import { populateMoodSelector, getSelectedMood } from './moodSelector.js';
import { generatePlaylist } from './playlistGenerator.js';
import { displayMood, displayPlaylist } from './display.js';

const loginBtn = document.getElementById('loginBtn');
const captureMoodBtn = document.getElementById('captureMoodBtn');
const generatePlaylistBtn = document.getElementById('generatePlaylistBtn');

async function handleAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('code')) {
    const code = params.get('code');
    try {
      await fetchAccessToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
      alert('Login successful!');
    } catch (e) {
      alert('Login failed: ' + e.message);
    }
  }
}

loginBtn.addEventListener('click', () => {
  login();
});

captureMoodBtn.addEventListener('click', async () => {
  try {
    const snapshot = captureSnapshot();
    const mood = await detectMood(snapshot);
    displayMood(mood);
  } catch (err) {
    alert('Mood detection failed: ' + err.message);
  }
});

generatePlaylistBtn.addEventListener('click', async () => {
  const mood = getSelectedMood();
  try {
    const tracks = await generatePlaylist(mood);
    displayPlaylist(tracks);
  } catch (err) {
    alert('Playlist generation failed: ' + err.message);
  }
});

async function init() {
  await handleAuthRedirect();
  if (getAccessToken()) {
    loginBtn.style.display = 'none';
  }
  startWebcam();
  populateMoodSelector();
}

init();
