import { login, getAccessToken, fetchAccessToken } from './auth.js';
import { startWebcam, captureSnapshot, detectMood } from './moodDetector.js';
import { populateMoodSelector, getSelectedMood } from './moodSelector.js';
import { generatePlaylist } from './playlistGenerator.js';
import { displayMood, displayPlaylist } from './display.js';

const moodLoader = document.getElementById('moodLoader');
const playlistLoader = document.getElementById('playlistLoader');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const captureMoodBtn = document.getElementById('captureMoodBtn');
const generatePlaylistBtn = document.getElementById('generatePlaylistBtn');

// Handle redirect from Spotify login
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

// Event listeners
loginBtn.addEventListener('click', () => login());

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  window.location.href = window.location.pathname; // clean reload
});

captureMoodBtn.addEventListener('click', async () => {
  try {
    moodLoader.style.display = 'block';
    const snapshot = captureSnapshot();
    const mood = await detectMood(snapshot);
    displayMood(mood);
  } catch (err) {
    alert('Mood detection failed: ' + err.message);
  } finally {
    moodLoader.style.display = 'none';
  }
});

generatePlaylistBtn.addEventListener('click', async () => {
  const mood = getSelectedMood();
  try {
    playlistLoader.style.display = 'block';
    const tracks = await generatePlaylist(mood);
    displayPlaylist(tracks);
  } catch (err) {
    alert('Playlist generation failed: ' + err.message);
  } finally {
    playlistLoader.style.display = 'none';
  }
});

// Initialize app
async function init() {
  await handleAuthRedirect();

  const token = getAccessToken();
  if (token) {
    console.log('✅ Access token detected');
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    startWebcam();
    populateMoodSelector();
  } else {
    console.warn('🚫 No access token found');
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

init();
