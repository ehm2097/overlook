
angular.module("overlook")

.factory("okDataObjects", function(){

    function DataObjectFactory(descriptor){
        this.create = function(object){

            var wrapped = {};

            for(prop in descriptor){
                wrapped[prop] = new descriptor[prop](object[prop]);
            }

            wrapped.copy = function(destination){
                for(prop in descriptor){
                    console.log(wrapped[prop]);
                    destination[prop] = wrapped[prop].json();
                }
                return destination;
            }

            return wrapped;
        }
    }

    return {
        createFactory: function(descriptor){
            return new DataObjectFactory(descriptor);
        }
    }
})