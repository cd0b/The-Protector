"use strict";


import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';



export function createListener() {


    const listener = new three.AudioListener();
    glb.audioListener = listener;
    glb.camera.add(glb.audioListener);

}