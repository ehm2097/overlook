angular.module("application", ["overlook"])

.config(["okAppContextProvider", function(okAppContextProvider){
    okAppContextProvider.setupPageUrl("/template/app/");
    okAppContextProvider.setupMenuUrl("/template/app/application-menu.html");
}])

.decorator("okData", ["$http", function($http){
    return {
        getCustomers: function(){
            return $http.get("/data/get-customers.json");
        }
    }
}])