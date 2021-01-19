"use strict";


import {glb} from './../../global/global.js';


function Element(tag, cssClass, desc, val, calc, ctl) {

    this.html = document.createElement(tag);
    this.html.classList.add(cssClass);
    this.desc = desc;
    this.updatePoint = val;
    this.value = 0;
    this.calc = calc;
    this.ctl = ctl;

    document.body.append(this.html);
    
    this.update = function(timeElapsed) {

        this.value = this.calc(this.value, glb[this.updatePoint]);
        this.html.innerHTML = this.desc + ": " + this.value;
        
        if(this.ctl)
            this.ctl();

    }

}




export function UI() {

    this.point = new Element("div", "point", "POINT", "collectedGarbage", function(old, a) { return glb.collectedGarbage * 101; });
    this.birdCount = new Element("div", "birdCount", "BIRD COUNT", "birdCount", function(old, a) { return a; });

    this.update = function(timeElapsed) {
        this.point.update(timeElapsed);
        this.birdCount.update(timeElapsed);
    }

    glb.otherUpdatables.push(this);

}