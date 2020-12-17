"use strict";


/*
 * 
 * Shader code generator will be updated
 * createProgram's argument will be updated
 * 
 */



function ShaderCompilingError(msg) {
    this.name = "ShaderCompilingError";
    this.message = msg;
}

function ProgramLinkingError(msg) {
    this.name = "ProgramLinkingError";
    this.message = msg;
}






const Cs = function() {
    
    if(Cs.prototype._cs)
        return Cs.prototype._cs;
    
    
    // helper variables
    let widthRatio = null;
    let heightRatio = null;
    const whRatio = 0.98;
    
    // helper functions
    function windowInnerWidth() {
        return window.innerWidth * whRatio;
    }
    function windowInnerHeight() {
        return window.innerHeight * whRatio;
    }
    function screenWidth() {
        return window.screen.width * whRatio;
    }
    function screenHeight() {
        return 0.4427 * window.screen.height * whRatio;
    }
    const isCanvas = function isCanvas() {
        return (this.canvas !== undefined && this.canvas !== null);
    }.bind(this);
    const isGl = function isGl() {
        return (this.gl !== undefined && this.gl !== null);
    }.bind(this);
    const isProgram = function() {
        return (this.program !== undefined && this.program !== null);
    }.bind(this);
    const fullSize = function fullSize() {
        this.canvas.width = windowInnerWidth();
        this.canvas.height = windowInnerHeight();
        
        widthRatio = 1;
        heightRatio = 1;
    }.bind(this);
    const setSize = function setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        
        widthRatio = width / screenWidth();
        heightRatio = height / screenHeight();
    }.bind(this);
    function autoSize() {
        window.addEventListener("resize", updateSize);
    }
    const updateSize = function updateSize() {
        this.canvas.width = windowInnerWidth() * widthRatio;
        this.canvas.height = windowInnerHeight() * heightRatio;
    }.bind(this);
    
    
    
    
    
    
    
    const gm = new GlMath();
    
    
    
    this.canvas = null;
    this.gl = null;
    this.program = null;
    
    
    /*
     * creating canvas in scene
     * options
     * 
     * int width
     * int heigth
     * boolean autoSize
     * boolean fullSize
     * 
     * if fullSize true width and height is not important
     * if autoSize is true it will use width / window.width and height / window.height ratios
     * 
     */
    this.createCanvas = function(settings = {
        width: 600,
        height: 400,
        fullSize: true,
        autoSize: true,
    }) {
        if(isCanvas())
            return;
        const width = settings.width;
        const height = settings.height;
        const as = settings.autoSize;
        const fs = settings.fullSize;
        
        // create a canvas
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        
        // set canvas size
        if(fs)
            fullSize();
        else
            setSize(width, height);
        
        // set auto size
        if(as)
            autoSize();
    }
    this.removeCanvas = function() {
        if(!isCanvas())
            return;
        
        widthRatio = null;
        heightRatio = null;
        
        this.removeGl();
        this.canvas = null;
    }
    
    
    
    /*
     * if no canvas create one
     * if there is canvas get a webgl2 context object from canvas
     * 
     */
    this.createGl = function() {
        if(!isCanvas())
            this.createCanvas();
        else if(isGl())
            return;
        
        this.gl = this.canvas.getContext("webgl2");
    }
    this.removeGl = function() {
        if(!isGl())
            return;
        
        removeProgram();
        this.gl = null;
    }
    
    
    
    /*
     * generate shader code according to settings
     * compile shaders
     * link program
     * use program
     *
     */
    /*
     * helper function to generate shader
     */
    function generateShaderCode(settings) {
        // this function will be updated!
        // return [vertexShaderCode, fragmentShaderCode]
        return [`#version 300 es
                in vec4 vPosition;
                in vec4 vColor;
                out vec4 fColor;

                uniform mat4 rotateMat;
                uniform mat4 translationMat;


                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;

                void main() 
                {
                    vec4 pos = projectionMatrix * modelViewMatrix * rotateMat * translationMat * vPosition;
                    //pos[3] = 1.0;
                    gl_Position = pos;
                    //gl_Position = S*vPosition;
                    fColor = vColor;
                } `, 
            `#version 300 es
            #ifdef GL_ES
            precision highp float;
            #endif

            in vec4 fColor;
            out vec4 color;

            void main()
            {
                color = fColor;
            }`];
    }
    /*
     * helper function
     * compile shaders
     * 
     */
    const compileShader = function compileShader(shaderCode, shaderType) {
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, shaderCode);
        this.gl.compileShader(shader);
        
        if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
            return {
                shader: shader,
                success: true,
                message: "",
            };
        else 
            return {
                shader: shader,
                success: false,
                message: `Compile error: ${shaderType}\n${this.gl.getShaderInfoLog(shader)}\n`,
            };
    }.bind(this);
    const linkProgram = function linkProgram(vertexShader, fragmentShader) {
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        
        if(this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
            return {
                success: true,
                message: "",
            };
        else
            return {
                success: false,
                message: `Link error: ${this.gl.getProgramInfoLog(this.program)}\n`,
            };
    }.bind(this);
    this.createProgram = function(settings = {
        none: "none", // we will update this settings
    }) {
        if(!isGl())
            this.createGl();
        else if(isProgram())
            return;
        
        // generate shader code according to settings
        const [vertexShaderCode, fragmentShaderCode] = generateShaderCode(settings);
        
        
        // compile shaders
        let vertexShader = null, fragmentShader = null;
        
        const vertexShaderObj = compileShader(vertexShaderCode, this.gl.VERTEX_SHADER);
        if(vertexShaderObj.success)
            vertexShader = vertexShaderObj.shader;
        else
            throw new ShaderCompilingError(vertexShaderObj.message);
        
        const fragmentShaderObj = compileShader(fragmentShaderCode, this.gl.FRAGMENT_SHADER); 
        if(fragmentShaderObj.success)
            fragmentShader = fragmentShaderObj.shader;
        else
            throw new ShaderCompilingError(fragmentShaderCode.message);
        
        
        // create and link program
        this.program = this.gl.createProgram();
        const linkerObject = linkProgram(vertexShader, fragmentShader);
        if(!linkerObject.success)
            throw new ProgramLinkingError(linkerObject.message);
        
        this.gl.useProgram(this.program);
        
    }
    this.removeProgram = function() {
        if(!isProgram())
            return;
        
        this.gl.useProgram(null);
        this.program = null;
    }
    
    
    
    
    
    Cs.prototype._cs = this;
    
}