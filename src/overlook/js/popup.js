function PopupController($log, $uibModalInstance, $scope){

    var isNew = false;
    $scope.$resolve.columns.forEach(function(column){
       if((column.usage == "pk") && !(column.source in $scope.$resolve.data)) isNew = true; 
    });

    $log.log("isNew", isNew);

    this.ok = function(){
        $log.log("OK!");
        $uibModalInstance.close();
    }
    this.cancel = function(){
        $log.log("Canceled!");
        $uibModalInstance.dismiss();
    }
    this.readonly = function(column) {
        return !isNew && (column.usage == "pk");
    }
    this.required = function(column){
        return column.usage == "pk";
    }
}

