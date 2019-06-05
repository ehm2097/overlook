
angular.module("overlook")

.component("okDateWidget", {
    controller: ["$scope", function($scope){

        var ctrl = this;

        function parseDate(date){
            return date;
        }

        this.$onInit = function(){
            $scope.format = "dd/MM/yyyy";
            $scope.metadata = ctrl.okMetadata;
            var date = ctrl.okData[$scope.metadata.name];
            $scope.value = date.year ? new Date(date.year, date.month - 1, date.day) : null;
            $scope.$watch("value", function(value){
                if(value) {
                    date.day = value.getDate();
                    date.month = value.getMonth() + 1;
                    date.year = value.getFullYear();    
                }
                else {
                    date.day = null;
                    date.month = null;
                    date.year = null;    
                }
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