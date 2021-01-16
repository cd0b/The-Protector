"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import { glb } from "../global/global.js";
import { loadModel } from "./loadModel.js";
import { BirdController } from "./BirdController/BirdController.js";
import {loadSound} from './loadSound.js';

const high = 15.0;

async function createBird(name, scale, x, y, z, sound) {
    const bird = await loadModel(name, 'gltf', scale);
    new BirdController({model: bird, high: high, position: new three.Vector3(x, y, z), velocity: glb.birdVelocity});
    bird.position.x = x;
    bird.position.y = y;
    bird.position.z = z;

    glb.scene.add(bird);
    const birdSound = await loadSound(sound, 3);
    bird.add(birdSound);
    bird.sound = birdSound;
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}



export function createBirds() {

    for(let i = 0; i < glb.birdCount; i++) {
        const index = randInt(0, glb.birdModels.length - 1);
        createBird(
            glb.birdModels[index], 
            glb.birdScales[index], 
            rand(-glb.landSize / 2, glb.landSize / 2),
            rand(high/3, high*3),
            rand(-glb.landSize / 2, glb.landSize / 2), 
            glb.birdSounds[randInt(0, glb.birdSounds.length - 1)]);
    }

}