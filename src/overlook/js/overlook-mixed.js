
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





