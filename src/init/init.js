"use strict";

import {createScene} from './createScene.js';
import {createCamera} from './createCamera.js';
import {createRenderer} from './createRenderer.js';
import {setAutoSize} from './setAutoSize.js';
import {createCanvas} from './createCanvas.js';
import {render} from './render.js';
import { createMap } from './createMap.js';
import {createSun} from './createSun.js';
import { createListener } from './createListener.js';

export function init() {
    createScene();
    createCamera();
    createListener();
    createRenderer();
    setAutoSize();
    createCanvas();
    createMap();
    createSun();
    render();
}