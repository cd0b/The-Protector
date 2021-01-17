"use strict";


import { glb } from '../global/global.js';
import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {loadModel} from './loadModel.js';
import { Selectable } from './Selectable/Selectable.js';
import {Mass} from './Selectable/Mass.js';



function SpaceHamsterController(mass) {

    this.obj = mass.obj;
    this.selectable = mass.able.selectable;
    this.garbage = null;
    this.target = null;
    this.corr = false;
    this.up = false;
    this.dir = false;
    this.mov = false;
    this.down = false;
    this.quaternion = new three.Quaternion();


    this.update = function(timeElapsed) {

        this.selectable = mass.able.selectable;
        if(this.selectable || mass.fall) {
            this.garbage = null;
            this.target = null;
            return;
        }

        if(!this.target || !this.garbage) {
            this.corr = false;
            this.up = false;
            this.dir = false;
            this.mov = false;
            this.down = false;
            mass.checkFall = true;
            const entry = glb.garbageController.pickAGarbage();
            if(entry) {
                this.garbage = entry[0];
                this.target = entry[1];
                this.corr = true;
            }
        }

        // correct quaternion
        if(Math.abs(this.quaternion.dot(this.obj.quaternion)) < 0.9999 && this.corr) {
            this.obj.quaternion.slerp(this.quaternion, 0.1);
        } else if(this.corr) {
            this.obj.quaternion.copy(this.quaternion);
            this.corr = false;
            this.up = true;
            this.dir = false;
            this.mov = false;
            this.down = false;
        }

        // set high
        if(this.obj.position.y <= glb.spaceHamsterHigh && this.up) {
            mass.checkFall = false;
            this.obj.position.y += 0.1;
        } else if(this.up) {
            this.up = false;
            this.dir = true;
            this.mov = false;
            this.down = false;
            this.corr = false;
        }

        // set direction
        if(this.dir) {
            const direction = new three.Vector3(0,0,1).applyQuaternion(this.obj.quaternion);    
            direction.y = 0;
            const movDirection = new three.Vector3().subVectors(this.garbage.position, this.obj.position);
            movDirection.y = 0;
            const angle = Math.abs(direction.angleTo(movDirection));
            if(angle >= 1 * (2*Math.PI / 360)) {
                const qua = new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), 1 * (2*Math.PI / 360));
                this.obj.quaternion.multiply(qua);
            } else {
                this.up = false;
                this.dir = false;
                this.mov = true;
                this.down =false;
                this.corr = false;
            }
        }

        // move
        if(this.mov) {
            const movDirection = new three.Vector3().subVectors(this.garbage.position, this.obj.position).normalize();
            movDirection.y = 0;

            if(movDirection.length().toFixed(2) > 0) {
                this.obj.position.add(movDirection);
            } else {
                this.up = false;
                this.dir = false;
                this.mov = false;
                this.down = true;
                this.corr = false;
            }
        }

        // go down
        if(this.obj.position.y > glb.land.position.y && this.down) {
            this.obj.position.y -= 0.1;
        } else if(this.down) {
            glb.garbageController.removeGarbage(this.garbage, true);
            this.garbage = null;
            this.target = null;
        }

    }

}



export async function createSpaceHamster() {

    const obj = await loadModel("spacehamster", "gltf", 0.3);
    const mass = new Mass(new Selectable(obj, 5), 1.5, 0.0);
    glb.otherUpdatables.push(mass);
    glb.controllers.push(new SpaceHamsterController(mass));
    glb.scene.add(obj);

}