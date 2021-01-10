"use strict";

import {glb} from './../global/global.js';

export function createCanvas() {
    if(glb.renderer)
        document.querySelector("body").append(glb.renderer.domElement);
    else
        setTimeout(createCanvas, 1000);
}