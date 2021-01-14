"use strict";


import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';


export async function loadSound(name, dist) {

    return new Promise((resolve) => {
        const sound = new three.PositionalAudio(glb.audioListener);
        const audioLoader = new three.AudioLoader();
        audioLoader.load(glb.getPath(glb.audioLocation, name), buf => {
            sound.setBuffer(buf);
            sound.setLoop( true );
            sound.setRefDistance(dist);
            sound.play();
            resolve(sound);
        });
    });
    
    
    

}