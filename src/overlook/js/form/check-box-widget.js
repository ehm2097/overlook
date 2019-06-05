
angular.module("overlook")

.component("okCheckBoxWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata;
            $scope.value = ctrl.okData[$scope.metadata.name].value;
            $scope.$watch("value", function(value){
                ctrl.okData[$scope.metadata.name].value = value;
            });
        }
    }],
    bindings: {
        okMetadata: "<",
        okData: "="
    },
    templateUrl: "/template/overlook/form/check-box-widget.html"     
});