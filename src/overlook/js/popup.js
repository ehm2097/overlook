function PopupController($log, $uibModalInstance, $scope){

    var isNew = false;
    $scope.$resolve.columns.forEach(function(column){
       if((column.usage == "pk") && !(column.source in $scope.$resolve.data)) isNew = true; 
    });

    this.ok = function(){
        $uibModalInstance.close();
    }
    this.cancel = function(){
        $uibModalInstance.dismiss();
    }
    this.readonly = function(column) {
        return !isNew && (column.usage == "pk");
    }
    this.required = function(column){
        return column.usage == "pk";
    }
}

