"use strict";


import * as three from './../../lib/three.js-master/build/three.module.js';
import perlin from 'https://cdn.jsdelivr.net/gh/mikechambers/es6-perlin-module@master/perlin.js';





export function createPerlinNoiseCanvas(width, height) {


    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    for(let i = 0; i < width; i++)
        for(let j = 0; j < height; j++) {
            const base = new three.Color(0xffffff);
            const noise = perlin(i / 10, j / 10, 0);
            base.multiplyScalar(noise);

            context.fillStyle = "#" + base.getHexString();
            context.fillRect(i,j,1,1);
        }

    return canvas;


}