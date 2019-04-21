var app = angular.module("overlook", ["ngRoute"]);

angular.module("overlook").provider("okApp", [function(){

    var appMenuUrl = null;
    var pageUrlRoot = null;
    var dataUrlRoot = null;

    this.setupPageUrl = function(setup){
        pageUrlRoot = setup;
    };

    this.setupDataUrl = function(setup){
        dataUrlRoot = setup;
    };

    this.setupMenuUrl = function(setup){
        appMenuUrl = setup;
    };
    
    this.$get = ["$log", function($log){
        return { 
            getPageUrl: function(page) {
                return pageUrlRoot + page + ".html";
            }, 
            getDataUrl: function(data) {
                return dataUrlRoot + data + ".json";
            }, 
            getMenuUrl: function() {
                return appMenuUrl;
            } 
        };
    }];
}]);

angular.module("overlook").controller("MainController", ["$log", "$scope", "$location", "okApp", function($log, $scope, $location, okApp){
    $scope.appMenuUrl = okApp.getMenuUrl();
}]);

angular.module("overlook").controller("lkPageController", ["$log", "$route", "$scope", "okApp", function($log, $route, $scope, okApp){
    $scope.getPageUrl = function(){
        return okApp.getPageUrl($route.current.params.page);
    };
}]);

angular.module("overlook").config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
    .when("/page/:page", {
        controller: "lkPageController",
        templateUrl: "/overlook/template/page-root.html" 
    })
    .when("/page/:page/:params", {
        controller: "lkPageController",
        templateUrl: "/overlook/template/page-root.html" 
    })
    .otherwise({
        templateUrl: "/overlook/template/welcome.html"
    });
}]);

function MenuController($log, $scope) {
    this.reload = function(){
        window.location = window.location.origin;
    }
}
  

angular.module("overlook").component("lkMenu", {
    templateUrl: "/overlook/template/menu.html",
    controller: ["$log", "$scope", MenuController],
    bindings: {
        caption: '@'
    },
    transclude: true
});

angular.module("overlook").component("lkMenuGroup", {
    templateUrl: "/overlook/template/menu-group.html",
    controller: [function(){}],
    bindings: {
        caption: '@'
    },
    transclude: true
});

angular.module("overlook").component("lkMenuItem", {
    templateUrl: "/overlook/template/menu-item.html",
    controller: ["$log", function($log){
        this.getRouteUrl = function(){
            return "#!/page/" + page;
        };
    }],
    bindings: {
        caption: '@',
        page: "@"
    }
});

angular.module("overlook").component("okList", {
    templateUrl: "/overlook/template/list.html",
    transclude: true,
    controller: ["$scope", "$http", "okApp", function($scope, $http, okApp){

        $scope.columns = [];

        this.addColumn = function(column){
            $scope.columns.push(column);
        };

        this.$onInit = function(){
            $http.get(okApp.getDataUrl(this.source)).then(function(response){
                $scope.rows = response.data;
            }, 
            function(){
            });
        };
    }],
    bindings: {
        source: "@"
    }
});

angular.module("overlook").component("okListColumn", {
    template:"<ng-transclude></ng-transclude>",
    transclude: true,
    controller: ["$log", function($log){
        this.$onInit = function(){
            var source = this.okSource;
            var column = {
                source: this.okSource,
                caption: this.okCaption
            };
            //$log.log("Cucu", column);
            this.list.addColumn(column);
        };
    }],
    bindings: {
        okSource: "@",
        okCaption: "@"
    },
    require: {
        list: "^okList"
    }
});
