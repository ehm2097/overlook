
angular.module("overlook").provider("okAppContext", [function(){

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
