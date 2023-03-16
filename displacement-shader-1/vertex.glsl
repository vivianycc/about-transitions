varying vec2 vUv;
varying vec2 vMap1;
varying vec2 vMap2;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
    vMap1 = uv;
    vMap2 = uv;
}