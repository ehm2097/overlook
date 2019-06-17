
angular.module("overlook")

.component("okTextWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata;
            /*
            $scope.value = ctrl.okData[$scope.metadata.name].value;
            $scope.$watch("value", function(value){
                ctrl.okData[$scope.metadata.name].value = value;
            });
            */

            var data = $scope.metadata.getValue(ctrl.okData);
            $scope.value = data.value;
            $scope.$watch("value", function(value){
                data.value = value; // TODO: un-abominate this
            });
        }
    }],
    bindings: {
        okMetadata: "<",
        okData: "="
    },
    templateUrl: "/template/overlook/form/text-widget.html"     
});