// moodSelector.js

export async function populateMoodSelector() {
  const selector = document.getElementById('manualMoodSelector');
  if (!selector) return;

  try {
    const response = await fetch('./data/moodMap.json');
    if (!response.ok) throw new Error('Could not load mood map');
    const moodMap = await response.json();

    selector.innerHTML = '';
    for (const mood in moodMap) {
      const option = document.createElement('option');
      option.value = mood;
      option.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
      selector.appendChild(option);
    }
  } catch (err) {
    console.error('Error populating mood selector:', err);
  }
}

export function getSelectedMood() {
  const selector = document.getElementById('manualMoodSelector');
  return selector ? selector.value : null;
}

async function loadMoodMap() {
  const response = await fetch('./data/moodMap.json');
  if (!response.ok) throw new Error('Failed to load moodMap.json');
  const moodMap = await response.json();
  return moodMap;
}

async function init() {
  try {
    const moodMap = await loadMoodMap();
    console.log('Mood Map:', moodMap);
      } catch (error) {
    console.error(error);
  }
}

init();
