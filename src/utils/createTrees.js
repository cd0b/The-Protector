"use strict";



import * as three from './../../lib/three.js-master/build/three.module.js';
import {loadModel} from './loadModel.js';
import {glb} from './../global/global.js';



export async function createTrees() {


    {
        const tree = await loadModel('tree1', 'gltf', 0.02);
        tree.namelessActionList.forEach((action) => action.play());
        tree.position.x = 15;
        glb.scene.add(tree);
    }

    {
        const tree = await loadModel('tree2', 'gltf', 3);
        tree.namelessActionList.forEach((action) => action.play());
        tree.position.z = 15;
        glb.scene.add(tree);
    }

}




