export async function detectMoodFromWebcam() {
  const video = document.getElementById('webcam');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const imageData = canvas.toDataURL('image/jpeg');
  console.log("Detecting mood...");

  const response = await fetch('https://<your-region>.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion', {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': 'YOUR_AZURE_KEY',
      'Content-Type': 'application/octet-stream'
    },
    body: dataURItoBlob(imageData)
  });

  const result = await response.json();
  const emotions = result[0]?.faceAttributes?.emotion || {};
  const mood = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
  return mood;
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
