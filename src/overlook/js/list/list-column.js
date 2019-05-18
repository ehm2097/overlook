
angular.module("overlook").component("okListColumn", {
    controller: ["$log", function($log){
        this.$onInit = function(){

            // TODO: create formatting service based on this simple example 
            var formatters = {
                text: function(value) { return value; },
                boolean: function(value) { return (value) ? "\u2714" : "\u2716"; },
                date: function(value) {
                    if(!value) return "";
                    var date = new Date();
                    date.setTime(Date.parse(value));
                    return date.toLocaleDateString(); 
                }
            }

            var column = {
                source: this.okSource,
                caption: this.okCaption,
                usage: this.okFieldUsage,
                type: (this.okDataType) ? this.okDataType : "text"
            };
            column.getDisplayValue = function(row){
                return formatters[column.type](row[column.source]); 
            }
            this.list.addColumn(column);
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
