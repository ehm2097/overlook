
angular.module("overlook")

.component("okTextWidget", {
    controller: ["$scope", function($scope){
        var ctrl = this;
        this.$onInit = function(){
            $scope.metadata = ctrl.okMetadata;
            $scope.value = ctrl.okData[ctrl.okMetadata.source];
            $scope.$watch("value", function(value){
                ctrl.okData[ctrl.okMetadata.source] = value;
            });
        }
    }],
    bindings: {
        okMetadata: "<",
        okData: "="
    },
    templateUrl: "/template/overlook/form/text-widget.html"     
});