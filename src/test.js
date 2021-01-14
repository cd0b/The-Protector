"use strict";

import * as three from './../lib/three.js-master/build/three.module.js';
import {glb} from './global/global.js';
import {init} from './init/init.js';
import {setSkybox} from './utils/setSkybox.js';
import {setBgImage} from './utils/setBgImage.js'
import {createCharacter} from './utils/createCharacter.js';
import {createTrees} from './utils/createTrees.js';
import {createBirds} from './utils/createBirds.js';
import {GarbageController} from './utils/GarbageController/GarbageController.js';





import {loadModel} from './utils/loadModel.js';
import {GLTFLoader} from './../lib/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from './../lib/three.js-master/examples/jsm/loaders/FBXLoader.js';
import {TreePositionGraph} from './utils/TreePositionGraph/TreePositionGraph.js';
import {TreePos} from './utils/TreePositionGraph/TreePos.js'






export const _TEST_ENABLED_ = true;

export async function _TEST_() {

    init();
    //setSkybox("test");
    //setBgImage("test");
    const scene = glb.scene;
    const camera = glb.camera;


    // light
    {
        let light = new three.DirectionalLight(0xFFFFFF, 5.0, 100);
        light.position.set(0, 1, 0);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.mapSize.width = 10000;
        light.shadow.mapSize.height = 10000;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        scene.add(light);
    
        //light = new three.AmbientLight(0xFFFFFF, 4.0);
        //scene.add(light);
    }

    const mesh = new three.Mesh(new three.BoxGeometry(3,3,3), new three.MeshPhongMaterial({
        color: 0x335577,  
    }));
    mesh.castShadow = true;
    mesh.position.y = 5;
    scene.add(mesh);


    
    createCharacter();
    await createTrees();
    createBirds();
    glb.garbageController = new GarbageController();


    



    //alert("asd");
};