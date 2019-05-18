function PopupController($log, $uibModalInstance, $scope){

    var isNew = false;
    $scope.$resolve.columns.forEach(function(column){
       if((column.usage == "pk") && !(column.source in $scope.$resolve.data)) isNew = true; 
    });

    $scope.title = $scope.$resolve.title;

    $scope.columns = [];
    $scope.$resolve.columns.forEach(function(srcColumn){
        var destColumn = angular.copy(srcColumn);
        destColumn.required = (destColumn.usage == "pk"); 
        destColumn.readOnly = !isNew && (destColumn.usage == "pk");
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

