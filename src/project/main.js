// main.js
import { loginWithSpotify, getAccessToken } from "./auth.js";
import { startWebcam, captureSnapshot, detectMoodFromImage } from "./moodDetector.js";
import { loadMoodMap, getGenresForMood, searchTracks, createPlaylist } from "./playlistGenerator.js";
import { showMood, showPlaylist, showLoader, hideLoader } from "./display.js";
import { setupMoodSelector } from "./moodSelector.js";

const videoEl = document.getElementById("webcam");
const startBtn = document.getElementById("startBtn");
const loginBtn = document.getElementById("loginBtn");

document.addEventListener("DOMContentLoaded", async () => {
  await loadMoodMap();

  if (!getAccessToken()) {
    loginBtn.style.display = "block";
    startBtn.disabled = true;
  } else {
    loginBtn.style.display = "none";
    startBtn.disabled = false;
    startWebcam(videoEl);
  }
});

// Login Spotify
loginBtn.addEventListener("click", () => {
  loginWithSpotify();
});

startBtn.addEventListener("click", async () => {
  try {
    showLoader();

    const snapshot = await captureSnapshot(videoEl);
    const mood = await detectMoodFromImage(snapshot);

    showMood(mood);

    const genres = await getGenresForMood(mood);
    const tracks = await searchTracks(genres);
    const playlist = await createPlaylist(tracks, mood);

    showPlaylist(playlist, tracks);
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  } finally {
    hideLoader();
  }
});

setupMoodSelector(async (mood) => {
  try {
    showLoader();
    showMood(mood);

    const genres = await getGenresForMood(mood);
    const tracks = await searchTracks(genres);
    const playlist = await createPlaylist(tracks, mood);
    showPlaylist(playlist, tracks);
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  } finally {
    hideLoader();
  }
});