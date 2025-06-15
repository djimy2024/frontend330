// moodDetector.js
const azureEndpoint = "https://YOUR_REGION.api.cognitive.microsoft.com/face/v1.0/detect";
const azureKey = "YOUR_AZURE_FACE_API_KEY";

export async function startWebcam(videoElement) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    await videoElement.play();
  } catch (err) {
    console.error("Webcam error:", err);
    alert("Could not access webcam");
  }
}

export async function captureSnapshot(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0);
  return canvas.toDataURL("image/jpeg");
}

export async function detectMoodFromImage(base64Image) {
  const blob = await fetch(base64Image).then(res => res.blob());

  const params = new URLSearchParams({
    returnFaceAttributes: "emotion"
  });

  const response = await fetch(`${azureEndpoint}?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": azureKey
    },
    body: await blob.arrayBuffer()
  });

  const data = await response.json();

  if (!data.length) {
    throw new Error("No face detected");
  }

  const emotions = data[0].faceAttributes.emotion;
  const topEmotion = Object.entries(emotions).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  return topEmotion;
}
