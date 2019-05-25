
angular.module("overlook").component("okListColumn", {
    controller: ["$log", "okDataTypes", function($log, okDataTypes){
        this.$onInit = function(){

            var type = (this.okDataType) ? this.okDataType : "text";

            var column = {
                field: {
                    source: this.okSource,
                    caption: this.okCaption,
                    usage: this.okFieldUsage,
                    type: okDataTypes[type]
                }
            };
            column.getDisplayValue = function(row){
                return row[column.field.source].display();
            }
            this.list.registerColumn(column);
        };
    }],
    bindings: {
        okSource: "@",
        okCaption: "@",
        okFieldUsage: "@",
        okDataType: "@"
    },
    require: {
        list: "^okList"
    }
});
