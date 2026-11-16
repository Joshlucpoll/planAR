# AR examples

This directory contains browser-based augmented reality examples built with
[AR.js](https://github.com/jeromeetienne/AR.js), jsartoolkit, and Three.js. The
examples use a webcam and pattern markers to place 3D content in the scene.

## Run the examples

Serve the directory over HTTP. The included `server.py` script configures the
JavaScript MIME type and starts a server on port `8337`.

1. From this directory, start the server:

   ```bash
   python3 server.py
   ```

2. Open [http://localhost:8337](http://localhost:8337) in a browser.
3. Allow camera access when the browser requests it.
4. Open an AR example and point the camera at its required marker.

Most marker-based examples use one of these supplied markers:

- [Hiro marker](markers/hiro.png)
- [Kanji marker](markers/kanji.png)

Print a marker or show it on a second screen. Keep it flat and well lit for
more reliable tracking.

## Examples

Open `index.html` to browse the full gallery. The collection includes:

- **Introductory AR:** cube, textures, video, shaders, 3D models, and custom
  markers.
- **Rendering techniques:** shadows, refraction, clipping planes, stencil
  buffers, and portal effects.
- **Marker interaction:** multi-marker tracking, smoothed controls, a magic
  cube, and marker-to-marker motion.
- **Three.js-only scenes:** basic scenes, water effects, keyboard movement,
  and camera controls.

Start with `hello-cube.html`. It shows a transparent cube above the Hiro
marker and demonstrates the standard AR toolkit setup.

## Project structure

- `index.html` contains the example gallery.
- `*.html` files contain self-contained demos.
- `js/` contains Three.js and supporting JavaScript files.
- `jsartoolkit5/` contains the ARToolKit runtime.
- `threex/` contains Three.js AR integration helpers.
- `data/` contains camera calibration data and marker pattern files.
- `markers/` contains printable marker images.
- `images/`, `models/`, and `video/` contain demo assets.
- `server.py` starts the local development server.

## Browser requirements

Use a modern browser with WebGL and webcam access. Run the examples from a
local HTTP server instead of opening the HTML files directly. Browsers can
block camera access for `file://` URLs.
