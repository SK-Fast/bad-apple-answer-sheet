<div align="center">

![answersheet](./thumb.png)

## bad apple, but on answer sheet
*seriously?*
<hr/>
</div>

From this [video](https://youtu.be/FatVbGjDuHg). This is a NodeJS program that turn bad apple into answer sheet frame by frame.

### Programs Required
- nodejs and npm
- ffmpeg

### Running the program
You can simply run the `do.sh` or `do.bat` if you're on Windows.

### How it works
You can simply run the `do.sh` or `do.bat` if you're on Windows.

```mermaid
graph LR
A[Extract badapple.mp4 to frames]--> B[Rescale all images by 20x27]--> C[Rescale all images by 20x27]--> D[Apply to the SVG and render]--> E[Create a slideshow of all frames by 30 FPS]
```