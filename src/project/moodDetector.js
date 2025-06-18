// moodDetector.js
const videoElement = document.getElementById('webcam');

export async function startWebcam() {
  const video = document.getElementById('webcam');
  if (!video) {
    console.warn('Webcam element not found!');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing webcam:', err);
    alert('Unable to access webcam: ' + err.message);
  }
}


// Take snapshot from video and convert to base64
export function captureSnapshot() {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg');
}

// Call Azure Face API or other emotion detection service
export async function detectMood(imageBase64) {
  // Remove prefix 'data:image/jpeg;base64,'
  const base64Data = imageBase64.split(',')[1];

  // Your Azure Face API details
  const endpoint = 'YOUR_AZURE_FACE_API_ENDPOINT';
  const subscriptionKey = 'YOUR_AZURE_SUBSCRIPTION_KEY';

  const response = await fetch(endpoint + '/face/v1.0/detect?returnFaceAttributes=emotion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)),
  });

  if (!response.ok) {
    throw new Error('Emotion detection failed');
  }

  const faces = await response.json();

  if (faces.length === 0) return 'neutral';

  // Find emotion with highest confidence
  const emotions = faces[0].faceAttributes.emotion;
  let detectedMood = 'neutral';
  let maxScore = 0;
  for (const [emotion, score] of Object.entries(emotions)) {
    if (score > maxScore) {
      maxScore = score;
      detectedMood = emotion;
    }
  }

  return detectMood;
}
