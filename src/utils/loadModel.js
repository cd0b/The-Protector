"use strict";

import * as three from './../../lib/three.js-master/build/three.module.js';
import {FBXLoader} from './../../lib/three.js-master/examples/jsm/loaders/FBXLoader.js';
import {OBJLoader} from './../../lib/three.js-master/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from './../../lib/three.js-master/examples/jsm/loaders/MTLLoader.js';
import {glb} from '../global/global.js';
import { GLTFLoader } from '../../lib/three.js-master/examples/jsm/loaders/GLTFLoader.js';



function toCamelCase(name) {
    //return name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

    let result = "";
    name.split(" ").forEach((word, index) => {
        word = word.toLowerCase();
        if(index > 0)
            word = word.replace(/^[a-zA-Z]/, chr => chr.toUpperCase());
        
        result += word;
    });

    return result;
}

function loadAnimation(animationLoader, animationFileName, model) {
    return new Promise((resolve) => {
        animationLoader.load(`${animationFileName}.fbx`, animationFile => {
            const mixer = new three.AnimationMixer(model);
            
            glb.animationMixers.push(mixer);
            const action = mixer.clipAction(animationFile.animations[0]);
            const actionName = toCamelCase(animationFileName);
            resolve({
                name: actionName,
                act: action,
            });
        });
    });
}

export async function loadModel(name, type, scale, animationList) {
    if(type === "gltf")
    return new Promise((resolve) => {
        const loader = new GLTFLoader();
        loader.setPath(glb.getPath(glb.modelPath,name,""));
        loader.load(`scene.gltf`, (gltf) => {
            const model = gltf.scene;
            model.scale.setScalar(scale);
            model.traverse(c => {
                c.castShadow = true;
            });
            model.namelessActionList = [];

            const animations = gltf.animations;
            animations.forEach((action) => {
                const mixer = new three.AnimationMixer(model);
                model.namelessActionList.push(mixer.clipAction(action));
                glb.animationMixers.push(mixer);
            });

            resolve(model);
        });
    });
    else if(type === "fbx")
    return new Promise((resolve) => {
        const loader = new FBXLoader();
        loader.setPath(glb.getPath(glb.modelPath,name,""));
        loader.load(`${name}.fbx`, async function(model) {
            model.scale.setScalar(scale);
            model.traverse(c => {
                c.castShadow = true;
            });

            model.actionNames = [];

            const animationLoader = new FBXLoader();
            animationLoader.setPath(glb.getPath(glb.modelPath, name, "animations/"));
            for(let animationFileName of animationList) {
                const act = await loadAnimation(animationLoader, animationFileName, model);
                model[act.name] = act.act;
                model.actionNames.push(act.name);
            }
            
            resolve(model);
        });
    });
}