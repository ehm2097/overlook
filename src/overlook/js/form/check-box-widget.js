
angular.module("overlook")

.component("okCheckBoxWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata.field;
            $scope.value = ctrl.okData[$scope.metadata.source].value;
            $scope.$watch("value", function(value){
                ctrl.okData[$scope.metadata.source].value = value;
            });
        }
    }],
    bindings: {
        okMetadata: "<",
        okData: "="
    },
    templateUrl: "/template/overlook/form/check-box-widget.html"     
});