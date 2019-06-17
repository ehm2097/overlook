
angular.module("overlook").component("okField", {
    controller: ["okDataField", function(okDataField){
        this.$onInit = function(){

            var typeName = (this.okDataType) ? this.okDataType : "text";

            var field = okDataField(this.okName, typeName);
            field.caption = this.okCaption;
            field.usage = this.okFieldUsage;

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
