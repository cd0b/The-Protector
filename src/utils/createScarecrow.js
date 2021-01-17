"use strict";

import {glb} from './../global/global.js';
import {loadModel} from './loadModel.js';
import { Mass } from './Selectable/Mass.js';
import { Selectable } from './Selectable/Selectable.js';


export async function createScarecrow() {

    const obj = await loadModel("scarecrow", "gltf", 20.0);
    obj.position.x = 10;
    obj.position.z = 10;
    const mass = new Mass(new Selectable(obj, 3), 10.0, -2.0);
    glb.otherUpdatables.push(mass);
    glb.scarecrows.push(obj);
    glb.scene.add(obj);



}