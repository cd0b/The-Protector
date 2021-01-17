"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';



export function createListener() {


    const listener = new three.AudioListener();
    glb.audioListener = listener;
    glb.camera.add(glb.audioListener);

}