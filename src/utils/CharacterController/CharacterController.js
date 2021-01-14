"use strict";



import * as three from '../../../lib/three.js-master/build/three.module.js';
import {CharacterControllerProxy} from './CharacterControllerProxy.js';
import {ChararacterControllerInput} from './CharacterControllerInput.js';
import {CharacterFiniteStateMachine} from './CharacterFiniteStateMachine.js';
import { glb } from '../../global/global.js';






export function CharacterController(params) {

    this._params = params;
    this._target = params.model;
    this._decceleration = new three.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new three.Vector3(1, 0.25, 50.0);
    this._velocity = new three.Vector3(0, 0, 0);
    this._position = new three.Vector3();

    this._animations = {};

    this._input = new ChararacterControllerInput();
    this._stateMachine = new CharacterFiniteStateMachine(new CharacterControllerProxy(this._animations));

    for(let actionName of params.model.actionNames) {
        this._animations[actionName] = {
            action: params.model[actionName],
            clip: params.model[actionName].getClip(),
        };
        for(let i = 0; i < glb.animationMixers.length; i++)
            if(params.model[actionName].getMixer() === glb.animationMixers[i]) {
                glb.animationMixers.splice(i, 1);
            }
        delete params.model[actionName];
    }

    delete params.model.actionNames;


    this.getPosition = function() {
        return this._position;
    }

    this.getRotation = function() {
        return this._target.quaternion;
    }



    this.update = function(timeInSecods) {
        this._stateMachine.update(timeInSecods, this._input);

        // map sea collision
        if(glb.char.position.x>glb.landSize/2){
            glb.char.position.x = glb.landSize/2-0.001;
        }
        if(glb.char.position.x<-glb.landSize/2){
            glb.char.position.x = -glb.landSize/2+0.001;
        }
        if(glb.char.position.z>glb.landSize/2){
            glb.char.position.z = glb.landSize/2-0.001;
        }
        if(glb.char.position.z<-glb.landSize/2){
            glb.char.position.z = -glb.landSize/2+0.001; 
        }


        const velocity = this._velocity;
        const frameDecceleration = new three.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSecods);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));
        velocity.add(frameDecceleration);
        
        const controlObject = this._target;
        const _Q = new three.Quaternion();
        const _A = new three.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();
        
        if(this._stateMachine._currentState.getName() === "pettingAnimal")
            acc.multiplyScalar(0.0);

        if(this._input._keys.forward)
            velocity.z += acc.z * timeInSecods;

        if(this._input._keys.backward)
            velocity.z -= acc.z * timeInSecods;

        if(this._input._keys.left) {
            _A.set(0,1,0);
            _Q.setFromAxisAngle(_A, 1.20 * Math.PI * timeInSecods * this._acceleration.y);
            _R.multiply(_Q);
        }

        if(this._input._keys.right) {
            _A.set(0,1,0);
            _Q.setFromAxisAngle(_A, 1.20 * -Math.PI * timeInSecods * this._acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new three.Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new three.Vector3(0,0,1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideway = new three.Vector3(1, 0, 0);
        sideway.applyQuaternion(controlObject.quaternion);
        sideway.normalize();

        sideway.multiplyScalar(velocity.x * timeInSecods);
        forward.multiplyScalar(velocity.z * timeInSecods);

        controlObject.position.add(forward);
        controlObject.position.add(sideway);

        this._position.copy(controlObject.position);
    }

    glb.controllers.push(this);
    glb.charController = this;
    this._stateMachine.setState("idle");

}