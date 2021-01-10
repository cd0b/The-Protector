"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';


export function setBgImage(textureName) {

    const loader = new three.CubeTextureLoader();
    loader.setPath(glb.getPath(glb.cubeTextureLocation,textureName));
    const texture = loader.load([
        '/front.png',
        '/back.png',
        '/up.png',
        '/down.png',
        '/right.png',
        '/left.png',
    ]);
    if(glb.scene)
        glb.scene.background = texture;

}