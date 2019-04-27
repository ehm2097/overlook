angular.module("application", ["overlook"])

.config(["okAppContextProvider", function(okAppContextProvider){
    okAppContextProvider.setupPageUrl("/template/app/");
    okAppContextProvider.setupDataUrl("/data/");
    okAppContextProvider.setupMenuUrl("/template/app/application-menu.html");
}]);