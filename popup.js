document.getElementById("rotate90Btn").addEventListener("click", async () => {
  rotateVideo(90);
});

document.getElementById("rotate180Btn").addEventListener("click", async () => {
  rotateVideo(180);
});

document
  .getElementById("rotateCustomBtn")
  .addEventListener("click", async () => {
    let angle = parseInt(document.getElementById("angleInput").value) || 0;
    rotateVideo(angle);
  });

async function rotateVideo(angle) {
  let videoIndex = parseInt(document.getElementById("videoSelect").value) || 0;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (angle, videoIndex) => {
      let videos = document.querySelectorAll("video");
      if (videos.length > 0 && videos[videoIndex]) {
        let video = videos[videoIndex];
        let currentAngle =
          parseFloat(localStorage.getItem("videoRotation" + videoIndex)) || 0;
        let newAngle = (currentAngle + angle) % 360;
        video.style.transform = `rotate(${newAngle}deg)`;
        video.style.transition = "transform 0.3s ease-in-out";
        localStorage.setItem("videoRotation" + videoIndex, newAngle);
      } else {
        alert("No video found.");
      }
    },
    args: [angle, videoIndex],
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        let videos = document.querySelectorAll("video");
        let videoDetails = [];
        videos.forEach((video, index) => {
          let canvas = document.createElement("canvas");
          canvas.width = video.videoWidth / 4;
          canvas.height = video.videoHeight / 4;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          let preview = canvas.toDataURL();

          let nameElement = video.closest(
            "[data-self-name], [role='listitem']"
          );
          let name = "Unknown";
          if (nameElement) {
            let textElement = nameElement.querySelector(
              "[data-self-name], .YTbUzc, .zWGUib"
            );
            if (textElement) {
              name = textElement.innerText.trim();
            }
          }

          videoDetails.push({ preview, name });
        });
        return videoDetails;
      },
    },
    (results) => {
      let videoDetails = results[0]?.result || [];
      let videoSelect = document.getElementById("videoSelect");
      videoSelect.innerHTML = ""; // Clear existing options

      videoDetails.forEach((detail, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.innerHTML = detail.preview
          ? `<img src="${detail.preview}" alt="Video ${
              index + 1
            }" style="width: 100px; height: 75px;"> ${detail.name}`
          : `${detail.name}`;
        videoSelect.appendChild(option);
      });
    }
  );
});
