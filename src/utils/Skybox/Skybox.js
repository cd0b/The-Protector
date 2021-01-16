"use strict";

import * as three from './../../../lib/three.js-master/build/three.module.js';
import {vertexShaderCode} from './VertexShader.js';
import {fragmentShaderCode} from './FragmentShader.js';
import {glb} from './../../global/global.js';



export function Skybox(texture) {

    this.skybox = null;

    // set geometry
    const geometry = new three.SphereBufferGeometry(glb.skyboxSize, glb.skyboxSize / 10, glb.skyboxSize / 10);


    // set material
    const material = new three.ShaderMaterial({
        uniforms: {
            time: {value: glb.sun.dayTime},
            dayLength: {value: glb.dayLength},
            sunPosition: {value: glb.sun.position},
            sunRadius: {value: glb.sunRadius},
            skyboxSize: {value: glb.skyboxSize},
            sunrise: {value: texture.sunrise},
            day: {value: texture.day},
            night: {value: texture.night},
            sunset: {value: texture.sunset},
        },
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
        glslVersion: three.GLSL3,
        side: three.BackSide,
    });

    this.skybox = new three.Mesh(geometry, material);
    this.skybox.position.x = 0;
    this.skybox.position.y = 0;
    this.skybox.position.z = 0;
    glb.scene.add(this.skybox);


    this.update = function() {
        const time = glb.sun.dayTime;
        this.skybox.material.uniforms["time"].value = time;

        const sunPos = glb.sun.position;
        this.skybox.material.uniforms["sunPosition"].value = sunPos;
    }
}