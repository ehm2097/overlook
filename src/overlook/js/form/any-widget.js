
angular.module("overlook")

.directive("okAnyWidget", ["$compile", function($compile){

    function getTagName(type){
        if(type == "boolean") return "ok-check-box-widget";
        if(type == "date") return "ok-date-widget";
        return "ok-text-widget";
    }

    return {
        restrict: "E",
        link: function(scope, iElement, iAttrs){

            var document = iElement[0].ownerDocument; 
            var widget = document.createElement(getTagName(scope[iAttrs.okMetadata].type));
            for(attr in iAttrs.$attr){
                widget.setAttribute(iAttrs.$attr[attr], iAttrs[attr]);
            };
            $compile(widget)(scope);
            iElement[0].appendChild(widget);
        }
    }
}]);