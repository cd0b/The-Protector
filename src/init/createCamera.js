"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';

export function createCamera() {

    const camera = new three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        glb.skyboxSize,
    );
    camera.position.set(0,10,20);
    camera.lookAt(0, 3, 0);
    glb.camera = camera;

}