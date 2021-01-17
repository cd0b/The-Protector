"use strict";

import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js'

export function createScene() {

    const scene = new three.Scene();
    glb.scene = scene;

}