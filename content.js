(function () {
  let video = document.querySelector("video");

  if (!video) {
    alert("No video found on this page.");
    return;
  }

  let angle = parseFloat(localStorage.getItem("videoRotation")) || 0;

  angle = (angle + 90) % 360; // Change this value as needed
  video.style.transform = `rotate(${angle}deg)`;
  video.style.transition = "transform 0.3s ease-in-out";

  localStorage.setItem("videoRotation", angle);
})();
