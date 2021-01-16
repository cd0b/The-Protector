"use strict";

import { glb } from "./../global/global.js";
import {Sun} from './Sun/Sun.js';


export function createSun() {

    glb.sun = new Sun();

}