const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-btn");
const nextBtn = document.getElementById("next-btn");
const overlay = document.getElementById("overlay");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("preview-img");
const stepTitle = document.getElementById("step-title");
const stepDesc = document.getElementById("step-description");

const steps = [
  { title: "Foto 1 di 6", desc: "Inquadra il piede sinistro lateralmente", overlay: "overlay-laterale-sx.svg" },
  { title: "Foto 2 di 6", desc: "Inquadra il piede destro lateralmente", overlay: "overlay-laterale-dx.svg" },
  { title: "Foto 3 di 6", desc: "Inquadra il piede sinistro dall’alto", overlay: "overlay-alto-sx.svg" },
  { title: "Foto 4 di 6", desc: "Inquadra il piede destro dall’alto", overlay: "overlay-alto-dx.svg" },
  { title: "Foto 5 di 6", desc: "Inquadra entrambi i piedi frontalmente", overlay: "overlay-fronte.svg" },
  { title: "Foto 6 di 6", desc: "Inquadra entrambi i piedi da dietro", overlay: "overlay-retro.svg" },
];

let currentStep = 0;
const capturedImages = [];

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
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0);
  const imageDataUrl = canvas.toDataURL("image/jpeg");
  capturedImages.push(imageDataUrl);
  previewImg.src = imageDataUrl;
  preview.style.display = "block";
  captureBtn.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentStep++;
  if (currentStep < steps.length) {
    stepTitle.textContent = steps[currentStep].title;
    stepDesc.textContent = steps[currentStep].desc;
    overlay.src = steps[currentStep].overlay;
    preview.style.display = "none";
    captureBtn.style.display = "block";
  } else {
    alert("Hai completato tutte le foto!");
    // Qui si potrebbe passare a una pagina di review o invio immagini
  }
});

startCamera();
