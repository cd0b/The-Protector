"use strict";

import * as three from './../lib/three.js-master/build/three.module.js';

import {glb} from './global/global.js';
import {init} from './init/init.js';
import {setSkybox} from './utils/setSkybox.js';
import {createCharacter} from './utils/createCharacter.js';
import {createTrees} from './utils/createTrees.js';
import {createBirds} from './utils/createBirds.js';
import {setGarbageController} from './utils/setGarbageController.js';



export const _TEST_ENABLED_ = false;

export async function _TEST_() {

    console.log("TEST_ENABLED");
    init();
    setSkybox("colors");
    //await createTrees();
    createCharacter();
    //setGarbageController();
    //createBirds();

};