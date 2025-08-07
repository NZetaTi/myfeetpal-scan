const steps = [
  { title: "Foto 1 di 6", desc: "Inquadra il lato interno del piede sinistro", overlay: "overlay-1.svg" },
  { title: "Foto 2 di 6", desc: "Inquadra il lato esterno del piede sinistro", overlay: "overlay-2.svg" },
  { title: "Foto 3 di 6", desc: "Inquadra il piede sinistro dall’alto", overlay: "overlay-3.svg" },
  { title: "Foto 4 di 6", desc: "Inquadra il lato interno del piede destro", overlay: "overlay-4.svg" },
  { title: "Foto 5 di 6", desc: "Inquadra il lato esterno del piede destro", overlay: "overlay-5.svg" },
  { title: "Foto 6 di 6", desc: "Inquadra il piede destro dall’alto", overlay: "overlay-6.svg" }
];

let currentStep = 0;
const capturedImages = [];

const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const nextBtn = document.getElementById("next-btn");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("preview-img");
const stepTitle = document.getElementById("step-title");
const stepDesc = document.getElementById("step-description");
const overlay = document.getElementById("overlay");
const finish = document.getElementById("finish");
const downloadBtn = document.getElementById("download-btn");
const shareBtn = document.getElementById("share-btn");

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
    audio: false
  });
  video.srcObject = stream;
}

captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
  const imageData = canvas.toDataURL("image/jpeg");
  capturedImages.push(imageData);
  previewImg.src = imageData;
  preview.style.display = "block";
  captureBtn.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  preview.style.display = "none";
  captureBtn.style.display = "block";
  currentStep++;
  if (currentStep < steps.length) {
    updateStep();
  } else {
    finish.style.display = "block";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("camera-container").style.display = "none";
  }
});

function updateStep() {
  stepTitle.textContent = steps[currentStep].title;
  stepDesc.textContent = steps[currentStep].desc;
  overlay.src = steps[currentStep].overlay;
}

downloadBtn.addEventListener("click", () => {
  capturedImages.forEach((dataUrl, index) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `foto-${index + 1}.jpg`;
    a.click();
  });
});

shareBtn.addEventListener("click", async () => {
  if (navigator.share && capturedImages.length) {
    const blob = await (await fetch(capturedImages[0])).blob();
    const file = new File([blob], "foto-piede.jpg", { type: "image/jpeg" });
    try {
      await navigator.share({
        files: [file],
        title: "Foto piede",
        text: "Ecco una foto del piede per MyFeetPal"
      });
    } catch (err) {
      alert("Condivisione annullata o non supportata.");
    }
  } else {
    alert("Il tuo browser non supporta la condivisione nativa.");
  }
});

startCamera();
updateStep();
