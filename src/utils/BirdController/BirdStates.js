"use strict";



import { glb } from '../../global/global.js';
import * as three from './../../../lib/three.js-master/build/three.module.js';



function State(stateMachine) {
    this.stateMachine = stateMachine;

    this.getName = function() {}
    this.enter = function() {/* play animation */}
    this.exit = function() {}
    this.update = function() {}
}





function collision(pos, targetPos, tol) {
    if(pos.x < targetPos.x + tol && pos.y < targetPos.y + tol && pos.z < targetPos.z + tol)
        if(pos.x > targetPos.x - tol && pos.y > targetPos.y - tol && pos.z > targetPos.z - tol)
            return true;
    return false;
}

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}






export function FlyToTreeState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;

    this.logCount = 1;

    this.log = function(str) {
        if(this.logCount > 0)
            console.log(str);
    }

    this.getName = function() {
        return "flyToTree";
    }

    this.enter = function(previousState) {
        this.action = this.stateMachine.proxy.actions.flyToTree;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }

        const input = this.stateMachine.proxy.input;
        input.setTarget();
    }

    this.update = function(timeElapsed, input) {
        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

        const proxy = this.stateMachine.proxy;
        const model = proxy.model;

        /* movement */
        const target = new three.Vector3(input.target.x, proxy.high, input.target.z);
        const position = proxy.position;
        const movDirection = new three.Vector3().subVectors(target, position).normalize();
        const direction = new three.Vector3(0,0,1).applyQuaternion(model.quaternion).normalize();

        const _R = model.quaternion.clone();
        let angleY;
        {
            angleY = Math.acos(new three.Vector3(direction.x, 0, direction.z).dot(new three.Vector3(movDirection.x, 0, movDirection.z)));
            angleY *= 0.001;
            angleY = angleY.toFixed(3);
        }
        const _QY = new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), angleY * proxy.velocity);
        _R.multiply(_QY);

        if(position.y < proxy.high)
            model.position.add(new three.Vector3(0, 0.001 * proxy.velocity, 0));
        else   
            model.position.y = proxy.high;


        model.quaternion.copy(_R);
        model.position.add(direction.multiplyScalar(0.01 * proxy.velocity));
        proxy.position.copy(model.position);

        /* collision */
        if(collision(model.position, target, 0.01 * 3 * proxy.velocity)) {
            this.stateMachine.setState("idleOnTree");
        }

        this.logCount = 0;
    }

    this.exit = function() {
        this.action.stop();
    }
}







export function IdleOnTreeState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;
    
    this.fakeVelocity = 0.09 * this.stateMachine.proxy.velocity;
    this.quaternion = null;

    this.wait = 400;
    
    this.getName = function() {
        return "idleOnTree";
    }

    this.enter = function(previousState) {
        this.action = this.stateMachine.proxy.actions.flyToTree;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }

        const input = this.stateMachine.proxy.input;
        const model = this.stateMachine.proxy.model;
        const target = input.target;

        const range = 6;
        const minY = -2;

        const fakeTarget = new three.Vector3(
                target.x + randInt(-range, range), 
                this.stateMachine.proxy.high + randInt(minY, range),
                target.z + randInt(-range, range));
        this.stateMachine.proxy.model.position.copy(fakeTarget);
        this.stateMachine.proxy.position.copy(this.stateMachine.proxy.model.position);
        this.fakeVelocity = Math.random() * (0.12 - 0.09) + 0.09 * this.stateMachine.proxy.velocity;
        this.quaternion = new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), 3 * this.fakeVelocity * Math.PI);

        this.wait = randInt(200, 400);
    }

    this.update = function(timeElapsed, input) {
        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

                
        const proxy = this.stateMachine.proxy;
        const model = proxy.model;

        const direction = new three.Vector3(0,0,1).applyQuaternion(model.quaternion);

        model.position.add(direction.multiplyScalar(this.fakeVelocity * 0.04));
        model.quaternion.multiply(this.quaternion);
        proxy.position.copy(model.position);

        this.wait--;
        if(this.wait < 0)
            this.stateMachine.setState("flyToGround");
    }

    this.exit = function() {
        this.action.stop();
    }
}






export function FlyToGroundState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "flyToGround";
    }

    this.enter = function(previousState) {
        this.stateMachine.setState("flyToTree");
    }

    this.update = function(timeElapsed, input) {
    }

    this.exit = function() {
    }
}






export function IdleOnGroundState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "idleOnGround";
    }
}





export function EatState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "eat";
    }

    
}






export function SickState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "sick";
    }
}






export function DieState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "die";
    }
}