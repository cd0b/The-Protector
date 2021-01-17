import * as three from './../../lib/three.js-master/build/three.module.js';
import {loadModel} from './loadModel.js';
import {glb} from './../global/global.js';
import {RockPos} from "./RockPositionGraph/RockPos.js";
import {RockPositionGraph} from "./RockPositionGraph/RockPositionGraph.js";

export async function createRocks(){

    const mp = 0.15;
    const rockPositions=[];
    async function createRock(name,scale,x,z){
        const rock =await loadModel(name,"gltf",scale);
        rock.namelessActionList.forEach((action) => action.play());
        rock.position.x = x;
        rock.position.z = z;
        rockPositions.push(new RockPos(rock.position.x, rock.position.z));
        glb.scene.add(rock);
    }
    for(let i=0;i<glb.rock3Position.length;i++){
        let rc =glb.rock3Position[i];
        await createRock('rock2',3,rc[0]*mp,rc[1]*mp);
    }
    for(let i=0;i<glb.mountain.length;i++){
        let mo =glb.mountain[i];
        await createRock('rock3',0.1,mo[0],mo[1]);
    }
    for(let i=0;i<glb.rock2Position.length;i++){
        let rc2 =glb.rock2Position[i];
        await createRock('rock1',0.07,rc2[0]*mp,rc2[1]*mp);
    }

    glb.rockPositionGraph = new RockPositionGraph(rockPositions);
}