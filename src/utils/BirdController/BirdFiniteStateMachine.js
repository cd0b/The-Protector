"use strict";




import {FlyToTreeState, IdleOnTreeState, FlyToGroundState, IdleOnGroundState, EatState, SickState, DieState} from './BirdStates.js';


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









export function BirdFiniteStateMachine(proxy) {
    this.__proto__ = new FiniteStateMachine();

    this._proxy = proxy;

    this.addState("flyToTree", FlyToTreeState);
    this.addState("idleOnTree", IdleOnTreeState);
    this.addState("flyToGround", FlyToGroundState);
    this.addState("idleOnGround", IdleOnGroundState);
    this.addState("eat", EatState);
    this.addState("sick", SickState);
    this.addState("die", DieState);
}