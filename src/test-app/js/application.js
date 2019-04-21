angular.module("application", ["overlook"])

.config(["okAppProvider", function(okAppProvider){
    okAppProvider.setupPageUrl("/test-app/template/");
    okAppProvider.setupDataUrl("/test-app/data/");
    okAppProvider.setupMenuUrl("/test-app/template/application-menu.html");
}]);