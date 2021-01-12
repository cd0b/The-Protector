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
        if(this.action)
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
        if(this.action)
            this.action.stop();
    }
}






export function FlyToGroundState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;
    this.target = null;
    this.isWaited = false;
    this.wait = 0;
    this.garbage = null;

    this.getName = function() {
        return "flyToGround";
    }

    this.enter = function(previousState) {
        const proxy = this.stateMachine.proxy;
        const input = proxy.input;
        
        if(!input.target.garbageList || input.target.garbageList.length == 0) {
            this.stateMachine.setState("flyToTree");
            return;
        }

        this.action = this.stateMachine.proxy.actions.flyToGround;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }


        const garbage = input.target.garbageList[randInt(0, input.target.garbageList.length - 1)];

        this.target = {
            x: garbage.position.x,
            y: 0,
            z: garbage.position.z,
        };

        this.garbage = garbage;
    }

    this.update = function(timeElapsed, input) {

        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

        if(collision(glb.char.position, this.target, glb.birdCharRange)) {
            this.stateMachine.setState("flyToTree");
        }

        const proxy = this.stateMachine.proxy;
        const model = proxy.model;

        /* movement */
        const target = new three.Vector3(this.target.x, this.target.y, this.target.z);
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

        if(position.y > 0)
            model.position.add(new three.Vector3(0, -0.001 * proxy.velocity, 0));
        else   
            model.position.y = 0;


        model.quaternion.copy(_R);
        model.position.add(direction.multiplyScalar(0.005 * proxy.velocity));
        proxy.position.copy(model.position);

        if(collision(proxy.position, this.target, 0.01 * 1.5 * proxy.velocity) && !this.isWaited) {
            this.isWaited = true;
            this.wait = 30;
        }

        this.wait--;

        if(this.wait <= 0 && this.isWaited) {
            const newDirection = new three.Vector3(0,0,1).applyQuaternion(model.quaternion).normalize();
            const newMovDirection = new three.Vector3().subVectors(target, proxy.position).normalize();

            const _Q = new three.Quaternion().setFromUnitVectors(newDirection, newMovDirection);
            model.quaternion.multiply(_Q);

            this.stateMachine.setState("idleOnGround", {target: this.target, garbage: this.garbage});
        }
    }

    this.exit = function() {
        if(this.action)
            this.action.stop();
    }
}






export function IdleOnGroundState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;
    this.wait = 0;
    this.target = null;
    this.garbage = null;

    this.getName = function() {
        return "idleOnGround";
    }

    this.enter = function(previousState, params) {
        this.action = this.stateMachine.proxy.actions.IdleOnGround;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }

        this.wait = 10;

        this.target = params.target;
        this.garbage = params.garbage;
    }

    this.update = function(timeElapsed) {
        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

        if(collision(glb.char.position, this.target, glb.birdCharRange)) {
            this.stateMachine.setState("flyToTree");
        }

        if(this.garbage.removed) {
            this.stateMachine.setState("flyToGround");
        }

        this.wait--;

        if(this.wait <= 0)
            this.stateMachine.setState("eat", { target: this.target, garbage: this.garbage});
    }

    this.exit = function() {
        if(this.action)
            this.action.stop();
    }
}





export function EatState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;
    this.wait = null;
    this.garbage = null;
    this.target = null;

    this.getName = function() {
        return "eat";
    }

    this.enter = function(previousState, params) {
        this.action = this.stateMachine.proxy.actions.eat;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }

        this.wait = 50;

        this.target = params.target;
        this.garbage = params.garbage;
    }

    this.update = function(timeElapsed) {
        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

        if(collision(glb.char.position, this.target, glb.birdCharRange) || this.garbage.removedByChar) {
            this.stateMachine.setState("flyToTree");
        }

        if(this.garbage.removed)
            this.stateMachine.setState("sick");

        this.wait--;

        if(this.wait <= 0) {
            glb.garbageController.removeGarbage(this.garbage);
            this.stateMachine.setState("sick");
        }
    }

    this.exit = function() {
        if(this.action)
            this.action.stop();
    }

    
}






export function SickState(stateMachine) {
    this.__proto__ = new State(stateMachine);
    this.action = null;
    this.actionSpeed = 10;
    this.isWaited = false;
    this.wait = 200;
    this.healed = false;

    this.getName = function() {
        return "sick";
    }

    this.enter = function(previousState) {
        this.action = this.stateMachine.proxy.actions.sick;
        if(this.action) {
            this.action.reset();
            this.action.play();
        }
    }

    this.update = function(timeElapsed, input) {
        if(this.action)
            this.action.getMixer().update(timeElapsed * this.actionSpeed);

        if(collision(this.stateMachine.proxy.model.position, glb.char.position, glb.charBirdHealRange) && !this.isWaited) {
            if(glb.charController._stateMachine._currentState.getName() === "pettingAnimal") {
                this.isWaited = true;
                this.wait = 120;
                this.healed = true;
            }
        }

        this.wait--;

        if(this.wait <= 0) {
            if(this.healed)
                this.stateMachine.setState("flyToTree");
            else
                this.stateMachine.setState("die");
        }
    }

    this.exit = function() {
        if(this.action)
            this.action.stop();
    }
}






export function DieState(stateMachine) {
    this.__proto__ = new State(stateMachine);

    this.getName = function() {
        return "die";
    }

    this.enter = function() {
        this.stateMachine.proxy.model.position.y = -100;
    }
}