
// FIX: array wrapping no longer used in this configuration

angular.module("overlook")

.factory("okDataObjects", function(){

    function DataObjectFactory(descriptor){
        DataObject.prototype.copy = copy;

        function copy(destination){
            destination = destination ? destination : new DataObject();
            for(prop in descriptor) {
                if(destination instanceof DataObject)
                    destination[prop] = this[prop];
                else destination[prop] = this[prop].json();
            }
            return destination;
        }

        function DataObject(){}

        this.create = function(object){
            let wrapped = null;
            if(Array.isArray(object)){
                wrapped = [];
                for(i in object){
                    wrapped.push(this.create(object[i]));
                }
            }
            else {
                wrapped = new DataObject();
                for(prop in descriptor){
                    let value = object ? object[prop] : null;
                    wrapped[prop] = new descriptor[prop](value);
                }
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