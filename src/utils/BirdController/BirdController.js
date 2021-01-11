"use strict";

import * as three from './../../../lib/three.js-master/build/three.module.js';
import { glb } from "../../global/global.js";



export function BirdController(params) {

    // params.model is a bird object


    this.update = function(timeElapsed) {

        // for lerp
        const t = 1.0 - Math.pow(0.001, timeElapsed);
    }







    glb.controllers.push(this);

} 