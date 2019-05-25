function PopupController($log, $uibModalInstance, $scope){

    var isNew = $scope.$resolve.data.newRow;

    $scope.title = $scope.$resolve.title;

    $scope.columns = [];
    $scope.$resolve.columns.forEach(function(srcColumn){
        var destColumn = angular.copy(srcColumn);
        destColumn.field.required = (destColumn.field.usage == "pk"); 
        destColumn.field.readOnly = !isNew && (destColumn.field.usage == "pk");
        $scope.columns.push(destColumn);
     });

    $scope.data = $scope.$resolve.data;

    $scope.ok = function(){
        $uibModalInstance.close();
    }
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    }
}

