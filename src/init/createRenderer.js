"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';

export function createRenderer() {

    const renderer = new three.WebGLRenderer({
        antialias: true,
    });
    renderer.outputEncoding = three.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFSoftShadowMap;
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    glb.renderer = renderer;

}