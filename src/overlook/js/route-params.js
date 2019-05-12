
angular.module("overlook")

.factory("okRouteParams", [function(){

    function RouteParamsService(){

        function createNameMap(data){
            var result = {};
            var used = [];
            for(prop in data){
                for(i = 0; i < prop.length; i++){
                    var shortcut = prop.slice(i, i + 1).toLowerCase();
                    if(used.includes(shortcut)) continue;
                    result[prop] = shortcut;
                    used.push(shortcut)
                    break;
                }
            }
            return result;
        }

        this.encode = function(data){
            var result = "";
            var map = createNameMap(data);
            for(prop in data){
                var value = data[prop];
                if(value){
                    result = result + "-" + map[prop] + value;
                }
            }

            if (result.length == 0) return null;
            else return result.slice(1);
        }

        this.decode = function(data, text){
            if(!text) return data;
            var map = createNameMap(data);
            var params = text.split("-");
            for(prop in data){
                var shortcut = map[prop];
                for(i in params){
                    var param = params[i];
                    if(param.startsWith(shortcut)){
                        data[prop] = param.slice(1);
                        break;
                    }
                }
            }
            return data;
        }
    }

    return new RouteParamsService();
}]);