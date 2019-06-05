function PopupController($log, $uibModalInstance, $scope){

    var isNew = $scope.$resolve.data.newRow;

    $scope.title = $scope.$resolve.title;

    $scope.fields = [];
    $scope.$resolve.fields.forEach(function(srcField){
        var destField = angular.copy(srcField);
        destField.required = (destField.usage == "pk"); 
        destField.readOnly = !isNew && (destField.usage == "pk");
        $scope.fields.push(destField);
     });

    $scope.data = $scope.$resolve.data;

    $scope.ok = function(){
        $uibModalInstance.close();
    }
    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    }
}

