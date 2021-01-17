"use strict";



import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {loadModel} from './loadModel.js';
import {glb} from './../global/global.js';



function ShipController(ship, pos) {

    ship.position.x = pos.x;
    ship.position.y = pos.y;
    ship.position.z = pos.z;
    glb.scene.add(ship);
    ship.namelessActionList.forEach(a => {a.play();});
    ship.quaternion.multiply(new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), Math.PI * 0.5));

    this.qua90 = new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), Math.PI * 0.5);

    this.update = function(timeElapsed) {
        ship.namelessActionList.forEach(a => {a.getMixer().update(timeElapsed);});


        // movement
        const r = new three.Vector3().subVectors(ship.position, new three.Vector3(0,0,0));
        r.y = 0;
        const d = new three.Vector3().copy(r).applyQuaternion(this.qua90).normalize().multiplyScalar(timeElapsed * glb.shipVelocity);
        ship.position.add(d);

        // rot
        const newr = new three.Vector3().subVectors(ship.position, new three.Vector3(0,0,0));
        newr.y = 0;
        const angle = r.angleTo(newr);
        ship.quaternion.multiply(new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), angle));
        


    }

    glb.controllers.push(this);

}




export async function createShips() {

    const ship1 = await loadModel("ship1", "gltf", 30.0);
    ship1.rotation.y = Math.PI * 0.5;
    new ShipController(ship1, {x: glb.landSize * 1.5, y: 24, z: 0});
    const ship3 = await loadModel("ship3", "gltf", 30.0);
    new ShipController(ship3, {x: 0, y: 18, z: glb.landSize * 1.5});
    const ship4 = await loadModel("ship4", "gltf", 3.0);
    new ShipController(ship4, {x: 0, y: -3, z: -glb.landSize * 1.5});

}