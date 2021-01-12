"use strict";

import { glb } from "../../global/global.js";

export function BirdControllerProxy(params, input) {

    this.model = params.model;
    this.high = params.high;
    this.position = params.position;
    this.velocity = params.velocity;
    this.input = input;
    this.actions = {};

    /* remove mixers from glb.animationMixers */
    this.actions.flyToTree = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.flyToTree.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.idleOnTree = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.idleOnTree.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.flyToGround = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.flyToGround.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.idleOnGround = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.idleOnGround.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.eat = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.eat.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.sick = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.sick.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);

    this.actions.die = this.model.namelessActionList[0];
    for(let i = 0; i < glb.animationMixers.length; i++)
        if(this.actions.die.getMixer() === glb.animationMixers[i])
            glb.animationMixers.splice(i, 1);
    
    delete this.model.namelessActionList;

}