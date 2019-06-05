
angular.module("overlook")

.component("okTextWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata;
            console.log(ctrl.okData);
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
    templateUrl: "/template/overlook/form/text-widget.html"     
});