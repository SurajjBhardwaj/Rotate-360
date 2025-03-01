# Meet Video Rotator

## Overview

Meet Video Rotator is a Chrome extension that allows you to rotate Google Meet video streams to any angle (0°-360°). This can be particularly useful if you need to adjust the orientation of a video feed during a meeting.

## Features

- Rotate video streams by 90°, 180°, or a custom angle.
- Select specific video streams to rotate.
- Keeps track of the rotated angles for each video stream.

## Setup

1. Clone or download the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory where it is located.
5. The extension should now be loaded and visible in your Chrome extensions.
6. You can pin it if you want.

## Usage

1. Open Google Meet and join a meeting.
2. Click on the Meet Video Rotator extension icon in the Chrome toolbar.
3. In the popup window, select the video stream you want to rotate from the dropdown menu.
4. Use the provided buttons to rotate the video by 90°, 180°, or a custom angle.
5. The video stream will be rotated accordingly, and the rotation state will be saved.

## Where It Is Helpful

- Adjusting the orientation of video feeds during a meeting.
- Correcting video streams that are displayed upside down or sideways.
- Enhancing the viewing experience by aligning video feeds properly.

## Files

- `manifest.json`: The manifest file that defines the extension.
- `popup.html`: The HTML file for the extension's popup window.
- `popup.js`: The JavaScript file that handles the logic for rotating video streams.
- `content.js`: The content script that applies the rotation to video streams.
- `background.js`: The background script that manages the extension's background tasks.

## Permissions

The extension requires the following permissions:

- `activeTab`: To access the active tab and manipulate its content.
- `scripting`: To execute scripts in the context of the active tab.
- `storage`: To store the rotation state of video streams.
- `host_permissions`: To access Google Meet URLs.

## Feedback

If you like this extension, please give this project a star!
