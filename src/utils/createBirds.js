"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import { glb } from "../global/global.js";
import { loadModel } from "./loadModel.js";
import { BirdController } from "./BirdController/BirdController.js";




async function createBird(name, scale, x, y, z) {
    const bird = await loadModel(name, 'gltf', scale);
    new BirdController({model: bird, high: 15.0, position: new three.Vector3(x, y, z), velocity: 200.0});
    bird.position.x = x;
    bird.position.y = y;
    bird.position.z = z;

    glb.scene.add(bird);
}




export function createBirds() {

    for(let i = 0; i < 100; i++)
        createBird("bird1", 0.5, 3,3,3);

}