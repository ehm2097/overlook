
describe("Data object manager", function(){

    var dataObjects;
    var factory;

    var sample = {
        prop1: "ABC",
        prop2: 123
    }
    function Handler1(value){
        expect(value).toEqual(sample.prop1);
        this.value = sample.prop1;
        this.json = function(){
            return sample.prop1;
        }
    }

    function Handler2(value){
        expect(value).toEqual(sample.prop2);
        this.value = sample.prop2;
        this.json = function(){
            return sample.prop2;
        }
    }


    beforeEach(angular.mock.module("overlook"));

    beforeEach(inject(function(_okDataObjects_){
        dataObjects = _okDataObjects_;
    }));

    it("should be available", function(){
        expect(dataObjects).toBeTruthy();
    })

    beforeEach(function(){
        factory = dataObjects.createFactory({
            prop1: Handler1,
            prop2: Handler2
        })
    })

    it("should build dedicated factories", function(){
        expect(factory).toBeTruthy();
    })

    describe("Data object", function(){

        it("should wrap and unwrap object data", function(){

            // Wrap sample data
            let wrapped = factory.create(sample);
            expect(wrapped).toBeTruthy();

            // Check wrapped object property access
            expect(wrapped.prop1).toBeTruthy();
            expect(wrapped.prop1.value).toEqual(sample.prop1);
            expect(wrapped.prop2).toBeTruthy();
            expect(wrapped.prop2.value).toEqual(sample.prop2);

            // Unwrap back and check result
            let unwrapped = wrapped.copy({});
            expect(unwrapped).toBeTruthy();
            expect(unwrapped.prop1).toEqual(sample.prop1);
            expect(unwrapped.prop2).toEqual(sample.prop2);
        })

    })

})