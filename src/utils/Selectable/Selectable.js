"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../../global/global.js';



export function Selectable(obj, range) {

    this.obj = obj;
    this.position = new three.Vector3().copy(obj.position);
    this.quaternion = new three.Quaternion().copy(obj.quaternion);

    this.selectable = false;
    this.pressed = false;
    this.move = false;

    this.ball = null;

    // collision with char
    const collision = function(range) {
        const targetPos = this.obj.position;
        const pos = glb.char.position;
        
        const vec = new three.Vector3().subVectors(targetPos, pos);
        if(Math.abs(vec.x) < range && Math.abs(vec.y) < range && Math.abs(vec.z) < range)
            return true;

        return false;
    }.bind(this);

    // add event listener to set/clear selectable
    window.addEventListener("keypress", function(e) {
        if(e.code === "KeyE") {
            if(collision(range) && !glb.charHand) {
                this.selectable = true;
                glb.charHand = true;

                // add a ball in object
                const ball = new three.Mesh(new three.SphereGeometry(2, 10, 10), new three.MeshBasicMaterial({color: 0xff0000}));
                this.obj.add(ball);
                this.ball = ball;
            } else if(this.selectable) {
                glb.charHand = false;
                this.selectable = false;
                this.obj.remove(this.ball);
                this.ball = null;
                positionOffset.set(0,0,0);
                rotationOffset.copy(new three.Quaternion());
            }

            this.fall = !this.selectable;
        }
    }.bind(this), false);

    // add event listener to set/clear pressed
    const mouse = {x: 0, y: 0, z: 0};
    window.addEventListener("mousedown", function(e) {
        if(this.selectable && e.which == 1) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * -2 + 1;

            const rayCaster = new three.Raycaster();
            rayCaster.setFromCamera(mouse, glb.camera);
            const intersect = rayCaster.intersectObjects([this.ball]);
            if(intersect.length == 0)
                this.pressed = true;
            else {
                this.move = true;
            }
        }
    }.bind(this), false);
    window.addEventListener("mouseup", function(e) {
        if(e.which == 1) {
            this.pressed = false;
            this.move = false;
        }
    }.bind(this), false);
    

    const updateObj = function() {
        obj.position.copy(this.position);
        obj.quaternion.copy(this.quaternion);
    }.bind(this);

    const positionOffset = new three.Vector3();
    const rotationOffset = new three.Quaternion();
    // set offset if selected and pressed
    window.addEventListener("mousemove", function(e) {
        if(this.selectable && this.pressed) {
            const newMouse = {x: 0, y: 0, z: 0};
            newMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            newMouse.y = (e.clientY / window.innerHeight) * -2 + 1;

            const dir = Math.abs(newMouse.y - mouse.y) > Math.abs(newMouse.x - mouse.x) ? "y"  : "x";

            if(dir === "y")
            {
                const objPos = new three.Vector3();
                glb.camera.getWorldDirection(objPos);
                objPos.normalize();
                const oldVector = new three.Vector3().subVectors(new three.Vector3(0, mouse.y, 0), objPos).normalize();
                const newVector = new three.Vector3().subVectors(new three.Vector3(0, newMouse.y, 0), objPos).normalize();
                const qua = new three.Quaternion().setFromUnitVectors(oldVector, newVector);
                qua.multiply(rotationOffset);
                rotationOffset.copy(qua);
            }
            else if(dir === "x")
            {
                const objPos = new three.Vector3(0,0,1);
                const oldVector = new three.Vector3().subVectors(new three.Vector3(-mouse.x, 0, 0), objPos).normalize();
                const newVector = new three.Vector3().subVectors(new three.Vector3(-newMouse.x, 0, 0), objPos).normalize();
                const qua = new three.Quaternion().setFromUnitVectors(oldVector, newVector);
                qua.multiply(rotationOffset);
                rotationOffset.copy(qua);
            }

            // copy old mouse to new one
            mouse.x = newMouse.x;
            mouse.y = newMouse.y;
        } else if(this.selectable && this.move) {
            const newMouse = {x: 0, y: 0, z: 0};
            newMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            newMouse.y = (e.clientY / window.innerHeight) * -2 + 1;

            const dir = Math.abs(newMouse.y - mouse.y) > Math.abs(newMouse.x - mouse.x) ? "y"  : "x";

            if(dir === "x") {
                const deltaVec = new three.Vector3(newMouse.x - mouse.x, 0, 0);
                const cameraDirection = new three.Vector3();
                glb.camera.getWorldDirection(cameraDirection);
                const cameraQuaternion = new three.Quaternion().setFromAxisAngle(new three.Vector3(0,1,0), -Math.PI / 2);
                cameraDirection.applyQuaternion(cameraQuaternion);
                cameraDirection.multiplyScalar(deltaVec.x);
                cameraDirection.y = 0;
                positionOffset.add(cameraDirection.multiplyScalar(3.0));
            }
            else if(dir === "y")
            {
                const deltaVec = new three.Vector3(0, newMouse.y - mouse.y, 0).multiplyScalar(3.0);
                positionOffset.add(deltaVec);
            }

            mouse.x = newMouse.x;
            mouse.y = newMouse.y;
        }
    }.bind(this), false);



    
    this.update = function() {

        if(this.selectable) {

            this.quaternion.copy(this.obj.quaternion);

            // set pos
            this.position.x = glb.camera.position.x;
            this.position.y = glb.camera.position.y;
            this.position.z = glb.camera.position.z;

            const cameraDirection = new three.Vector3();
            glb.camera.getWorldDirection(cameraDirection);
            cameraDirection.multiplyScalar(20);
            this.position.add(cameraDirection);

            this.position.add(positionOffset);
            this.quaternion.copy(rotationOffset);
            
            updateObj();
        } else {
            this.pressed = false;
            this.move = false;
        }

    }

}