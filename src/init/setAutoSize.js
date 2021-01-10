"use strict";

import {glb} from './../global/global.js';

export function setAutoSize() {

    window.addEventListener("resize", function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        glb.camera.aspect = width / height;
        glb.camera.updateProjectionMatrix();
        glb.renderer.setSize(width, height);
    }, false);

}