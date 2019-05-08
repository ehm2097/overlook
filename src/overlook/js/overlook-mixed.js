


angular.module("overlook").controller("MainController", ["$log", "$scope", "okAppContext", function($log, $scope, okAppContext){
    $scope.appMenuUrl = okAppContext.getMenuUrl();
}]);

angular.module("overlook").controller("lkPageController", ["$log", "$route", "$scope", "okAppContext", "okRouteParams", function($log, $route, $scope, okAppContext, okRouteParams){

    var urlFilters = $route.current.params.params;

    $scope.pageContext = {
        filters: function(expectedFilters) {
            if(urlFilters) { okRouteParams.decode(expectedFilters, urlFilters); }
        },
        selection: new Selection()
    };
    $scope.getPageUrl = function(){
        return okAppContext.getPageUrl($route.current.params.page);
    };
}]);



angular.module("overlook").component("okEntity", {
    controller: ["$log", function($log){
        var ctrl = this;
        this.$onInit = function() {
            if(this.okFilters) this.expectedFilters = this.okFilters.split(",");
            else this.expectedFilters = [];
        }
    }],
    bindings: {
        okCaptionSingle: "@",
        okCaptionMultiple: "@",
        okFilters: "@"
    }
});


angular.module("overlook").component("testEntity", {
    controller: [function(){
    }],
    bindings: {
        testName: "@"
    }
});

angular.module("overlook").component("testList", {
    controller: ["$log", function($log){
        this.$onInit = function() {
            $log.log("ctrl:", this.test.testName);
        }
    }],
    require: {
        test: "^testEntity"
    }
});

