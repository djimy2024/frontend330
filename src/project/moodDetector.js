const video = document.createElement('video');
video.autoplay = true;
video.playsInline = true;

const canvas = document.createElement('canvas');

export async function initCamera(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    container.innerHTML = ''; 
    container.appendChild(video);
  } catch (err) {
    console.error('Kamera pa disponib:', err);
    container.innerHTML = '<p>Kamera pa disponib. Tanpri bay aksè.</p>';
  }
}

export async function detectMood() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

  const apiKey = 'YOUR_AZURE_FACE_API_KEY';
  const endpoint = 'YOUR_AZURE_ENDPOINT';

  const response = await fetch(`${endpoint}/face/v1.0/detect?returnFaceAttributes=emotion`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/octet-stream'
    },
    body: imageBlob
  });

  const result = await response.json();
  if (!result.length) return 'neutral';

  const emotions = result[0].faceAttributes.emotion;
  const sorted = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}
