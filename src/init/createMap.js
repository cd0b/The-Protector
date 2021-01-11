"use strict";


import * as three from '../../lib/three.js-master/build/three.module.js';
import {glb} from './../global/global.js';
import {loadTexture} from './../utils/loadTexture.js';
import {createPerlinNoiseCanvas} from './../utils/createPerlinNoiseCanvas.js';
import {Water} from './../../lib/three.js-master/examples/jsm/objects/Water.js';
import {Sky} from './../../lib/three.js-master/examples/jsm/objects/Sky.js';



function Sun() {

    

    this.update = function() {

        let sunPosition = new three.Vector3();

        if(glb.sea)
            glb.sea.material.uniforms["sunDirection"].value.copy(sunPosition);
    }

    glb.sun = this;

}




function createSun() {

    

}






async function createLand() {

    const landSizeS = glb.landSize / 10;

    // geometry
    const geometry = new three.PlaneGeometry(glb.landSize, glb.landSize,landSizeS, landSizeS);


    // loading textures
    function wrapTexture(texture) {
        texture.wrapS = three.RepeatWrapping;
        texture.wrapT = three.RepeatWrapping;
        texture.repeat.set(landSizeS, landSizeS);
        return texture;
    }

    const grassFolder = 'Grass1/';
    const grassTexture = wrapTexture(await loadTexture(grassFolder + 'color.jpg'));
    const dispTexture = wrapTexture(await loadTexture(grassFolder + 'disp.png'));
    const normTexture = wrapTexture(await loadTexture(grassFolder + 'norm.jpg'));
    const occTexture = wrapTexture(await loadTexture(grassFolder + 'occ.jpg'));
    //const specTexture = wrapTexture(await loadTexture(grassFolder + 'spec.jpg'));
    //const bumpTexture = wrapTexture(new three.Texture(createPerlinNoiseCanvas(1024, 1024)));

    // material
    const material = new three.MeshPhongMaterial({
        color: 0x202020,
        map: grassTexture,
        displacementMap: dispTexture,
        normalMap: normTexture,
        aoMap: occTexture,
        //specularMap: specTexture,
    });

    // create plane
    const mesh = new three.Mesh(geometry, material);


    // add to scene.
    mesh.rotation.x = -0.5 * Math.PI;
    glb.scene.add(mesh);

    glb.land = mesh;

}



function createSea() {
    const seaGeometry = new three.PlaneBufferGeometry(10000, 10000);

    const sea = new Water(seaGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new three.TextureLoader().load( 'images/textures/water.jpg', function ( texture ) { texture.wrapS = texture.wrapT = three.RepeatWrapping; }),
            alpha: 1.0,
            sunDirection: new three.Vector3(0,0,0),
            sunColor: 0xfc7f03,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: glb.scene.fog !== undefined
        });

    sea.rotation.x = -0.5 * Math.PI;

    glb.scene.add(sea);

    glb.sea = sea;
}





export async function createMap() {


    await createLand();
    createSea();
    createSun();

}