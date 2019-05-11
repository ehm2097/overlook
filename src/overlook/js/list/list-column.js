
angular.module("overlook").component("okListColumn", {
    template:"<ng-transclude></ng-transclude>",
    transclude: true,
    controller: ["$log", function($log){
        this.$onInit = function(){
            var source = this.okSource;
            var column = {
                source: this.okSource,
                caption: this.okCaption,
                usage: this.okFieldUsage
            };
            //$log.log("Cucu", column);
            this.list.addColumn(column);
        };
    }],
    bindings: {
        okSource: "@",
        okCaption: "@",
        okFieldUsage: "@"
    },
    require: {
        list: "^okList"
    }
});
