"use strict";

import * as three from './../../../lib/three.js-master/build/three.module.js';
import { glb } from "../../global/global.js";
import {BirdControllerProxy} from './BirdControllerProxy.js';
import {BirdControllerInput} from './BirdControllerInput.js';
import {BirdFiniteStateMachine} from './BirdFiniteStateMachine.js';



export function BirdController(params) {

    this.input = new BirdControllerInput();
    this.stateMachine = new BirdFiniteStateMachine(new BirdControllerProxy(params, this.input));

    this.update = function(timeElapsed) {
        this.stateMachine.update(timeElapsed, this.input);
    }

    this.stateMachine.setState("flyToTree");
    glb.controllers.push(this);

} 