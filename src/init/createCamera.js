"use strict";

import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';

export function createCamera() {

    const camera = new three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        glb.skyboxSize + glb.landSize + 1,
    );
    camera.position.set(0,10,20);
    camera.lookAt(0, 3, 0);
    glb.camera = camera;

}