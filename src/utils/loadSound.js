"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';


export async function loadSound(name, dist, play = true) {

    return new Promise((resolve) => {
        const sound = new three.PositionalAudio(glb.audioListener);
        const audioLoader = new three.AudioLoader();
        audioLoader.load(glb.getPath(glb.audioLocation, name), buf => {
            sound.setBuffer(buf);
            sound.setLoop( true );
            sound.setRefDistance(dist);
            sound.setVolume(0.01);
            if(play)
                sound.play();
            resolve(sound);
        });
    });
    
    
    

}