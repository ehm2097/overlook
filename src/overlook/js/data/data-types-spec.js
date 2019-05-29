
describe("Managed data types", function(){

    var dataTypes;

    beforeEach(angular.mock.module("overlook"));

    beforeEach(inject(function(_okDataTypes_){
        dataTypes = _okDataTypes_;
    }));

    it("should be available", function(){
        expect(dataTypes).toBeTruthy();
    })


   describe("Text data type", function(){

        const NAME = "text";
        var type;
        
        beforeEach(function(){
            type = dataTypes[NAME];
        })

        it("should be managed", function(){
            expect(type).toBeTruthy();
        })
        
        it("should handle and display valid data", function(){
            const TEXT = "Rntmp*";
            var data = new type();
            data.value = TEXT;
            expect(data.getTypeName()).toEqual(NAME);
            expect(data.display()).toEqual(TEXT);
        })
        
        it("should handle and display empty data", function(){
            var data = new type();
            expect(data.display()).toEqual("");
        })

        it("should exchange valid data with JSON", function(){
            const TEXT = "J@$0n 123";
            var data = new type(TEXT);
            expect(data.json()).toEqual(TEXT);
        })

        it("should exchange empty data with JSON", function(){
            var data = new type("");
            expect(data.json()).toEqual("");
        })

        it("should be cloneable", function(){
            const TEXT = "War Sheep";
            var data = new type();
            data.value = TEXT;
            var clone = data.clone();
            expect(clone.value).toEqual(TEXT);
        })
    })


    describe("Date data type", function(){

        const NAME = "date";
        var type;
        
        beforeEach(function(){
            type = dataTypes[NAME];
        })

        it("should be managed", function(){
            expect(type).toBeTruthy();
        })
        
        it("should handle and display valid data", function(){
            var data = new type();
            data.day = 13;
            data.month = 6;
            data.year = 2019;
            expect(data.getTypeName()).toEqual(NAME);
            expect(data.display()).toEqual("13/06/2019");
        })
        
        it("should handle and display empty data", function(){
            var data = new type();
            expect(data.display()).toEqual("");
        })

        it("should exchange valid data with JSON", function(){
            var data = new type("2018-12-01");
            expect(data.json()).toEqual("2018-12-01");
        })

        it("should exchange empty data with JSON", function(){
            var data = new type("");
            expect(data.json()).toEqual("");
        })

        it("should be cloneable", function(){
            var data = new type();
            data.day = 13;
            data.month = 6;
            data.year = 2019;
            var clone = data.clone();
            expect(clone.day).toEqual(data.day);
            expect(clone.month).toEqual(data.month);
            expect(clone.year).toEqual(data.year);
        })
        
    })

    
    describe("Boolean data type", function(){

        const NAME = "boolean";
        var type;
        
        beforeEach(function(){
            type = dataTypes[NAME];
        })

        it("should be managed", function(){
            expect(type).toBeTruthy();
        })

        it("should handle and display valid data", function(){
            var data = new type();
            data.value = true;
            expect(data.getTypeName()).toEqual(NAME);
            expect(data.display()).toEqual("\u2714");
        })
        
        it("should handle and display empty data", function(){
            var data = new type();
            expect(data.display()).toEqual("");
        })

        it("should exchange valid data with JSON", function(){
            var data = new type(true);
            expect(data.json()).toEqual(true);
        })

        it("should exchange empty data with JSON", function(){
            var data = new type();
            expect(data.json()).toEqual("");
        })

        it("should be cloneable", function(){
            var data = new type();
            data.value = false;
            var clone = data.clone();
            expect(clone.value).toEqual(false);
        })
        
    })
})