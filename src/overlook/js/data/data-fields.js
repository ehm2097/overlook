
// WORK IN PROGRESS !!!

angular.module("overlook")

.factory("okDataField", ["okDataTypes", function(okDataTypes){

    function SingleValueField(fieldName, typeName) {

        // Internally accessible only!
        var name = fieldName;
        var type = okDataTypes[typeName];

        this.getDisplayValue = function(dataObject) {
            return dataObject[name].display();
        }

        this.getTypeName = function() {
            return type.prototype.getTypeName(); // TODO: explain and fix
        }

        this.getValue = function(source) {
            return source[name];
        }

        this.copy = function(source, destination) {
            destination[name] = source[name].clone();
        }

        this.wrap = function(source, destination) {
            var value = source ? source[name] : null;
            value = new type(value);
            if(destination) destination[name] = value;
            else source[name] = value;
        }

        this.unwrap = function(source, destination) {
            destination[name] = source[name].json();
        }
    }

    return function(fieldName, typeName) {
        return new SingleValueField(fieldName, typeName);
    }

    /*
    return function(typeName){
        var type = okDataTypes[typeName];
        var value = null;

        this.name = null;
        this.caption = null;
        this.usage = null;

        this.init = function() {
            value = new type();
            return value;
        }

        this.display = function() {
            return value.display();
        }
    };
    */
}])