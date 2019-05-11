function ListController($log, $scope, $uibModal, okAppContext){

    $scope.columns = [];
    $scope.actions = [];

    var ctrl = this;
    var entityHandler = null;
    var selection = null;

    function loadRows(){
        entityHandler.retrieve().then(function(response){
            $scope.rows = response.data;
        }, function(){});
        selection.reset();
    }

    this.addRow = function(data) {
        $scope.rows.push(data);
    }

    this.updateRow = function(oldRow, newRow) {
        angular.copy(newRow, oldRow);
    }

    this.removeRow = function(){
        // TODO: better implementation
        loadRows();
    };

    this.popup = function(data, complete){
        var modal = $uibModal.open({
            templateUrl: "/template/overlook/popup.html",
            controller: ["$log", "$uibModalInstance", "$scope", PopupController],
            controllerAs: "$ctrl",
            resolve: {
                data: function() { return data },
                columns: function(){ return $scope.columns },
                title: function(){ return entityHandler.getCaptionSingle() } 
            },
            windowClass: "show",
            backdropClass: "show",
            small: "sm"
        });
        modal.result.then(complete, function(){})
    }

    this.addAction = function(action){
        $scope.actions.push(action);
    }

    this.addColumn = function(column){
        $scope.columns.push(column);
    };

    this.$onInit = function(){

        entityHandler = ctrl.entity.getHandler();
        selection = entityHandler.getSelection();
        ctrl.entity = entityHandler;
        loadRows();

        $scope.title = entityHandler.getCaptionMultiple();

    };

    $scope.selectRow = function(row){
        selection.select(row);
    }

    $scope.getRowClass = function(row){
        if (selection.isSelected(row)) return "table-primary";
        else return "";
    }

}

angular.module("overlook").component("okList", {
    templateUrl: "/template/overlook/list.html",
    transclude: {
        columnSlot: "okListColumn",
        actionSlot: "okListAction"
    },
    controller: ["$log", "$scope", "$uibModal", "okAppContext", ListController],
    bindings: {
        okSource: "@"
    },
    require: {
        entity: "^okEntity"
    }
});
