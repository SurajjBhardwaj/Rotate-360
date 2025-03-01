(function () {
  let videos = document.querySelectorAll("video");

  if (videos.length === 0) {
    alert("No video found on this page.");
    return;
  }

  videos.forEach((video, index) => {
    let angle = parseFloat(localStorage.getItem("videoRotation" + index)) || 0;
    video.style.transform = `rotate(${angle}deg)`;
    video.style.transition = "transform 0.3s ease-in-out";
  });
})();
