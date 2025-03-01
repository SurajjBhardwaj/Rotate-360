document.getElementById("rotateBtn").addEventListener("click", async () => {
  let angle = parseInt(document.getElementById("angleInput").value) || 0;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (angle) => {
      let video = document.querySelector("video");
      if (video) {
        video.style.transform = `rotate(${angle}deg)`;
        video.style.transition = "transform 0.3s ease-in-out";
        localStorage.setItem("videoRotation", angle);
      } else {
        alert("No video found.");
      }
    },
    args: [angle],
  });
});
