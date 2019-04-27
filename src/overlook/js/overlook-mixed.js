


angular.module("overlook").controller("MainController", ["$log", "$scope", "$location", "okAppContext", function($log, $scope, $location, okAppContext){
    $scope.appMenuUrl = okAppContext.getMenuUrl();
}]);

angular.module("overlook").controller("lkPageController", ["$log", "$route", "$scope", "okAppContext", function($log, $route, $scope, okAppContext){
    $scope.selection = new Selection();
    $scope.getPageUrl = function(){
        return okAppContext.getPageUrl($route.current.params.page);
    };
}]);


angular.module("overlook").component("okEntity", {
    controller: ["$log", function($log){
        this.getEntity = function(){
            return {
            }
        }
    }],
    bindings: {
        okCaptionSingle: "@",
        okCaptionMultiple: "@"
    }
});


