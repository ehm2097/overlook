function ListController($log, $scope, $http, $uibModal, okAppContext){

    $scope.columns = [];
    $scope.actions = [];

    var ctrl = this;
    var selection = $scope.$parent.selection;

    function CreateAction(url){
        this.caption = "New";
        this.url = url;
        this.disabled = function(){
            return false;
        }
        this.execute = function(){
            var data = {};
            $log.log("CREATE");
            popup(data, function(){
                $scope.rows.push(data);
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
            $log.log("EDIT", copy);
            popup(copy, function() {
                angular.copy(copy, data);
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
            $log.log("DELETE", selection.count());
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
        modal.result.then(complete, function(){$log.log("Badly closed!")})
    }

    function registerAction(url, action){
        if(url) $scope.actions.push(new action(url));
    }

    this.addColumn = function(column){
        $scope.columns.push(column);
    };

    this.$onInit = function(){
        $http.get(okAppContext.getDataUrl(this.source)).then(function(response){
            $scope.rows = response.data;
        }, 
        function(){
        });

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
    controller: ["$log", "$scope", "$http", "$uibModal", "okAppContext", ListController],
    bindings: {
        source: "@",
        okCreateAction: "@",
        okUpdateAction: "@",
        okDeleteAction: "@"
    },
    require: {
        entity: "^okEntity"
    }
});
