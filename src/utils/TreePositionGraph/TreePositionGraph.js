"use strict";


import {glb} from './../../global/global.js';



const posX = glb.landSize / 2;
const negX = -posX;

const length = glb.landSize / glb.treeGraphPartition;

const treeMatrix = [];


function createTreeMatrix(treePositions) {
    const updatedPosX = posX + length;
    for(let x = negX; x < updatedPosX; x += length) {
        const xMax = x + length;
        
        let xTrees = [];
        for(let treePos of treePositions) {
            if(x <= treePos.x && treePos.x < xMax) {
                xTrees.push(treePos);
            }
        }
        if(xTrees.length > 0) {
            xTrees.sort((pos1, pos2) => pos1.z - pos2.z);
            treeMatrix.push(xTrees);
        }
    }
}




function dist(treePos1, treePos2) {

    return Math.sqrt(Math.pow(treePos1.x - treePos2.x, 2.0) + Math.pow(treePos1.z - treePos2.z, 2.0));

}








export function TreePositionGraph(treePositions) {

    createTreeMatrix(treePositions);

    this.nodes = [];
    this.edges = new Map();


    const addNode = function(node) {

        this.nodes.push(node);
        this.edges.set(node, []);

    }.bind(this);



    const connect = function(node1, node2, weight) {
        if(!this.edges.get(node1))
            addNode(node1);
        if(!this.edges.get(node2))
            addNode(node2);

        this.edges.get(node1).push({n: node2, w: weight});
        this.edges.get(node2).push({n: node1, w: weight});
    }.bind(this);



    const findNode = function(x, z) {
        if(z)
        return this.nodes.find(function(e) {
            if(e.x == x && e.z == z)
                return e;
        });
        return this.nodes.find(function(e) {
            if(e.x == x.x && e.z == x.z)
                return e;
        });
    }.bind(this);



    const dijkstraCache = new Map();
    // no noPath node in graph
    const dijkstra = function(start) {

        const dijk = new Map();
        for(let node of this.nodes) {
            if(node === start)
                dijk.set(node, {v: true, w: 0, p: null});
            else
                dijk.set(node, {v: false, w: Infinity, p: null});
        }
        let visitedCount = 1;

        const selectNearest = function(node) {
            this.edges.get(node).forEach(function(e) {
                const adjEntry = dijk.get(e.n);
                const totalW = dijk.get(node).w + e.w;
                if(!adjEntry.v && adjEntry.w > totalW) {
                    adjEntry.w = totalW;
                    adjEntry.p = node;
                }
            });

            // find nearest vertex
            let nearest = [1,{w: Infinity}];
            for(let d of dijk)
                if(!d[1].v && d[1].w <= nearest[1].w)
                nearest = d;

            nearest[1].v = true;
            visitedCount++;
            
            return nearest[0];
        }.bind(this);

        let current = start;
        while(visitedCount < dijk.size) {
            current = selectNearest(current);
        }

        // set dijkstra cache
        for(let d of dijk) {
            const node = d[0];
            const path = [];

            let visit = node;
            while(visit != null) {
                path.unshift(visit);
                visit = dijk.get(visit).p;
            }

            dijkstraCache.set(start.toString() + " " + node.toString(), path);
            dijkstraCache.set(node.toString() + " " + start.toString(), [...path].reverse());
        }

    }.bind(this);






    this.sp = function(node1, node2) {
        if(!this.edges.get(node1) || !this.edges.get(node2)) {
            node1 = findNode(node1);
            node2 = findNode(node2);
        }

        const searchKey = node1.toString() + " " + node2.toString();
        if(dijkstraCache.has(searchKey)) {
            return dijkstraCache.get(searchKey);
        }
        
        dijkstra(node1);

        return dijkstraCache.get(searchKey);
    }



    for(let i = 0; i < treeMatrix.length; i++) {
        for(let j = 0; j < treeMatrix[i].length; j++) {
            let treePos1 = treeMatrix[i][j], treePos2;
            if(j != treeMatrix[i].length - 1) {
                treePos2 = treeMatrix[i][j+1];
                connect(treePos1, treePos2, dist(treePos1, treePos2));
            }
            if(i != treeMatrix.length - 1) {
                if(j < treeMatrix[i+1].length) {
                    treePos2 = treeMatrix[i+1][j];
                    connect(treePos1, treePos2, dist(treePos1, treePos2));
                }
                else {
                    treePos2 = treeMatrix[i+1][treeMatrix[i+1].length - 1];
                    connect(treePos1, treePos2, dist(treePos1, treePos2));
                }
            }   
        }
    }

    
    

}