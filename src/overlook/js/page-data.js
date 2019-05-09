
angular.module("overlook")

.factory("okPageData", ["okData", "okRouteParams", "$route", function(okData, okRouteParams, $route){

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

                this.retrieve = function(){

                    // Override query arguments with parent data if available
                    var localArgs = angular.copy(args);
                    if(parent && parent.selection.current()) {
                        var parentData = parent.selection.current();
                        for(arg in localArgs){
                            if (parentData[arg]) localArgs[arg] = parentData[arg];
                        }
                    }

                    // Invoke known retrieve function
                    return sourceFn(localArgs);
                }

                // Additional information made available on entity handler
                this.getSelection = function(){ return selection; };
                this.getCaptionSingle = function() { return entityDef.captionSingle };
                this.getCaptionMultiple = function() { return entityDef.captionMultiple };

                // Register as a managed entity
                entities[entityDef.name] = this;
            }

            return new EntityHandler();
        }
    }

    return new PageDataService();
}]);