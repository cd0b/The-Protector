"use strict";



import * as three from '../../../lib/three.js-master/build/three.module.js';
import {glb} from '../../global/global.js';
import {loadModel} from './../loadModel.js';




function collision(pos, targetPos, tol) {
    if(pos.x < targetPos.x + tol && pos.y < targetPos.y + tol && pos.z < targetPos.z + tol)
        if(pos.x > targetPos.x - tol && pos.y > targetPos.y - tol && pos.z > targetPos.z - tol)
            return true;
    return false;
}




export function GarbageController() {

    function rand(min, max) {
        return (Math.random() * (max - min) + min);
    }

    function randInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function selectGarbage() {
        const index = randInt(0, glb.garbageModels.length - 1);
        return { name: glb.garbageModels[index], scale: glb.garbageScales[index], high: glb.garbageHighs[index] };
    }

    this.lastCreationTime = glb.garbageCreationTime;
    this.creationTime = glb.garbageCreationTime;
    this.maxGarbageCount = glb.maxGarbageCount;

    this.garbageMap = new Map();

    this.removeGarbage = function(garbage, removedByChar) {

        if(!garbage || garbage.removed || garbage.removedByChar)
            return;

        const tree = this.garbageMap.get(garbage);
        const garbageList = tree.garbageList;

        for(let i = 0; i < garbageList.length; i++) {
            if(garbageList[i] === garbage)  
                garbageList.splice(i, 1);
        }

        garbage.namelessActionList.forEach(function(action) {
            const mixer = action.getMixer();
            for(let i = 0; i < glb.animationMixers.length; i++) {
                if(glb.animationMixers[i] === mixer)
                    glb.animationMixers.splice(i,1);
            }
        });
        glb.scene.remove(garbage);
        this.garbageMap.delete(garbage);
        if(removedByChar)
            garbage.removedByChar = true;
        else
            garbage.removed = true;
    }

    this.addGarbage = function() {
        const targetPosition = glb.treePositionGraph.getRandomNode();

        const max = glb.garbageRange[1];
        const min = glb.garbageRange[0];
        const x = targetPosition.x + rand(min,max);
        const z = targetPosition.z + rand(min,max);

        const randomGarbage = selectGarbage();
        loadModel(randomGarbage.name, 'gltf', randomGarbage.scale).then(garbage => {
            garbage.namelessActionList.forEach(function(action) {action.play();});
            garbage.position.y = randomGarbage.high;
            garbage.position.x = x;
            garbage.position.z = z;
            garbage.rotation.y = rand(0, 360);
            glb.scene.add(garbage);
            if(!targetPosition.garbageList)
                targetPosition.garbageList = [];
            targetPosition.garbageList.push(garbage);
            this.garbageMap.set(garbage, targetPosition);
            garbage.removed = false;
            garbage.removedByChar = false;
        });
    }

    this.update = function(timeElapsed) {

        
        if(this.lastCreationTime > this.creationTime && this.garbageMap.size < this.maxGarbageCount) {
            this.addGarbage();
            this.lastCreationTime = 0;
            return;
        }

        console.log(this.garbageMap.size);

        this.lastCreationTime += timeElapsed;

    }



    window.addEventListener("keydown", function(e) {
        if(e.code === "KeyE") {
            const iter = this.garbageMap.keys();
            
            for(let garbage of iter) {
                if(collision(garbage.position, glb.char.position, glb.charGarbageRange)) {
                    this.removeGarbage(garbage, true);
                    break;
                }
            }

        }
    }.bind(this), false);




    glb.controllers.push(this);




}