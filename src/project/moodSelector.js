// moodSelector.js
import moodMap from './data/moodMap.json' assert { type: 'json' };

const manualMoodSelector = document.getElementById('manualMoodSelector');

export function populateMoodSelector() {
  manualMoodSelector.innerHTML = '';
  for (const mood in moodMap) {
    const option = document.createElement('option');
    option.value = mood;
    option.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
    manualMoodSelector.appendChild(option);
  }
}

export function getSelectedMood() {
  return manualMoodSelector.value;
}
