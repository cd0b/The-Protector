"use strict";


const vertexShaderCode = `
out vec2 vUv;
out vec3 vPosition;
out vec3 vNormal;

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;


export {vertexShaderCode};