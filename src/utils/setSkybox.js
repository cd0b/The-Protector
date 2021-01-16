"use strict";

import {glb} from './../global/global.js';
import {loadTexture} from './loadTexture.js';
import {Skybox} from './Skybox/Skybox.js';




export async function setSkybox() {

    const textureSunrise = await loadTexture("colors/sunrise.png", true);
    const textureDay = await loadTexture("colors/day.png", true);
    const textureNight = await loadTexture("colors/night.png", true);
    const textureSunset = await loadTexture("colors/sunset.png", true);

    const texture = {
        sunrise: textureSunrise,
        day: textureDay,
        night: textureNight,
        sunset: textureSunset,
    };

    const skybox = new Skybox(texture);
    glb.otherUpdatables.push(skybox);

}