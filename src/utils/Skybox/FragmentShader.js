"use strict";


const fragmentShaderCode = `
#define SUNRISE 1
#define DAY 2
#define SUNSET 3
#define NIGHT 4

in vec3 vPosition;
in vec2 vUv;
in vec3 vNormal;

uniform float time;
uniform float dayLength;
uniform vec3 sunPosition;
uniform float sunRadius;
uniform float skyboxSize;

uniform sampler2D sunrise;
uniform sampler2D day;
uniform sampler2D night;
uniform sampler2D sunset;

out vec4 oColor;
void main() {

    float sunAngle = radians(90.0) - (time * radians(360.0)) / dayLength;
    float cosSunAngle = cos(sunAngle);
    float sinSunAngle = sin(sunAngle);

    float sunsetCoeff = pow(1.0 - (1.0 - cosSunAngle) / 2.0, 3.0);
    float sunriseCoeff = pow(1.0 - (1.0 + cosSunAngle) / 2.0, 3.0);
    float dayCoeff = 1.0 - (1.0 - sinSunAngle) / 2.0;
    float nightCoeff = 1.0 - (1.0 + sinSunAngle) / 2.0;

    vec3 sunriseColor = vec3(0.164, 0.372, 0.172) * sunriseCoeff;
    vec3 dayColor = vec3(1.0, 1.0, 1.0) * dayCoeff;
    vec3 nightColor = vec3(0.058, 0.145, 0.262) * nightCoeff;
    vec3 sunsetColor = vec3(0.964, 0.231, 0.105) * sunsetCoeff;

    // set sunColor
    vec3 sunColor = sunsetColor + sunriseColor + dayColor;
    // sun position on skybox
    vec3 realSunPosition = sunPosition * skyboxSize;
    // distance to sun in day time
    float distanceToSun = length(vPosition - realSunPosition);
    float distanceColorEffect = pow(1.0 - (distanceToSun / (skyboxSize * 2.0)), 10.0 / sunRadius);
    vec3 colorFromDistance = vec3(distanceColorEffect, distanceColorEffect, distanceColorEffect);
    sunColor = colorFromDistance * sunColor;

    // set textureColor
    vec4 sunriseTexture = texture(sunrise, vUv) * sunriseCoeff;
    vec4 dayTexture = texture(day, vUv) * dayCoeff * 2.0;
    vec4 nightTexture = texture(night, vUv) * nightCoeff - vec4(0.5, 0.5, 0.5, 0.0);
    vec4 sunsetTexture = texture(sunset, vUv) * sunsetCoeff;
    vec4 skyColor = nightTexture + dayTexture + sunsetTexture + sunriseTexture;

    //vec4 finalColor = vec4(sunColor, 1.0) + skyColor * vec4(sunColor, 1.0);
    vec4 finalColor = skyColor + skyColor * vec4(sunColor, 1.0);

    oColor = finalColor;
}
`;


export {fragmentShaderCode};