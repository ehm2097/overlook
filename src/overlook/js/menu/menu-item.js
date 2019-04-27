angular.module("overlook").component("okMenuItem", {
    templateUrl: "/template/overlook/menu-item.html",
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

