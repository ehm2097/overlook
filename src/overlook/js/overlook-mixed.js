
angular.module("overlook").controller("MainController", ["$log", "$scope", "okAppContext", function($log, $scope, okAppContext){
    $scope.appMenuUrl = okAppContext.getMenuUrl();
    $scope.popupOpened = false;
    $scope.openPopup = function(){ $scope.popupOpened = true; }
}]);

angular.module("overlook").controller("lkPageController", ["$scope", "$route","okAppContext", "okPageData", function($scope, $route, okAppContext, okPageData){

    okPageData.initialize();

    $scope.getPageUrl = function(){
        return okAppContext.getPageUrl($route.current.params.page);
    };
}]);



angular.module("overlook").component("okEntity", {
    controller: ["$log", "okPageData", function($log, okPageData){

        var ctrl = this;
        this.$onInit = function() {
            var entityDef = {
                name: ctrl.okName,
                source: ctrl.okSource,
                captionSingle: ctrl.okCaptionSingle,
                captionMultiple: ctrl.okCaptionMultiple
            };
            var handler = okPageData.registerEntity(entityDef);
            ctrl.getHandler = function(){ return handler; }
        }
    }],
    bindings: {
        okName: "@",
        okSource: "@",
        okCaptionSingle: "@",
        okCaptionMultiple: "@"
    }
});

