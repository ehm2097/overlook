function ListController($log, $scope, $uibModal, okAppContext){


    var ctrl = this;
    var entityHandler = null;
    var fields = null;
    var selection = null;
    var key = [];

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
        //angular.copy(newRow, oldRow);
        entityHandler.copy(newRow, oldRow);
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
                fields: function(){ return $scope.getFields() },
                title: function(){ return entityHandler.getCaptionSingle() } 
            },
            windowClass: "show",
            backdropClass: "show",
            small: "sm"
        });
        modal.result.then(complete, function(){})
    }

    this.getKey = function() {
        return key;
    };

    this.$onInit = function(){
        entityHandler = ctrl.entity.handler;
        selection = entityHandler.getSelection();
        ctrl.entity = entityHandler;
        loadRows();

        $scope.title = entityHandler.getCaptionMultiple();
    };

    $scope.getFields = function(){
        if(!fields) {
            fields = [];
            ctrl.entity.forEachField(function(field){
                fields.push(field);
                if(field.usage == "pk") key.push(field.name);
            });
        }
        return fields;
    }

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
        columnSlot: "okField",
        actionSlot: "?okListAction"
    },
    controller: ["$log", "$scope", "$uibModal", "okAppContext", ListController],
    bindings: {
        okSource: "@"
    },
    require: {
        entity: "^okEntity"
    }
});
