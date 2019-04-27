angular.module("overlook").config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
    .when("/page/:page", {
        controller: "lkPageController",
        templateUrl: "/template/overlook/page-root.html" 
    })
    .when("/page/:page/:params", {
        controller: "lkPageController",
        templateUrl: "/template/overlook/page-root.html" 
    })
    .otherwise({
        templateUrl: "/template/overlook/welcome.html"
    });
}]);
