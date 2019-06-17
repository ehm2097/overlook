// TODO: separate testing for data objects and data fields

describe("Data object manager", function(){

    var dataObjects;
    var dataField;
    var dataTypes;
    var factory;

    const DEFAULT1 = "-";
    const DEFAULT2 = 0;

    const VALUE1 = "ABC";
    const VALUE2 = 123;

    const sample = {
        prop1: VALUE1,
        prop2: VALUE2
    }

    const TYPE1 = "one";
    const TYPE2 = "two";

    function Handler1(value){
        this.value = value ? value : DEFAULT1;
        this.json = function() { return this.value; }
        this.clone = function () { return new Handler1(this.value) }
    }

    function Handler2(value){
        this.value = value ? value : DEFAULT2;
        this.json = function() { return this.value; }
        this.clone = function () { return new Handler2(this.value) }
    }


    beforeEach(angular.mock.module("overlook"));

    beforeEach(inject(function(_okDataTypes_){
        dataTypes = _okDataTypes_;
        dataTypes[TYPE1] = Handler1;
        dataTypes[TYPE2] = Handler2;
    }));

    beforeEach(inject(function(_okDataField_){
        dataField = _okDataField_;
    }));

    beforeEach(inject(function(_okDataObjects_){
        dataObjects = _okDataObjects_;
    }));

    it("should be available", function(){
        expect(dataObjects).toBeTruthy();
    })

    beforeEach(function(){
        factory = dataObjects.createFactory([
            dataField("prop1", TYPE1),
            dataField("prop2", TYPE2),
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