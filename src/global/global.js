
"use strict";

const Global = function() {

    this.getPath = function() {
        const paths = [...arguments];
        let result = "";

        for(let path of paths)
            result += "/" + path;

        result = result.replace(/\/+/g, "/");

        return result;
    }

    this.projectFolder = "";

    this.audioLocation = this.getPath(this.projectFolder, "audio");

    this.textureLocation = this.getPath(this.projectFolder, "images/textures/");
    this.cubeTextureLocation = this.getPath(this.textureLocation, "cube/");

    this.skyboxSize = 1000;
    this.skyboxPath = this.getPath(this.textureLocation, "skybox/");

    this.modelPath = this.getPath(this.projectFolder, "models/");

    this.animationMixers = [];
    this.controllers = [];

    this.landSize = 150;
    this.gameSpeed = 1.0;

    this.charName = "jollen";
    this.charAnimations = ["idle", "petting animal", "run", "run back"];
    this.charScale = 0.03;
    this.char = null;
    this.charController = null;
    this.charGarbageRange = 8;
    this.charBirdRunRange = 16;
    this.charBirdHealRange = 8;
    this.charHand = false;

    this.treeGraphPartition = 5;

    

    //this.birdModels = ["bird8", "bird1", "bird5", "bird6"];
    this.birdModels = ["redcoat"];
    //this.birdScales = [0.1, 0.5, 1.0, 0.7];
    this.birdScales = [0.005];
    this.birdCount = 10;
    this.birdCharRange = this.charBirdRunRange;
    this.birdIdleOnTreeWaitMin = 3;
    this.birdIdleOnTreeWaitMax = 10;
    this.birdFlyToGroundWait = 4;
    this.birdFlyToGroundWaitAfterCollision = 5;
    this.birdIdleOnGroundWait = 5;
    this.birdEatWait = 10;
    this.birdSickWait = 15;
    this.birdHealedWait = 5;
    this.birdSounds = ["bird24.wav"];
    this.birdVelocity = 60.0 * this.gameSpeed;
    this.scarecrows = [];
    this.birdScarecrowRange = 16;

    this.garbageModels = ["garbage1","garbage2"];
    this.garbageScales = [0.3, 0.2];
    this.garbageHighs = [-1.0, -0.001];
    this.garbageRange = [5,15];
    this.garbageController = null;
    this.maxGarbageCount = 2;
    this.garbageCreationTime = 5;
    this.collectedGarbage = 0;


    this.dayLength = 288.0;
    this.sun = null;
    this.sunRadius = 2.0;



    this.spaceHamsterHigh = 4;



    this.shipVelocity = 1.0 * this.gameSpeed;



    this.otherUpdatables = [];
    
};

export const glb = new Global();
