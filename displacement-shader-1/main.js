import "./style.css";

import * as THREE from "three";
import VertexShader from "./vertex.glsl";
import FragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { ShaderMaterial } from "three";

// Tweaks
const gui = new GUI();
const uiParams = {
  offset: 0.0,
};

// DOM
const container = document.getElementById("img");
const sizes = {
  width: container.offsetWidth,
  height: container.offsetHeight,
};
console.log(sizes);
const aspectRatio = sizes.width / sizes.height;

// Textures
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load(
  "https://source.unsplash.com/collection/3478682/900x1600",
  () => {
    console.log("load");
  }
);
const texture2 = textureLoader.load(
  "https://source.unsplash.com/collection/85550409/900x1600?=123",
  () => {
    console.log("load");
  }
);

const displacementMap = textureLoader.load("./public/displacement.png", () => {
  console.log("load");
});

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
camera.position.z = 5;

// Stuff
let fov_y =
  (camera.position.z * camera.getFilmHeight()) / camera.getFocalLength();
const geometry = new THREE.PlaneGeometry(fov_y * camera.aspect, fov_y);

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 1.0 },
    uTexture1: { type: "t", value: texture1 },
    uTexture2: { type: "t", value: texture2 },
    uDisplacementMap: { value: displacementMap },
    uOffset: { value: uiParams.offset },
  },
  vertexShader: VertexShader,
  fragmentShader: FragmentShader,
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

gui
  .add(uiParams, "offset")
  .min(0)
  .max(1)
  .step(0.001)
  .onChange(() => (material.uniforms.uOffset.value = uiParams.offset));

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
container.appendChild(renderer.domElement);

const clock = new THREE.Clock();

let hovered = false;
// Animate
let oldTime = 0;
function animate() {
  const elapsedTime = clock.getElapsedTime();
  let deltaTime = elapsedTime - oldTime;
  oldTime = elapsedTime;

  // update offset
  if (hovered) {
    material.uniforms.uOffset.value = deltaTime * 10;
    console.log(uiParams.offset);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Resizing
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = container.offsetWidth;
  sizes.height = container.offsetHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
//note
//https://stackoverflow.com/questions/60381327/three-js-set-plane-size-to-full-view
