"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';

export function setSkybox(skybox) {

    if(glb.skybox && glb.scene)
        glb.scene.remove(glb.skybox);

    const loader = new three.TextureLoader();
    loader.setPath(glb.getPath(glb.skyboxPath, skybox,""));

    const front = loader.load('front.png');
    const back = loader.load('back.png');
    const up = loader.load("up.png");
    const down = loader.load("down.png");
    const right = loader.load("right.png");
    const left = loader.load("left.png");

    const geometry = new three.CubeGeometry(glb.skyboxSize, 
                                            glb.skyboxSize, 
                                            glb.skyboxSize);
    const cubeMaterials = [
        new three.MeshBasicMaterial({map: front, side: three.DoubleSide}),
        new three.MeshBasicMaterial({map: back, side: three.DoubleSide}),
        new three.MeshBasicMaterial({map: up, side: three.DoubleSide}),
        new three.MeshBasicMaterial({map: down, side: three.DoubleSide}),
        new three.MeshBasicMaterial({map: right, side: three.DoubleSide}),
        new three.MeshBasicMaterial({map: left, side: three.DoubleSide}),
    ];
    glb.skybox = new three.Mesh(geometry, cubeMaterials);
    
    if(glb.scene)
        glb.scene.add(glb.skybox);

}