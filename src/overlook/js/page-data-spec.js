
describe("Page Data Service", function(){

    var pageData;

    var getParentSpy = jasmine.createSpy("getParents");
    var getChildSpy = jasmine.createSpy("getChildren");

    var data = {
        getParents: ["external", getParentSpy],
        getChildren: ["foreignKey", getChildSpy]
    };

    var routeParams = {
        decode: function(args, text) {
            if((typeof(args.external) != "undefined") && text == "eEXT") args.external = "EXT";
        }
    };

    var route = { current: { params: { params: "eEXT" } } };


    beforeEach(angular.mock.module("overlook"));

    beforeEach(module(function($provide){
        $provide.value("okData", data);
        $provide.value("okRouteParams", routeParams);
        $provide.value("$route", route);
    }));

    beforeEach(inject(function(_okPageData_){
        pageData = _okPageData_;
    }));

    it("should be available", function(){
        expect(pageData).toBeDefined();
    }); 

    it("should properly manage a single entity page", function(){

        // Initialize page data
        pageData.initialize();

        // Register and check entity
        var entity = pageData.registerEntity({
            name: "entity",
            source: "getParents"
        });
        expect(entity).toBeTruthy();

        // Retrieve entity data
        expect(entity.retrieve).toBeDefined();
        entity.retrieve();
        expect(getParentSpy).toHaveBeenCalledWith({external: "EXT"});
    });

    it("should properly manage a parent+child entity page", function(){

        // Initialize page data
        pageData.initialize();

        // Register and check parent entity
        var parent = pageData.registerEntity({
            name: "parent",
            source: "getParents"
        });
        expect(parent).toBeTruthy();

        // Register and check child entity
        var child = pageData.registerEntity({
            name: "child",
            parent: "parent",
            source: "getChildren"
        });
        expect(child).toBeTruthy();

        // Simulate parent selection
        var selection = parent.getSelection();
        expect(selection).toBeDefined();
        expect(selection.select).toBeDefined();
        selection.select({foreignKey: "FK"});

        // Retrieve child data
        expect(child.retrieve).toBeDefined();
        child.retrieve();
        expect(getChildSpy).toHaveBeenCalledWith({foreignKey: "FK"});
    });

});
