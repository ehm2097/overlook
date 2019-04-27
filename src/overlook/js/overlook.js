
function Selection(setup){
    // TODO: Provide support for multiple selection
    var current = null;
    this.select = function(item){
        current = item;
    }
    this.isSelected = function(item){
        return (item === current);
    }
    this.current = function(){
        return current;
    }    
    this.count = function() {
        return current == null ? 0 : 1;
    }
}


var app = angular.module("overlook", ["ngRoute", "ui.bootstrap"]);

angular.module("overlook").provider("okApp", [function(){

    var appMenuUrl = null;
    var pageUrlRoot = null;
    var dataUrlRoot = null;

    this.setupPageUrl = function(setup){
        pageUrlRoot = setup;
    };

    this.setupDataUrl = function(setup){
        dataUrlRoot = setup;
    };

    this.setupMenuUrl = function(setup){
        appMenuUrl = setup;
    };
    
    this.$get = ["$log", function($log){
        return { 
            getPageUrl: function(page) {
                return pageUrlRoot + page + ".html";
            }, 
            getDataUrl: function(data) {
                return dataUrlRoot + data + ".json";
            }, 
            getMenuUrl: function() {
                return appMenuUrl;
            } 
        };
    }];
}]);

angular.module("overlook").controller("MainController", ["$log", "$scope", "$location", "okApp", function($log, $scope, $location, okApp){
    $scope.appMenuUrl = okApp.getMenuUrl();
}]);

angular.module("overlook").controller("lkPageController", ["$log", "$route", "$scope", "okApp", function($log, $route, $scope, okApp){
    $scope.selection = new Selection();
    $scope.getPageUrl = function(){
        return okApp.getPageUrl($route.current.params.page);
    };
}]);

angular.module("overlook").config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
    .when("/page/:page", {
        controller: "lkPageController",
        templateUrl: "/overlook/template/page-root.html" 
    })
    .when("/page/:page/:params", {
        controller: "lkPageController",
        templateUrl: "/overlook/template/page-root.html" 
    })
    .otherwise({
        templateUrl: "/overlook/template/welcome.html"
    });
}]);

function MenuController($log, $scope) {
    this.reload = function(){
        window.location = window.location.origin;
    }
}
  

angular.module("overlook").component("lkMenu", {
    templateUrl: "/overlook/template/menu.html",
    controller: ["$log", "$scope", MenuController],
    bindings: {
        caption: '@'
    },
    transclude: true
});

angular.module("overlook").component("lkMenuGroup", {
    templateUrl: "/overlook/template/menu-group.html",
    controller: [function(){}],
    bindings: {
        caption: '@'
    },
    transclude: true
});

angular.module("overlook").component("lkMenuItem", {
    templateUrl: "/overlook/template/menu-item.html",
    controller: ["$log", function($log){
        this.getRouteUrl = function(){
            return "#!/page/" + page;
        };
    }],
    bindings: {
        caption: '@',
        page: "@"
    }
});

angular.module("overlook").component("okEntity", {
    controller: ["$log", function($log){
        this.getEntity = function(){
            return {
            }
        }
    }],
    bindings: {
        okCaptionSingle: "@",
        okCaptionMultiple: "@"
    }
});

function ListController($log, $scope, $http, $uibModal, okApp){

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
            templateUrl: "/overlook/template/popup.html",
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
        $http.get(okApp.getDataUrl(this.source)).then(function(response){
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
    templateUrl: "/overlook/template/list.html",
    transclude: true,
    controller: ["$log", "$scope", "$http", "$uibModal", "okApp", ListController],
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

angular.module("overlook").component("okListColumn", {
    template:"<ng-transclude></ng-transclude>",
    transclude: true,
    controller: ["$log", function($log){
        this.$onInit = function(){
            var source = this.okSource;
            var column = {
                source: this.okSource,
                caption: this.okCaption,
                usage: this.okFieldUsage
            };
            //$log.log("Cucu", column);
            this.list.addColumn(column);
        };
    }],
    bindings: {
        okSource: "@",
        okCaption: "@",
        okFieldUsage: "@"
    },
    require: {
        list: "^okList"
    }
});
