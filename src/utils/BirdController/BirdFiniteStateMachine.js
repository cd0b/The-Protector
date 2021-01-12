"use strict";




import {FlyToTreeState, IdleOnTreeState, FlyToGroundState, IdleOnGroundState, EatState, SickState, DieState} from './BirdStates.js';


export function BirdFiniteStateMachine(proxy) {

    this.states = {};
    this.currentState = null;
    this.previousState = null;

    this.addState = function(name, type) {
        this.states[name] = type;
    }

    this.setState = function(name, params) {
        this.previousState = this.currentState;
        
        if(this.previousState) {
            if(this.previousState.getName() === name)
                return;
            this.previousState.exit();
        }

        this.currentState = new this.states[name](this);;
        this.currentState.enter(this.previousState, params);
    }

    this.update = function(timeElapsed, input) {
        if(this.currentState) {
            this.currentState.update(timeElapsed, input);
        }
    }

    this.proxy = proxy;

    this.addState("flyToTree", FlyToTreeState);
    this.addState("idleOnTree", IdleOnTreeState);
    this.addState("flyToGround", FlyToGroundState);
    this.addState("idleOnGround", IdleOnGroundState);
    this.addState("eat", EatState);
    this.addState("sick", SickState);
    this.addState("die", DieState);

}