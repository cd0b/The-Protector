"use strict";

import * as three from './../../../lib/three.js-master/build/three.module.js';



function State(parent) {
    this._parent = parent;

    this.enter = function() {}
    this.exit = function() {}
    this.update = function() {}
}






export function IdleState(parent) {

    this.__proto__ = new State(parent);

    this.getName = function() {
        return "idle";
    }



    this.enter = function(previousState) {
        const currentAction = this._parent._proxy._animations["idle"].action;

        if(previousState) {
            const previousAction = this._parent._proxy._animations[previousState.getName()].action;

            //currentAction.time = 0.0;
            //currentAction.enabled = true;
            //currentAction.setEffectiveTimeScale(1.0);
            //currentAction.setEffectiveWeight(1.0);
            //currentAction.crossFadeFrom(previousAction, 0.0, true);
            currentAction.reset();
            currentAction.play();
        } else {
            currentAction.play();
        }
    }



    this.update = function(timeElapsed, input) {
        this._parent._proxy._animations["idle"].action.getMixer().update(timeElapsed);

        if(input._keys.forward)
            this._parent.setState("run");
        else if(input._keys.backward)
            this._parent.setState("runBack");
        else if(input._keys.space)
            this._parent.setState("pettingAnimal");
    }

}











export function RunState(parent) {

    this.__proto__ = new State(parent);

    this.getName = function() {
        return "run";
    }



    this.enter = function(previousState) {
        const currentAction = this._parent._proxy._animations["run"].action;

        if(previousState) {
            const previousAction = this._parent._proxy._animations[previousState.getName()].action;

            currentAction.time = 0.0;
            currentAction.enabled = true;
            currentAction.setEffectiveTimeScale(1.0);
            currentAction.setEffectiveWeight(1.0);
            currentAction.crossFadeFrom(previousAction, 0.5, true);
            currentAction.play();
        } else {
            currentAction.play();
        }
    }



    this.update = function(timeElapsed, input) {
        this._parent._proxy._animations["run"].action.getMixer().update(timeElapsed);

        if(input._keys.forward)
            return;
        
        this._parent.setState("idle");
    }

}






export function RunBackState(parent) {

    this.__proto__ = new State(parent);

    this.getName = function() {
        return "runBack";
    }



    this.enter = function(previousState) {
        const currentAction = this._parent._proxy._animations["runBack"].action;

        if(previousState) {
            const previousAction = this._parent._proxy._animations[previousState.getName()].action;

            currentAction.time = 0.0;
            currentAction.enabled = true;
            currentAction.setEffectiveTimeScale(1.0);
            currentAction.setEffectiveWeight(1.0);
            currentAction.crossFadeFrom(previousAction, 0.5, true);
            currentAction.play();
        } else {
            currentAction.play();
        }
    }



    this.update = function(timeElapsed, input) {
        this._parent._proxy._animations["runBack"].action.getMixer().update(timeElapsed);

        if(input._keys.backward)
            return;
        
        this._parent.setState("idle");
    }

}










export function PettingAnimal(parent) {

    this.__proto__ = new State(parent);

    this.getName = function() {
        return "pettingAnimal";
    }



    this._cleanUp = function() {
        const action = this._parent._proxy._animations["pettingAnimal"].action;
        action.getMixer().removeEventListener('finished', this._cleanUp);
    }


    this._finished = function() {
        this._cleanUp();
        this._parent.setState("idle");
    }


    this.enter = function(previousState) {
        const currentAction = this._parent._proxy._animations["pettingAnimal"].action;
        currentAction.getMixer().addEventListener("finished", this._finished.bind(this));

        if(previousState) {
            const previousAction = this._parent._proxy._animations[previousState.getName()].action;

            currentAction.reset();
            currentAction.setLoop(three.LoopOnce, 1);
            currentAction.clampWhenFinished = true;
            currentAction.crossFadeFrom(previousAction, 0.5, true);
            currentAction.play();
        } else {
            currentAction.play();
        }

    }


    this.update = function(timeElapsed, input) {
        this._parent._proxy._animations["pettingAnimal"].action.getMixer().update(timeElapsed);
    }



    this.exit = function() {
        this._cleanUp();
    }

}