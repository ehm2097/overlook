
angular.module("overlook")

.factory("okPageData", ["$q", "okData", "okRouteParams", "$route", function($q, okData, okRouteParams, $route){

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

                var fields = [];

                this.init = function(){
                    var data = {};
                    fields.forEach(function(field){
                        data[field.source] = new field.type();
                    });
                    return {
                        data: data,
                        newRow: true,
                        invoke: function(name){
                            var values = {};
                            fields.forEach(function(field){
                                values[field.source] = data[field.source].json();
                            })
                            return okData[name](values);
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
                                var data = result.data[i];
                                fields.forEach(function(field){
                                    data[field.source] = new field.type(data[field.source])
                                });

                                result.data[i] = {
                                    data: data,
                                    newRow: false,
                                    invoke: function(name){
                                        var values = {};
                                        fields.forEach(function(field){
                                            values[field.source] = data[field.source].json();
                                        })
                                        return okData[name](values);
                                    }
                                }
                            }
                            resolve(result);
                        }, reject);
                    });
                }

                this.copy = function(source, target){
                    var result = target ? target : this.init();
                    fields.forEach(function(field){
                        result.data[field.source] = source.data[field.source].clone();
                    }) 
                    result.newRow = source.newRow;
                    return result;
                }

                // Additional information made available on entity handler
                this.getName = function(){ return entityDef.name; };
                this.getSelection = function(){ return selection; };
                this.getCaptionSingle = function() { return entityDef.captionSingle };
                this.getCaptionMultiple = function() { return entityDef.captionMultiple };

                this.registerField = function(field){
                    fields.push(field);
                }

                // Register as a managed entity
                entities[entityDef.name] = this;
            }

            return new EntityHandler();
        }
    }

    return new PageDataService();
}]);