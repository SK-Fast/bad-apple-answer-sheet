#!/usr/bin/bash
mkdir frames
mkdir process-temp
mkdir render-frames

npm install
ffmpeg -i "./badapple.mp4" "./frames/f-%d.png"
node index.js
ffmpeg -framerate 30 -start_number 1 -i ./render-frames/f-%d.png ./output.mp4
echo the whole thing completed