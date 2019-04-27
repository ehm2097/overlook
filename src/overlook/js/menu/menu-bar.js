
function MenuController($log, $scope) {
    this.reload = function(){
        window.location = window.location.origin;
    }
}

angular.module("overlook").component("okMenuBar", {
    templateUrl: "/template/overlook/menu.html",
    controller: ["$log", "$scope", MenuController],
    bindings: {
        caption: '@'
    },
    transclude: true
});
