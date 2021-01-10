"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js'

export function createScene() {

    const scene = new three.Scene();
    glb.scene = scene;

}