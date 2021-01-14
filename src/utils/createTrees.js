"use strict";



import * as three from './../../lib/three.js-master/build/three.module.js';
import {loadModel} from './loadModel.js';
import {glb} from './../global/global.js';
import {TreePos} from './TreePositionGraph/TreePos.js'
import {TreePositionGraph} from './TreePositionGraph/TreePositionGraph.js';


export async function createTrees() {

    const treePositions = [];

    async function createTree(name, scale, x, z) {
        const tree = await loadModel(name, 'gltf', scale);
        tree.namelessActionList.forEach((action) => action.play());
        tree.position.x = x;
        tree.position.z = z;
        treePositions.push(new TreePos(tree.position.x, tree.position.z));
        glb.scene.add(tree);
    }


    // use this function to create new three
    // await createTree(name, scale, positionX, positionZ);
    const mp = 0.15;
    await createTree('tree1', 0.02, -450*mp, 200*mp);
    await createTree('tree2', 3, -250*mp, 300*mp);

    await createTree('tree1', 0.02, 0*mp, 200*mp);
    await createTree('tree2', 3, 200*mp,200*mp);

    await createTree('tree1', 0.02, 450*mp, 300*mp);
    await createTree('tree2', 3, -400*mp, -400*mp);

    await createTree('tree1', 0.02, -150 * mp, -400 *mp);
    await createTree('tree2', 3, 0 * mp, -400 * mp);

    await createTree('tree1', 0.02, 150 * mp, -400 * mp);
    await createTree('tree2', 3, 400 * mp, -400 * mp);

    await createTree('tree1', 0.02, 0 * mp, 0 * mp);

    glb.treePositionGraph = new TreePositionGraph(treePositions);

}