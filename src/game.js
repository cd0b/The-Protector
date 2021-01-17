"use strict";

import {init} from './init/init.js';
import {setSkybox} from './utils/setSkybox.js';
import {createCharacter} from './utils/createCharacter.js';
import {createTrees} from './utils/createTrees.js';
import {createBirds} from './utils/createBirds.js';
import {setGarbageController} from './utils/setGarbageController.js';
import {createRocks} from "./utils/createRocks.js";

export async function _GAME_() {

    init();
    setSkybox("colors");
    await createTrees();
    createCharacter();
    setGarbageController();
    createBirds();
    createRocks();
}