"use strict";

import { glb } from "../global/global.js";
import { loadModel } from "./loadModel.js";
import { BirdController } from "./BirdController/BirdController.js";




async function createBird(name, scale) {
    const bird = await loadModel(name, 'gltf', scale);
    const controller = new BirdController({model: bird});
    glb.scene.add(bird);
}




export function createBirds() {

    createBird("bird1", 0.5);

}