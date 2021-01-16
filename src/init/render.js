"use strict";

import {glb} from './../global/global.js';

export function render() {

    function _render() {
        requestAnimationFrame(frame => {
            if(!glb.previousFrame)
                glb.previousFrame = frame;

            requestAnimationFrame(_render);
            
            const timeElapsed = (frame - glb.previousFrame) * 0.002;

            glb.animationMixers.forEach(m => m.update(timeElapsed));
            glb.controllers.forEach(c => c.update(timeElapsed));
            
            if(glb.thirdPersonCamera)
                glb.thirdPersonCamera.update(timeElapsed);

            if(glb.sea)
                glb.sea.material.uniforms['time'].value += 1.0 / 60.0;

            if(glb.sun)
                glb.sun.update(timeElapsed);

            glb.otherUpdatables.forEach(m => m.update(timeElapsed));

            glb.previousFrame = frame;
            if(glb.scene && glb.renderer && glb.camera) {
                glb.renderer.render(glb.scene, glb.camera);
            }
        });
    }

    requestAnimationFrame(_render);
    
}