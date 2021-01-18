"use strict";


import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js';
import {glb} from './../global/global.js';
import {loadTexture} from './../utils/loadTexture.js';
import {Water} from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r124/examples/jsm/objects/Water.js';





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
    mesh.rotation.x = -0.5 * Math.PI;

    // add to scene.
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
            sunDirection: new three.Vector3(0,1,0),
            sunColor: 0xfc7f03,
            waterColor: 0x3599FD,
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

}