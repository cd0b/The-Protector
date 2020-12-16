"use strict";



function ObjFileNotExistError(filename, name) {
	this.name = "ObjFileNotExistError";
	this.message = `Can not find obj file!\npath: ${filename}\nname: ${name}`;
}



// .obj file parser
function ObjLoader() {
    
        if(ObjLoader.prototype._loader)
            return ObjLoader.prototype._loader;
        
        let gm = new GlMath();
        let objects = new Map();
                
        // get object with name
        this.obj = function(name) {
            return objects.get(name);
        }
            
        this.parse = async function(filename, name) {
                    
                let fileObject = {
                        v: [gm.vec4()],
                        f: [],
                };
                
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
        
        this.getVertexArray = function(obj1) {
            
            
            let gm = new GlMath();
            let vertexArray = [];
            
            obj1.f.forEach(function(item) {
                vertexArray.push(obj1.v[item[0]]);
                vertexArray.push(obj1.v[item[1]]);
                vertexArray.push(obj1.v[item[2]]);
            });
            
            return vertexArray;
        }
        
        
        
        ObjLoader.prototype._loader = this;
}
