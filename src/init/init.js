"use strict";

import {createScene} from './createScene.js';
import {createCamera} from './createCamera.js';
import {createRenderer} from './createRenderer.js';
import {setAutoSize} from './setAutoSize.js';
import {createCanvas} from './createCanvas.js';
import {render} from './render.js';
import { createMap } from './createMap.js';

export function init() {
    createScene();
    createCamera();
    createRenderer();
    setAutoSize();
    createCanvas();
    createMap();
    render();
}