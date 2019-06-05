
angular.module("overlook").component("okField", {
    controller: ["okDataTypes", function(okDataTypes){
        this.$onInit = function(){

            var type = (this.okDataType) ? this.okDataType : "text";

            var field = {
                name: this.okName,
                caption: this.okCaption,
                usage: this.okFieldUsage,
                type: okDataTypes[type]
            };
            field.getDisplayValue = function(dataObject){
                return dataObject[field.name].display();
            }
            this.entity.registerField(field);
        };
    }],
    bindings: {
        okName: "@",
        okCaption: "@",
        okFieldUsage: "@",
        okDataType: "@"
    },
    require: {
        entity: "^okEntity"
    }
});
