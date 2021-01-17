"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';
import {loadModel} from './loadModel.js';
import {Selectable} from './Selectable/Selectable.js';
import {Controllable} from './Selectable/Controllable.js';
import {Mass} from './Selectable/Mass.js';


export async function createGandalfsStaff(count) {
    for(let staffNumber = 0; staffNumber < count; staffNumber++) {
        const obj = await loadModel("stick1", "gltf", 0.2);

        const stoneGeo = new three.SphereGeometry(2, 5, 5);
        const stoneMat = new three.MeshBasicMaterial({color: 0xffffff});
        const stone = new three.Mesh(stoneGeo, stoneMat);
        stone.castShadow = true;

        const light = new three.SpotLight({color: 0xff0000});
        light.position.y = 32;
        light.target.position.copy(new three.Vector3(-1,32,0));
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.near = 500;
        light.shadow.camera.far = 4000;
        light.shadow.camera.fov = 30;
        light.angle = Math.PI / 6;
        light.intensity = 0.1;
        stone.add(light);
        stone.add(light.target);

        obj.add(stone);

        stone.position.y = 32;
        stone.position.x = -1;

        const posRange = glb.landSize / 4;
        obj.position.z = (Math.random() * 2 * posRange - posRange);
        obj.position.x = (Math.random() * 2 * posRange - posRange);

        new Mass(
            new Controllable(
                new Selectable(obj, 2), 
                {controlObject: light, 
                controlFeatures: ["intensity", "angle"],
                featuresRanges: [{min: 0, max: 6}, 
                                {min: Math.PI/6, 
                                max: Math.PI/3}]}), 
            10.0, 
            0.0);

        glb.scene.add(obj);
    }
}