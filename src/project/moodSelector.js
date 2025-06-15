// moodSelector.js
export function setupMoodSelector(onMoodSelected) {
  const selector = document.getElementById("moodSelector");
  const moods = ["happy", "sad", "angry", "neutral", "surprised", "fearful", "disgusted", "contempt"];

  moods.forEach(mood => {
    const btn = document.createElement("button");
    btn.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
    btn.className = "mood-btn";
    btn.addEventListener("click", () => {
      onMoodSelected(mood);
    });
    selector.appendChild(btn);
  });
}
