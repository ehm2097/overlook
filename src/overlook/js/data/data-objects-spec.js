
describe("Data object manager", function(){

    var dataObjects;
    var factory;

    const DEFAULT1 = "-";
    const DEFAULT2 = 0;

    const VALUE1 = "ABC";
    const VALUE2 = 123;

    const sample = {
        prop1: VALUE1,
        prop2: VALUE2
    }

    function Handler1(value){
        this.value = value ? value : DEFAULT1;
        this.json = function() { return this.value; }
    }

    function Handler2(value){
        this.value = value ? value : DEFAULT2;
        this.json = function() { return this.value; }
    }


    beforeEach(angular.mock.module("overlook"));

    beforeEach(inject(function(_okDataObjects_){
        dataObjects = _okDataObjects_;
    }));

    it("should be available", function(){
        expect(dataObjects).toBeTruthy();
    })

    beforeEach(function(){
        factory = dataObjects.createFactory([
            {name: "prop1", type: Handler1},
            {name: "prop2", type: Handler2}
        ])
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
            expect(wrapped.prop1.value).toEqual(VALUE1);
            expect(wrapped.prop2).toBeTruthy();
            expect(wrapped.prop2.value).toEqual(VALUE2);

            // Unwrap back and check result
            let unwrapped = wrapped.copy({});
            expect(unwrapped).toBeTruthy();
            expect(unwrapped.prop1).toEqual(VALUE1);
            expect(unwrapped.prop2).toEqual(VALUE2);
        })

        it("should initialize and copy data", function(){

            // Initialize empty/default data
            let wrapped = factory.create();
            expect(wrapped).toBeTruthy();

            // Check property values
            expect(wrapped.prop1).toBeTruthy();
            expect(wrapped.prop1.value).toEqual(DEFAULT1);
            expect(wrapped.prop2).toBeTruthy();
            expect(wrapped.prop2.value).toEqual(DEFAULT2);

            // Copy values from different object
            let wrapped2 = factory.create(sample);
            let wrapped3 = wrapped2.copy();
            expect(wrapped3).toBeTruthy();

            // Copy again
            console.log(wrapped3, wrapped2, wrapped);
            let wrapped4 = wrapped3.copy(wrapped);
            expect(wrapped4).toBeTruthy();
            expect(wrapped4).toBe(wrapped);

            // Check property values again
            expect(wrapped.prop1).toBeTruthy();
            expect(wrapped.prop1.value).toEqual(VALUE1);
            expect(wrapped.prop2).toBeTruthy();
            expect(wrapped.prop2.value).toEqual(VALUE2);
        })

        it("should wrap arrays", function(){

            // wrap a mix of sample and default data
            let wrapped = factory.create([sample, null]);
            expect(wrapped).toBeTruthy();

            // Check property values
            expect(wrapped[0].prop1).toBeTruthy();
            expect(wrapped[0].prop1.value).toEqual(VALUE1);
            expect(wrapped[1].prop2).toBeTruthy();
            expect(wrapped[1].prop2.value).toEqual(DEFAULT2);
        })

    })

})