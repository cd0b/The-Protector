"use strict";

import {glb} from './../../global/global.js';



export function Mass(able, mass, size) {

    this.able = able;
    this.size = size;
    this.mass = mass;
    this.obj = able.obj;
    this.fall = !able.selectable;
    this.checkFall = true;

    this.update = function(timeElapsed) {
        able.update(timeElapsed);
        if(this.checkFall)
            this.fall = !able.selectable;
        
        if(this.obj.position.y <= this.size / 2 && this.fall) {
            this.fall = false;
            this.obj.position.y = this.size / 2;
        }

        if(this.fall) {
            this.obj.position.y -= 5 * Math.pow(timeElapsed, 2) * mass;
        }
    }

    glb.otherUpdatables.push(this);

}