"use strict";


import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';



const loadTexture = async function(imageFilename) {

    return new Promise((resolve, reject) => {
        try {

            const loader = new three.TextureLoader();
            loader.setPath(glb.getPath(glb.textureLocation));
            
            loader.load(imageFilename, (texture) => {
                resolve(texture);
            });

        } catch(e) {
            reject(e);
        } 
    });


}


export {loadTexture};