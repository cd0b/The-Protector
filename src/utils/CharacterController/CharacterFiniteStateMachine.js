"use strict";


import {IdleState, RunState, PettingAnimal, RunBackState} from './CharacterStates.js';



function FiniteStateMachine() {

    this._states = {};
    this._currentState = null;
    this._previousState = null;

    this.addState = function(name, type) {
        this._states[name] = type;
    }


    this.setState = function(name) {
        this._previousState = this._currentState;

        if(this._previousState) {
            if(this._previousState.getName() === name)
                return;
            this._previousState.exit();
        }


        const state = new this._states[name](this);
        this._currentState = state;
        state.enter(this._previousState);
    }



    this.update = function(timeElapsed, input) {
        if(this._currentState) {
            this._currentState.update(timeElapsed, input);
        }
    }

}











export function CharacterFiniteStateMachine(proxy) {
    this.__proto__ = new FiniteStateMachine();

    this._proxy = proxy;

    this.addState("idle", IdleState);
    this.addState("run", RunState);
    this.addState("pettingAnimal", PettingAnimal);
    this.addState("runBack", RunBackState);
}