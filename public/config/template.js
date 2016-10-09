'use strict';

define(function(){
    return { 
        load: function(resourceName, parentRequire, callback, config){ 

            parentRequire([ ("text!" + resourceName) ], function( templateContent ){
                // Create the templates node.
                var importedTemplate = $( templateContent );
                
                // allow a template file to contain more than one script tag
                importedTemplate.each(function(index, el){
                    // attach each script tag
                    if(el.tagName === "SCRIPT"){
                        $('head').append(el);
                    }
                });

                // Create a jQuery DOM element out of the template markup and pass it back to the loader.
                // even though the template file may have had more than one script tag, 
                // for now we will just return the first one to be used in the callback
                callback( $(importedTemplate[0]).html() );
            });
        }
    }; 
});