function ListController($log, $scope, okData, $uibModal, okAppContext){

    $scope.columns = [];
    $scope.actions = [];

    var ctrl = this;
    var selection = $scope.$parent.selection;

    function loadRows(){
        okData[ctrl.okSource]().then(function(response){
            $scope.rows = response.data;
        }, function(){
        });
        selection.reset();
    }

    function CreateAction(url){
        this.caption = "New";
        this.url = url;
        this.disabled = function(){
            return false;
        }
        this.execute = function(){
            var data = {};
            popup(data, function(){
                okData[ctrl.okCreateAction](data).then(function(){
                    $scope.rows.push(data);
                }, function(){
                });
            });
        }
    }

    function UpdateAction(url){
        this.caption = "Edit";
        this.url = url;
        this.disabled = function(){
            return selection.count() != 1;
        }
        this.execute = function(){
            var data = selection.current();
            var copy = angular.copy(data);
            popup(copy, function(){
                okData[ctrl.okUpdateAction](data).then(function(){
                    angular.copy(copy, data);
                }, function(){
                });
            });
        }
    }

    function DeleteAction(url){
        this.caption = "Delete";
        this.url = url;
        this.disabled = function(){
            return selection.count() == 0;
        }
        this.execute = function(){
            okData[ctrl.okDeleteAction](selection.current()).then(function(){
                loadRows();
            }, function(){
            });
        }
    }

    function popup(data, complete){
        var modal = $uibModal.open({
            templateUrl: "/template/overlook/popup.html",
            controller: ["$log", "$uibModalInstance", "$scope", PopupController],
            controllerAs: "$ctrl",
            resolve: {
                data: function() { return data },
                columns: function(){ return $scope.columns },
                title: function(){ return $scope.$ctrl.entity.okCaptionSingle }
            },
            windowClass: "show",
            backdropClass: "show",
            small: "sm"
        });
        modal.result.then(complete, function(){})
    }

    function registerAction(url, action){
        if(url) $scope.actions.push(new action(url));
    }

    this.addColumn = function(column){
        $scope.columns.push(column);
    };

    this.$onInit = function(){
        loadRows();
        $scope.title = ctrl.entity.okCaptionMultiple;

        registerAction(this.okCreateAction, CreateAction);
        registerAction(this.okUpdateAction, UpdateAction);
        registerAction(this.okDeleteAction, DeleteAction);

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
    transclude: true,
    controller: ["$log", "$scope", "okData", "$uibModal", "okAppContext", ListController],
    bindings: {
        okSource: "@",
        okCreateAction: "@",
        okUpdateAction: "@",
        okDeleteAction: "@"
    },
    require: {
        entity: "^okEntity"
    }
});
