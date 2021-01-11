
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

    this.textureLocation = this.getPath(this.projectFolder, "images/textures/");
    this.cubeTextureLocation = this.getPath(this.textureLocation, "cube/");

    this.skyboxSize = 10000;
    this.skyboxPath = this.getPath(this.textureLocation, "cube/");

    this.modelPath = this.getPath(this.projectFolder, "models/");

    this.animationMixers = [];
    this.controllers = [];

    this.landSize = 1000;

    this.charName = "jollen";
    this.charAnimations = ["idle", "petting animal", "run", "run back"];
    this.charScale = 0.03;


    this.treeGraphPartition = 5;


    this.birdModels = ["bird1"];

    
};

export const glb = new Global();