"use strict";

import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';
import { render } from './render.js';

export function createRenderer() {

    const renderer = new three.WebGLRenderer({
        antialias: true,
    });
    renderer.outputEncoding = three.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFSoftShadowMap;
    renderer.toneMapping = three.CineonToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    glb.renderer = renderer;

}