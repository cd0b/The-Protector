"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../../global/global.js';



export function ThirdPersonCamera(params) {

    this._camera = params.camera;
    this._target = params.target;
    this._offset = params.offset ?? new three.Vector3(0, 5, -10);
    this._lookat = params.lookat ?? new three.Vector3(0, 5, 0);

    this._currentPosition = new three.Vector3();
    this._currentLookat = new three.Vector3(); 



    const calcIdeal = function(paramVec) {
        const vec = new three.Vector3();
        vec.copy(paramVec);
        vec.applyQuaternion(this._target.getRotation());
        vec.add(this._target.getPosition());
        return vec;
    }.bind(this);


    /*window.addEventListener("keypress", function(e) {
        if(e.code === "NumpadSubtract") {
            const dir = new three.Vector3();
            this._camera.getWorldDirection(dir);
            dir.applyQuaternion(new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), Math.PI * 0.5));
            //this._lookat.applyQuaternion(new three.Quaternion().setFromAxisAngle(new three.Vector3(dir), Math.PI * 0.01));
        } else if(e.code === "NumpadAdd") {
            const dir = new three.Vector3();
            this._camera.getWorldDirection(dir);
            dir.applyQuaternion(new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), Math.PI * -0.5));
            //this._lookat.applyQuaternion(new three.Quaternion().setFromAxisAngle(new three.Vector3(dir), Math.PI * 0.01));
        }
    }.bind(this), false);*/




    this.update = function(timeElapsed) {
        const idealOffset = calcIdeal(this._offset);
        const idealLookat = calcIdeal(this._lookat);

        const t = 1.0 - Math.pow(0.001, timeElapsed);
        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }



    glb.thirdPersonCamera = this;

}