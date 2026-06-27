const BG_IMAGE_SELECTOR = ".supplier-card-image, #package-image";
const processing = new WeakSet();

function colorDistance(r, g, b, br, bg, bb) {
  return Math.hypot(r - br, g - bg, b - bb);
}

function sampleBackgroundColor(data, width, height) {
  const samples = [];
  const stepX = Math.max(1, Math.floor(width / 24));
  const stepY = Math.max(1, Math.floor(height / 24));

  for (let x = 0; x < width; x += stepX) {
    samples.push([x, 0], [x, height - 1]);
  }
  for (let y = 0; y < height; y += stepY) {
    samples.push([0, y], [width - 1, y]);
  }

  let r = 0;
  let g = 0;
  let b = 0;
  samples.forEach(([x, y]) => {
    const i = (y * width + x) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  });

  const count = samples.length;
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

function removeBackgroundFromPixels(data, width, height) {
  const bg = sampleBackgroundColor(data, width, height);
  const tolerance = 58;
  const feather = 32;
  const visited = new Uint8Array(width * height);
  const queue = [];

  const visit = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;

    const i = idx * 4;
    const dist = colorDistance(data[i], data[i + 1], data[i + 2], bg[0], bg[1], bg[2]);
    if (dist > tolerance + feather) return;

    visited[idx] = 1;
    if (dist <= tolerance) {
      data[i + 3] = 0;
    } else {
      const alpha = Math.round(((dist - tolerance) / feather) * 255);
      data[i + 3] = Math.min(data[i + 3], alpha);
    }

    queue.push(x, y);
  };

  for (let x = 0; x < width; x += 1) {
    visit(x, 0);
    visit(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    visit(0, y);
    visit(width - 1, y);
  }

  while (queue.length > 0) {
    const y = queue.pop();
    const x = queue.pop();
    visit(x + 1, y);
    visit(x - 1, y);
    visit(x, y + 1);
    visit(x, y - 1);
  }

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];
    const max = Math.max(pr, pg, pb);
    const min = Math.min(pr, pg, pb);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const brightness = (pr + pg + pb) / 3;

    if (brightness > 200 && saturation < 0.15) {
      data[i + 3] = Math.min(data[i + 3], Math.max(0, Math.round((235 - brightness) * 6)));
    }

    const dist = colorDistance(pr, pg, pb, bg[0], bg[1], bg[2]);
    if (dist < tolerance + 10) {
      data[i + 3] = Math.min(data[i + 3], Math.round((dist / (tolerance + 10)) * 80));
    }
  }
}

function processImageElement(imageElement) {
  if (!imageElement || imageElement.dataset.bgRemoved === "true" || processing.has(imageElement)) {
    return;
  }

  const source = imageElement.currentSrc || imageElement.src;
  if (!source || source.startsWith("data:")) return;

  processing.add(imageElement);

  const img = new Image();
  img.decoding = "async";

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      removeBackgroundFromPixels(frame.data, canvas.width, canvas.height);
      ctx.putImageData(frame, 0, 0);

      imageElement.src = canvas.toDataURL("image/png");
      imageElement.dataset.bgRemoved = "true";
      imageElement.classList.add("bg-removed");
    } catch (error) {
      imageElement.classList.add("bg-removal-failed");
    } finally {
      processing.delete(imageElement);
    }
  };

  img.onerror = () => {
    imageElement.classList.add("bg-removal-failed");
    processing.delete(imageElement);
  };

  img.src = source;
}

function queueImageProcessing(imageElement) {
  if (!imageElement || imageElement.dataset.bgRemoved === "true") return;

  const run = () => processImageElement(imageElement);

  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 1200 });
  } else {
    setTimeout(run, 0);
  }
}

function bindImageForBackgroundRemoval(imageElement) {
  if (!imageElement || imageElement.dataset.bgBound === "true") return;
  imageElement.dataset.bgBound = "true";

  if (imageElement.complete && imageElement.naturalWidth > 0) {
    queueImageProcessing(imageElement);
  } else {
    imageElement.addEventListener("load", () => queueImageProcessing(imageElement), { once: true });
  }
}

function initSupplierImageBackgroundRemoval(root = document) {
  root.querySelectorAll(BG_IMAGE_SELECTOR).forEach(bindImageForBackgroundRemoval);
}

let bgObserver;

function watchSupplierImages() {
  if (bgObserver) bgObserver.disconnect();

  bgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bindImageForBackgroundRemoval(entry.target);
        }
      });
    },
    { rootMargin: "120px" }
  );

  document.querySelectorAll(BG_IMAGE_SELECTOR).forEach((image) => {
    bindImageForBackgroundRemoval(image);
    bgObserver.observe(image);
  });
}

document.addEventListener("DOMContentLoaded", watchSupplierImages);
