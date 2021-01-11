"use strict";



import * as three from './../../../lib/three.js-master/build/three.module.js';



function State(parent) {
    this._parent = parent;

    this.getName = function() {}
    this.enter = function() {/* play animation */}
    this.exit = function() {}
    this.update = function() {}
}






export function FlyToTreeState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "flyToTree";
    }
}







export function IdleOnTreeState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "idleOnTree";
    }
}






export function FlyToGroundState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "flyToGround";
    }
}






export function IdleOnGroundState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "idleOnGround";
    }
}





export function EatState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "eat";
    }
}






export function SickState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "sick";
    }
}






export function DieState(parent) {
    this.__proto__ = new State(parent);

    this.getName = function() {
        return "die";
    }
}