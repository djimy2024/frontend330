// moodSelector.js

import { detectMood } from './moodDetector.js';
import { generatePlaylist } from './playlistGenerator.js';
import { showMood, showTracks, showError } from './display.js';

const moodButtons = document.querySelectorAll('.mood-btn');

moodButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const selectedMood = button.dataset.mood;
    try {
      showMood(selectedMood);
      const tracks = await generatePlaylist(selectedMood);
      showTracks(tracks);
    } catch (error) {
      showError('Failed to generate playlist. Try again later.');
      console.error(error);
    }
  });
});
