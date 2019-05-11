


angular.module("overlook").component("okListAction", {
    controller: ["$scope", "$location", "okData", "okRouteParams", function($scope, $location, okData, $okRouteParams){

        var ctrl = this;
        var actionClasses = {};
        var entityHandler = null;
        var selection = null;

        function getCaption(standard){
            return ctrl.caption ? ctrl.caption : standard;
        }

        function checkAnySelection() {
            return selection.count() == 0;    
        }

        function checkSingleSelection() {
            return selection.count() != 1;    
        }

        function getSource(standard){
            var entityName = entityHandler.getName();
            // TODO: new service to handle multipart name transformation
            return ctrl.source ? ctrl.source : standard + entityName.charAt(0).toUpperCase() + entityName.slice(1);
        }

        function callAction(standardName, data) {
            return okData[getSource(standardName)](data);
        }

        actionClasses.create =  function(){
            this.caption = getCaption("New");
            this.disabled = function(){ return false; }
    
            this.execute = function(){
                var data = {};

                function updateList() {
                    ctrl.list.addRow(data);
                }

                function callCreate() {
                    // TODO: show errors on failure
                    callAction("create", data).then(updateList, angular.noop);
                }

                ctrl.list.popup(data, callCreate);
            }
        }

        actionClasses.edit = function (){
            this.caption = getCaption("Edit");
            this.disabled = checkSingleSelection;

            this.execute = function(){
                var data = selection.current();
                var copy = angular.copy(data);

                function updateList(){
                    // TODO: better implementation
                    ctrl.list.updateRow(data, copy);
                }

                function callUpdate() {
                    // TODO: show errors on failure
                    callAction("update", copy).then(updateList, angular.noop);
                }

                ctrl.list.popup(copy, callUpdate);
            }
        }    

        actionClasses.delete = function(){
            this.caption = getCaption("Delete");
            this.disabled = checkAnySelection;

            function updateList(){
                // TODO: better implementation
                ctrl.list.removeRow();
            }

            function callDelete() {
                // TODO: show errors on failure
                callAction("delete", selection.current()).then(updateList, angular.noop);
            }

            this.execute = function(){
                callDelete();
            }
        }

        actionClasses.link = function(){
            this.caption = getCaption("Link");
            this.disabled = checkSingleSelection;

            this.execute = function() {
                var args = {};
                var data = selection.current();
                ctrl.list.getKey().forEach(function(column){
                    args[column] = data[column];
                });
                $location.path("/page/" + ctrl.page + "/" + $okRouteParams.encode(args));
            };
        };

        ctrl.$onInit = function(){
            entityHandler = ctrl.entity.getHandler();
            selection = entityHandler.getSelection();
            $scope.action = new actionClasses[ctrl.class]();
        }
    }],
    bindings: {
        class: "@okActionClass",
        caption: "@okCaption",
        source: "@okSource",
        page: "@okPage"
    },
    require: {
        list: "^okList",
        entity: "^okEntity"
    },
    templateUrl: "/template/overlook/list-action.html"
});