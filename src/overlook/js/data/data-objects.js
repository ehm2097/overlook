

angular.module("overlook")

.factory("okDataObjects", function(){

    function DataObjectFactory(fields){
        DataObject.prototype.copy = copy;

        function copy(destination){
            var dataObject = this;
            destination = destination ? destination : new DataObject();

            fields.forEach(function(field){
                /*
                var name = field.name;
                if(destination instanceof DataObject)
                    destination[name] = dataObject[name];
                else destination[name] = dataObject[name].json();
                */
                if(destination instanceof DataObject)
                   field.copy(dataObject, destination);
                else field.unwrap(dataObject, destination);
            });
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
                fields.forEach(function(field){
                    /*
                    var name = field.name;
                    let value = object ? object[name] : null;
                    wrapped[name] = new field.type(value);
                    */
                   field.wrap(object, wrapped);
                });
            }
            return wrapped;    
        }
    }

    return {
        createFactory: function(fields){
            return new DataObjectFactory(fields);
        }
    }
})