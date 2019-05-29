
angular.module("overlook")

.factory("okDataTypes", [function(){

    var managed = {};

    function pad(value, size){
        var text = new String(value);
        while(text.length < size) text = "0" + text;
        return text;
    }

    function registerType(name,fn){
        managed[name] = fn;
        fn.prototype.getTypeName = function(){return name};
    }

    function TextDataType(source){
        this.value = source ? source : null;
        this.display = function(){
            return this.value ? this.value : "";
        }
        this.json = function(){
            return this.value ? this.value : "";
        }
        this.clone = function(){
            return new TextDataType(this.value);
        }
    }

    function DateDataType(source){
        if(typeof(source) == 'string'){
            var parts = source.split("-");
            this.year = Number(parts[0]);
            this.month = Number(parts[1]);
            this.day = Number(parts[2]);
        }
        else {
            this.day = null;
            this.month = null;
            this.year = null;
        }
        this.display = function(){
            if(!this.year) return "";
            return pad(this.day, 2) + "/" + pad(this.month, 2) + "/" + pad(this.year, 4);
        }
        this.json = function(){
            if(!this.year) return "";
            return pad(this.year, 4) + "-" + pad(this.month, 2) + "-" + pad(this.day, 2);
        }
        this.clone = function(){
            var result = new DateDataType();
            result.day = this.day;
            result.month = this.month;
            result.year = this.year;
            return result;
        }
    }

    function BooleanDataType(source){
        this.value = source;
        this.display = function(){
            if(this.value == true) return "\u2714";
            if(this.value == false) return "\u2716";
            return "";
        }
        this.json = function(){
            if(this.value == true) return true;
            if(this.value == false) return false;
            return "";
        }
        this.clone = function(){
            var result = new BooleanDataType();
            result.value = this.value;
            return result;
        }
    }

    registerType("text", TextDataType);
    registerType("boolean", BooleanDataType);
    registerType("date", DateDataType);

    return managed;
}])