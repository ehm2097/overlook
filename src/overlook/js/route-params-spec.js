
describe("Route parameter handler", function(){

    var routeParams;

    beforeEach(angular.mock.module("overlook"));

    beforeEach(inject(function(_okRouteParams_){
        routeParams = _okRouteParams_;
    }));

    it("should be available", function(){
        expect(routeParams).toBeDefined();
    }); 

    describe("Route parameter encoder", function(){

        it("should be available", function(){
            expect(routeParams.encode).toBeDefined();
        });

        it("should encode single params", function(){
            expect(routeParams.encode(
                { 
                    task: 1000 
                }))
            .toEqual("t1000");
        });

        it("should encode multiple params", function(){
            expect(routeParams.encode(
                { 
                    task: 1000,
                    person: "ABC" 
                }))
            .toEqual("t1000-pABC");
        });

        it("should resolve ambiguous shortcut names", function(){
            expect(routeParams.encode(
                { 
                    task: 1,
                    tusk: 2 
                }))
            .toEqual("t1-u2");
        });
    })

    describe("Route parameter decoder", function(){

        it("should be available", function(){
            expect(routeParams.decode).toBeDefined();
        });

        it("should support missing param values", function(){
            var data = {};
            expect(routeParams.decode(data, null)).toBe(data);
        });

        it("should decode single params", function(){
            expect(routeParams.decode({task: null}, "t1000").task).toEqual("1000");
        });

        it("should decode multiple params", function(){

            var data = { task: null, person: null }
            routeParams.decode(data, "t1000-pABC");
            expect(data.task).toEqual("1000");
            expect(data.person).toEqual("ABC");
        });

        it("should resolve ambiguous shortcut names", function(){

            var data = { task: null, tusk: null }
            routeParams.decode(data, "t1-u2");
            expect(data.task).toEqual("1");
            expect(data.tusk).toEqual("2");
        });
    });

 });