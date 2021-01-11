"use strict";

import * as three from './../../../lib/three.js-master/build/three.module.js';
import { glb } from "../../global/global.js";
import {BirdControllerProxy} from './BirdControllerProxy.js';
import {BirdControllerInput} from './BirdControllerInput.js';
import {BirdFiniteStateMachine} from './BirdFiniteStateMachine.js';



export function BirdController(params) {

    // params.model is a bird object
    this._params = params;
    this._model = params.model;
    this._decceleration = new three.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new three.Vector3(1, 0.25, 50.0);
    this._velocity = new three.Vector3(0, 0, 0);
    this._position = new three.Vector3();

    this._animations = {};

    this._input = new BirdControllerInput();
    this._stateMachine = new BirdFiniteStateMachine(new BirdControllerProxy(this._animations));

    this._animations.fly = this._model.namelessActionList[0];
    //this._animations.idle = this._model.namelessActionList[1];
    //this._animations.eat = this._model.namelessActionList[2];
    delete this._model.namelessActionList;


    this.getPosition = function() {
        return this._position;
    }

    this.getRotation = function() {
        return this._model.quaternion;
    }


    this.update = function(timeElapsed) {

        this._stateMachine.update(timeElapsed, this._input);

        // for lerp
        const t = 1.0 - Math.pow(0.001, timeElapsed);
    }




    glb.controllers.push(this);
    this._stateMachine.setState("flyToTree");

} 