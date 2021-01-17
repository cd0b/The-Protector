"use strict";


export function BirdControllerProxy(params, input, controller) {

    this.model = params.model;
    this.high = params.high;
    this.position = params.position;
    this.velocity = params.velocity;
    this.input = input;
    this.controller = controller;
    this.actions = {};

    /* remove mixers from glb.animationMixers */
    this.actions.flyToTree = this.model.namelessActionList[0];
    this.actions.idleOnTree = this.model.namelessActionList[0];
    this.actions.flyToGround = this.model.namelessActionList[0];
    //this.actions.idleOnGround = this.model.namelessActionList[0];
    this.actions.eat = this.model.namelessActionList[0];
    //this.actions.sick = this.model.namelessActionList[0];
    //this.actions.die = this.model.namelessActionList[0];
    
    delete this.model.namelessActionList;

}