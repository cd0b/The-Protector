"use strict";



export function RockPos(x, z) {
    this.x = x;
    this.z = z;

    this.toString = function() {
        return this.x.toString() + "," + this.z.toString();
    }
}