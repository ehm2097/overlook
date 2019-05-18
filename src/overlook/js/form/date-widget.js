
angular.module("overlook")

.component("okDateWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata;
            $scope.value = ctrl.okData[ctrl.okMetadata.source];
            $scope.$watch("value", function(value){
                ctrl.okData[ctrl.okMetadata.source] = value;
            });
        }

        $scope.popup = false;
        $scope.open = function(){ $scope.popup = true; }
    }],
    bindings: {
        okMetadata: "<",
        okData: "="
    },
    templateUrl: "/template/overlook/form/date-widget.html"     
});