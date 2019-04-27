
// TODO: Turn into fully-fledged service
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
