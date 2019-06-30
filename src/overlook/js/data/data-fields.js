
angular.module("overlook")

.factory("okDataField", ["okDataTypes", function(okDataTypes){

    function SingleValueField(fieldName, typeName) {

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
}])