"use strict";



function ObjFileNotExistError(filename, name) {
	this.name = "ObjFileNotExistError";
	this.message = `Can not find obj file!\npath: ${filename}\nname: ${name}`;
}



// .obj file parser
function ObjLoader() {
    
        if(ObjLoader.prototype._loader)
            return ObjLoader.prototype._loader;
        
        const gm = new GlMath();
        const objects = new Map();
        
        const fileObj = function() {   
            this.v = [gm.vec4()];
            this.f = [];
            
            Object.defineProperty(this, "indices", {
                get: function() { return this.f; },
                enumerable: false,
                configurable: false,
            });
            Object.defineProperty(this, "vertices", {
                get: function() { return this.v; },
                enumerable: false,
                configurable: false,
            });
        }
                
        // get object with name
        this.obj = function(name) {
            return objects.get(name);
        }
            
        this.load = async function(filename, name) {
                    
                let fileObject = new fileObj();
                
                // load file
                let response = await fetch(filename);
                
                if(response.ok) {
                        let text = await response.text();
                        
                        let regexpVertices = new RegExp(`v (-?[0-9]\.[0-9]+e?-?[0-9]*[\r\n ])*`, `g`);
                        let subRegexpVertices = new RegExp(`-?[0-9]\.[0-9]+e?-?[0-9]*`, `g`);
                        let matchesVertices = text.match(regexpVertices);
                        
                        for(let matchWith of matchesVertices) {
                                let [x, y, z] = matchWith.match(subRegexpVertices);
                                fileObject.v.push(gm.nor(gm.vec4(Number(x), Number(y), Number(z), 1.0)));
                        }
                        
                    
                        let regexpIBO = new RegExp(`f ([0-9]+[\r\n ])*`, `g`);
                        let subRegexpIBO = new RegExp(`[0-9]+`, `g`);
                        let matchesIBO = text.match(regexpIBO);
                        for(let matchWith of matchesIBO) {
                            let [p1, p2, p3] = matchWith.match(subRegexpIBO);
                            fileObject.f.push(gm.vec3(Number(p1), Number(p2), Number(p3)));
                        }
                        
                        objects.set(name, fileObject);
                }else {
					throw new ObjFileNotExistError(filename, name);
                }
        }
        
        ObjLoader.prototype._loader = this;
}
