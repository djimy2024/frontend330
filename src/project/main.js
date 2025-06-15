import { setupMoodButtons } from './moodSelector.js';
import { detectMoodFromWebcam } from './moodDetector.js';
import { generatePlaylistForMood } from './playlistGenerator.js';
import { displayMood, displayPlaylist, showLoader, hideLoader } from './display.js';
import { getAccessToken } from './auth.js';

const webcamBtn = document.getElementById('detect-mood-btn');
const manualMoodContainerId = 'manual-mood';
const moodDisplayId = 'detected-mood';
const playlistContainerId = 'playlist';

function handleMood(mood) {
  displayMood(mood, moodDisplayId);
  showLoader();
  getAccessToken().then(token => {
    generatePlaylistForMood(mood, token).then(tracks => {
      hideLoader();
      displayPlaylist(tracks, playlistContainerId);
    }).catch(err => {
      hideLoader();
      console.error('Playlist generation error:', err);
    });
  });
}

setupMoodButtons(manualMoodContainerId, handleMood);

if (webcamBtn) {
  webcamBtn.addEventListener('click', () => {
    showLoader();
    detectMoodFromWebcam().then(mood => {
      handleMood(mood);
    }).catch(err => {
      hideLoader();
      alert('Webcam error or mood could not be detected.');
      console.error(err);
    });
  });
}
