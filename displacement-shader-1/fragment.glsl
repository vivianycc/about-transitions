varying vec2 vUv;
varying vec2 vMap1;
varying vec2 vMap2;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacementMap;
uniform float uOffset;


void main() {
    // vec3 color1 = vec3(vUv,1.0);
    // vec3 color2 = vec3(1.0);
    // float strength = ceil(vUv.x*10.0)/10.0*ceil(vUv.y*10.0)/10.0;
    // vec3 mixed = mix(color1,color2,strength);
    // gl_FragColor = vec4(mixed, 1.0);
    float f = 1.0;

    vec4 displacementTexture = texture2D(uDisplacementMap,vUv);

    float displaceForce1 = displacementTexture.r * uOffset * f;
    vec2 displacedMap1 = vMap1 - displaceForce1;
    vec4 displacedTexture1 = texture2D(uTexture1, displacedMap1);

    float displaceForce2 = displacementTexture.r * (1.0-uOffset) * f;
    vec2 displacedMap2 = vMap2 - displaceForce2;
    vec4 displacedTexture2 = texture2D(uTexture2, displacedMap2);
    gl_FragColor =displacedTexture1*(1.0-uOffset)+ displacedTexture2*uOffset;

 }