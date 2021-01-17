"use strict";



import {glb} from './../global/global.js';
import {loadModel} from './../utils/loadModel.js';
import {CharacterController} from './../utils/CharacterController/CharacterController.js';
import {ThirdPersonCamera} from './../utils/CharacterController/ThirdPersonCamera.js';


export async function createCharacter() {

    const char = await loadModel(glb.charName, "fbx", glb.charScale, glb.charAnimations);

    const controller = new CharacterController({ model: char, });

    glb.scene.add(char);
    glb.char = char;
    
    new ThirdPersonCamera({camera: glb.camera, target: controller});

}