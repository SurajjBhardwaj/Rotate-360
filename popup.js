document.getElementById("rotateBtn").addEventListener("click", async () => {
  let angle = parseInt(document.getElementById("angleInput").value) || 0;
  let videoIndex = parseInt(document.getElementById("videoSelect").value) || 0;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (angle, videoIndex) => {
      let videos = document.querySelectorAll("video");
      if (videos.length > 0 && videos[videoIndex]) {
        let video = videos[videoIndex];
        video.style.transform = `rotate(${angle}deg)`;
        video.style.transition = "transform 0.3s ease-in-out";
        localStorage.setItem("videoRotation" + videoIndex, angle);
      } else {
        alert("No video found.");
      }
    },
    args: [angle, videoIndex],
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        let videos = document.querySelectorAll("video");
        let names = [];

        videos.forEach((video) => {
          let nameElement = video.closest(
            "[data-self-name], [role='listitem']"
          ); // Find closest element containing name
          let name = "Unknown";

          if (nameElement) {
            let textElement = nameElement.querySelector(
              "[data-self-name], .YTbUzc, .zWGUib"
            ); // Common name elements
            if (textElement) {
              name = textElement.innerText.trim();
            }
          }

          names.push(name);
        });

        return names;
      },
    },
    (results) => {
      let names = results[0]?.result || [];
      let videoSelect = document.getElementById("videoSelect");
      videoSelect.innerHTML = ""; // Clear existing options

      names.forEach((name, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = name;
        videoSelect.appendChild(option);
      });
    }
  );
});
