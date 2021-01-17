"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../../global/global.js';





export function Sun() {

    this.directionalLight = null;
    this.hemisphereLight = null;
    this.ambientLight = null;
    
    // sun options
    this.startPosition = new three.Vector3(0,1,0);
    this.position = new three.Vector3().copy(this.startPosition);
    this.intensity = 4.0;
    this.dayTime = 0;
    this.unitAngle = 2*Math.PI / glb.dayLength;

    // ambient light options
    this.ambientColor = 0xffffff;
    this.ambientIntensity = 0.3;

    // hemisphere light options
    this.skyColor = 0x2a52be;
    this.groundColor = 0xbfff00;
    this.hemisphereLightBaseIntensity = 0.3;

    // directional light options
    this.directionalColor = 0xffffff;



    // scene
    const scene = glb.scene;

    
    // set ambient light
    this.ambientLight = new three.AmbientLight(this.ambientColor, this.ambientIntensity);
    scene.add(this.ambientLight);

    // set hemi sphere light
    this.hemisphereLight = new three.HemisphereLight(this.skyColor, this.groundColor, this.intensity);
    this.hemisphereLight.position.copy(new three.Vector3(this.position.x, -this.position.y, this.position.z));
    scene.add(this.hemisphereLight);

    // set directional light
    this.directionalLight = new three.DirectionalLight(this.directionalColor, this.intensity);
    this.directionalLight.position.copy(this.position);
    scene.add(this.directionalLight);


    this.update = function(timeElapsed) {
        
        this.dayTime = (this.dayTime + timeElapsed) % glb.dayLength;

        // calculate sun position
        const axis_x = new three.Vector3(3,0,5).normalize();
        let angle_x = timeElapsed * this.unitAngle;
        const quaternion_x = new three.Quaternion().setFromAxisAngle(axis_x, angle_x);
        this.position.applyQuaternion(quaternion_x);
        this.position.normalize();

        // calculate intensity
        const intensityCoeff = Math.max(this.position.y, 0);
        this.directionalLight.intensity = this.intensity * intensityCoeff;
        this.hemisphereLight.intensity = this.hemisphereLightBaseIntensity + this.intensity * intensityCoeff;
        


        this.hemisphereLight.position.copy(new three.Vector3(this.position.x, -this.position.y, this.position.z));
        this.directionalLight.position.copy(this.position);

    }



    /*(function createSun() {

        const scene = glb.scene;

        // spot light
        const spotLight = new three.DirectionalLight("#ffffff");
        spotLight.position.set(10,10,10);
        spotLight.intensity = 2;
        spotLight.exponent = 4;
        spotLight.angle = Math.PI/2.2;
        spotLight.target = scene;
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 0.1;
        spotLight.shadow.camera.far = 100;
        spotLight.shadow.mapSize.width = 10000;
        spotLight.shadow.mapSize.height = 10000;
        scene.add(spotLight);

        const helper = new three.CameraHelper(spotLight.shadow.camera);
        scene.add(helper);

    })();*/






    


}