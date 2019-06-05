
angular.module("overlook").component("okEntity", {
    controller: ["okPageData", function(okPageData){

        var ctrl = this;
        this.$onInit = function() {
            var entityDef = {
                name: ctrl.okName,
                source: ctrl.okSource,
                captionSingle: ctrl.okCaptionSingle,
                captionMultiple: ctrl.okCaptionMultiple,
                fields: []
            };
            
            ctrl.registerField = function(fieldDef){
                entityDef.fields.push(fieldDef);
            }

            ctrl.handler = okPageData.registerEntity(entityDef);
        }
    }],
    bindings: {
        okName: "@",
        okSource: "@",
        okCaptionSingle: "@",
        okCaptionMultiple: "@"
    }
})