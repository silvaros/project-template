'use strict';

define(function(){
	return {
		ns: function(rootObj, namespace, objToNamespace){
            var paths = namespace.split('.');
            var pathPartObj = rootObj;
            var i = 0;

            while(i < paths.length){
                var currentNSPart = paths[i++];
                var pathPartProperty = pathPartObj[currentNSPart];
                // if the current object property is undefined
                if(pathPartProperty === undefined) { 
                    // set the passed object if this is the last part in the namespace, other wise {}
                    pathPartObj[currentNSPart] = i === paths.length? objToNamespace : {}; 
                    
                }

                pathPartObj = pathPartObj[currentNSPart];
            }

            return pathPartObj;

        }, 

        lookUpValue: function(root, path){
            var value = root;
            var paths = (path || '').split('.');
            var i = 0;
            
            while( value !== undefined && i < paths.length ){
                // set value to the property name of the current value obj
                var pathPart = paths[i++];
                if(pathPart === '')
                    value = undefined;
                else
                    value = value[pathPart];
                
            }
            
            return value;
        }
    }
});