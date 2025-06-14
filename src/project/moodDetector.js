export async function detectMoodFromWebcam() {
  const video = document.getElementById('webcam');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      try {
        console.log("Detecting mood...");
        const response = await fetch('https://eastus.api.cognitiveservices.azure.com/face/v1.0/detect?returnFaceAttributes=emotion', {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': '4394574b-bd33-4283-81dc-d6f9ca4a41f3',
            'Content-Type': 'application/octet-stream'
          },
          body: blob
        });

        const result = await response.json();

        if (!result || result.length === 0) {
          alert("No face detected. Please ensure your face is visible in the camera.");
          return resolve("neutral");
        }

        const emotions = result[0].faceAttributes.emotion;
        const mood = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
        resolve(mood);

      } catch (err) {
        console.error("Mood detection error:", err);
        alert("Error detecting mood.");
        resolve("neutral");
      }
    }, 'image/jpeg');
  });
}
