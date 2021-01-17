"use strict";

import {init} from './init/init.js';
import {setSkybox} from './utils/setSkybox.js';
import {createCharacter} from './utils/createCharacter.js';
import {createTrees} from './utils/createTrees.js';
import {createBirds} from './utils/createBirds.js';
import {setGarbageController} from './utils/setGarbageController.js';
import {createGandalfsStaff} from './utils/createGandalfsStaff.js';
import {createSpaceHamster} from './utils/createSpaceHamster.js';
import {createScarecrow} from './utils/createScarecrow.js';
import {createShips} from './utils/createShips.js';


export async function _GAME_() {

    init();
    await setSkybox("colors");
    await createTrees();
    await createCharacter();
    setGarbageController();
    await createBirds();
    await createGandalfsStaff(4);
    await createSpaceHamster();
    await createScarecrow();
    await createShips();

}