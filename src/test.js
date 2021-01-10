"use strict";

import * as three from './../lib/three.js-master/build/three.module.js';
import {glb} from './global/global.js';
import {init} from './init/init.js';
import {setSkybox} from './utils/setSkybox.js';
import {setBgImage} from './utils/setBgImage.js'
import {createCharacter} from './utils/createCharacter.js';
import {createTrees} from './utils/createTrees.js';


import {loadModel} from './utils/loadModel.js';
import {GLTFLoader} from './../lib/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from '../lib/three.js-master/examples/jsm/loaders/FBXLoader.js';



export const _TEST_ENABLED_ = true;

export async function _TEST_() {

    init();
    //setSkybox("test");
    //setBgImage("test");
    const scene = glb.scene;
    const camera = glb.camera;


    // light
    {
        let light = new three.DirectionalLight(0xFFFFFF, 3.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        //scene.add(light);
    
        light = new three.AmbientLight(0xFFFFFF, 4.0);
        scene.add(light);
    }

    
    createCharacter();
    createTrees();


    

    
    


};