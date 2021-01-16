"use strict";


import * as three from './../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';



const loadTexture = async function(imageFilename, isSkybox = false) {

    return new Promise((resolve, reject) => {
        try {

            const loader = new three.TextureLoader();
            if(isSkybox)
                loader.setPath(glb.getPath(glb.skyboxPath));
            else
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