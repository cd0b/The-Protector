
const Global = function() {

    this.getPath = function() {
        const paths = [...arguments];
        let result = "";

        for(let path of paths)
            result += "/" + path;

        result = result.replace(/\/+/g, "/");

        return result;
    }

    this.projectFolder = "Game";

    this.audioLocation = this.getPath(this.projectFolder, "audio");

    this.textureLocation = this.getPath(this.projectFolder, "images/textures/");
    this.cubeTextureLocation = this.getPath(this.textureLocation, "cube/");

    this.skyboxSize = 1000;
    this.skyboxPath = this.getPath(this.textureLocation, "skybox/");

    this.modelPath = this.getPath(this.projectFolder, "models/");

    this.animationMixers = [];
    this.controllers = [];

    this.landSize = 150;

    this.charName = "jollen";
    this.charAnimations = ["idle", "petting animal", "run", "run back"];
    this.charScale = 0.03;
    this.char = null;
    this.charController = null;
    this.charGarbageRange = 8;
    this.charBirdRunRange = 16;
    this.charBirdHealRange = 8;

    this.treeGraphPartition = 5;


    this.birdModels = ["bird8", "bird1", "bird3", "bird5", "bird6"];
    this.birdScales = [0.1, 0.5, 2.0, 1.0, 0.7];
    this.birdCount = 10;
    this.birdCharRange = this.charBirdRunRange;
    this.birdIdleOnTreeWaitMin = 3;
    this.birdIdleOnTreeWaitMax = 10;
    this.birdFlyToGroundWait = 4;
    this.birdFlyToGroundWaitAfterCollision = 3;
    this.birdIdleOnGroundWait = 2;
    this.birdEatWait = 5;
    this.birdSickWait = 10;
    this.birdHealedWait = 5;
    this.birdSounds = ["bird2.wav", "bird3.wav", "bird4.wav", 
                    "bird5.wav", "bird6.wav", "bird7.wav", 
                    "bird8.wav", "bird9.wav", "bird10.wav", 
                    "bird11.wav", "bird12.wav", "bird13.wav", 
                    "bird14.wav", "bird15.wav", "bird16.wav", 
                    "bird17.wav", "bird18.wav", "bird19.wav", 
                    "bird20.wav", "bird21.wav", "bird22.wav", 
                    "bird23.wav", "bird24.wav"];
    this.birdVelocity = 60.0;

    this.garbageModels = ["garbage1"];
    this.garbageScales = [0.3];
    this.garbageHighs = [-1.0];
    this.garbageRange = [5,15];
    this.garbageController = null;
    this.maxGarbageCount = 2;
    this.garbageCreationTime = 5;
    this.collectedGarbage = 0;


    this.dayLength = 144.0;
    this.sun = null;
    this.sunRadius = 2.0;




    this.otherUpdatables = [];

    this.rockGraphPartition = 5;
    this.rock3Position = [
        [350, 450],
        [350, 450],
        [150, 200],
        [300, 250],
        [150,   0],
        [ -50, -150],
        [-450, -400],
        [-250, -150],
        [-450, -200],
        [-200, -450]
    ];
    this.rock2Position = [
        [500,500],
        [-500,500],
        [-475,500],
        [-450,500],
        [-400,500],
        [-375,500],
        [-500,475],
        [-500,450],
        [-500,400],
        [475,500],
        [450,500],
        [425,500],
        [400,500],
        [500,475],
        [500,450],
        [500,475]
    ];
    this.mountain = [[200,200],[200,-100],[-200,150],[-200,-150],[-200,100],[-200,-100],[-90,-90]];


    this.tree1positions = [
        [-450,450],
        [-250,350],
        [0,350],
        [-250,250],
        [50,100],
        [150,0],
        [350,50],
        [450,350],
        [-250,-350],
        [0,-350],
        [-250,-250],
        [0,-250],
        [50,-100],
        [250,-350],
        [450,-350]
    ];
    this.tree2positions = [
        [-150,150],
        [0,250],
        [150,250],
        [250,50],
        [350,450],
        [-450,-50],
        [150,-450],
        [350,-150],
        [450,-50]
    ];
    
};

export const glb = new Global();