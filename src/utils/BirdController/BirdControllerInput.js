"use strict";


import {glb} from './../../global/global.js';


export function BirdControllerInput() {

    this.targetList = [];
    this.target = null;
    this.targetQuaternion = null;

    this.setTarget = function(x, y, z) {
        if(x && y && z) {
            this.target = {x: x, y: y, z: z};
            this.targetQuaternion = null;
        } else {
            this.target = null;
            this.targetQuaternion = null;
            if(this.targetList.length == 0)
                this.targetList = glb.treePositionGraph.getRandomList();
            this.target = this.targetList.shift();
        }
    };

}