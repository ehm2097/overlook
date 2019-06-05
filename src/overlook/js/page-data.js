
angular.module("overlook")

.factory("okPageData", ["$q", "okData", "okDataObjects", "okRouteParams", "$route", function($q, okData, okDataObjects, okRouteParams, $route){

    function PageDataService(){

        var entities = null;

        function Selection(){
            // TODO: Provide support for multiple selection
            var current = null;
        
            this.reset = function(){
                current = null;
            }
        
            this.select = function(item){
                current = item;
            }
            this.isSelected = function(item){
                return (item === current);
            }
            this.current = function(){
                return current;
            }    
            this.count = function() {
                return current == null ? 0 : 1;
            }
        }

        
        this.initialize = function(){
            entities = {};
        }

        this.registerEntity = function(entityDef){
            function EntityHandler(){

                var factory = new function(){
                    //var descriptor = {};
                    var factory = null;

                    this.get = function(){
                        if(!factory) 
                            factory = okDataObjects.createFactory(entityDef.fields);
                        return factory;
                    }

                    /*
                    this.addField = function(name, type){
                        descriptor[name] = type;
                    }
                    */
                };


                var selection = new Selection();

                // Build object to store expected arguments
                var fArray = angular.copy(okData[entityDef.source]);
                var args = {};
                var sourceFn = fArray.pop();
                fArray.forEach(function(arg){ args[arg] = null; });
                
                // Populate arguments with values from route
                okRouteParams.decode(args, $route.current.params.params);

                // Identify parent entity if any
                var parent = (entityDef.parent) ? entities[entityDef.parent] : null;


                this.init = function(){
                    var data = factory.get().create(); 
                    return {
                        data: data,
                        newRow: true,
                        invoke: function(name){
                           return okData[name](data.copy({}));
                        }
                    };
                }

                this.retrieve = function(){

                    // Override query arguments with parent data if available
                    var localArgs = angular.copy(args);
                    if(parent){
                        var parentSelection = parent.getSelection().current();
                        if(parent && parentSelection) {
                            var parentData = parentSelection;
                            for(arg in localArgs){
                                if (parentData[arg]) localArgs[arg] = parentData[arg];
                            }
                        }
                    }

                    // Invoke known retrieve function
                    return $q(function(resolve, reject){
                        sourceFn(localArgs).then(function(result){
                            for(i in result.data){
                                var data = factory.get().create(result.data[i]);

                                result.data[i] = {
                                    data: data,
                                    newRow: false,
                                    invoke: function(name){
                                        return okData[name](data.copy({}));
                                    }
                                }
                            }
                            resolve(result);
                        }, reject);
                    });
                }

                this.copy = function(source, target){
                    var result = target ? target : this.init();
                    source.data.copy(result.data);
                    result.newRow = source.newRow;
                    return result;
                }

                // Additional information made available on entity handler
                this.getName = function(){ return entityDef.name; };
                this.getSelection = function(){ return selection; };
                this.getCaptionSingle = function() { return entityDef.captionSingle };
                this.getCaptionMultiple = function() { return entityDef.captionMultiple };
                
                this.forEachField = function(fieldAction) {
                    entityDef.fields.forEach(function(field){
                        fieldAction(field);
                    });
                } 

                /*
                this.registerField = function(field){
                    factory.addField(field.source, field.type);
                }
                */

                // Register as a managed entity
                entities[entityDef.name] = this;
            }

            return new EntityHandler();
        }
    }

    return new PageDataService();
}]);