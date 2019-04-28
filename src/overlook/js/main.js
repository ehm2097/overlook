angular.module("overlook", ["ngRoute", "ui.bootstrap"])

.service("dummy", ["$log", function($log){
    function Dummy() {
        this.execute = function(what) {
            $log.log(what);
        }
    }
    return new Dummy();
}])

