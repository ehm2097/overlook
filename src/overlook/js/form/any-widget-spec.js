describe("Generic widget directive", function(){

    var $document;
    var $compile;
    var scope;

    function testWidget(typeName, data, widgetName) {

        return function(){
            // Test constants and derivates
            const METADATA_NAME = "ok-metadata";
            const METADATA_VALUE = "metadata";
            const DATA_NAME = "ok-data";
            const DATA_VALUE = "data";
            var id = typeName + "WidgetId";

            // Build HTML structure
            var html = $document.createElement("ok-any-widget");
            html.setAttribute(METADATA_NAME, METADATA_VALUE);
            html.setAttribute(DATA_NAME, DATA_VALUE);
            var element = angular.element(html);

            // Initialize scope with required information
            scope.metadata = {
                field: { 
                    type: {
                        prototype: {
                            getTypeName: function(){
                                return typeName;
                            }    
                        }
                    }, 
                    source: id 
                } 
            };
            scope.data = {};
            scope.data[id] = data;

            // Let angular forces do their magic
            $compile(element)(scope);
            scope.$digest();
            
            // Finally manifest some expectations 
            var widget = element.find(widgetName);
            expect(widget).not.toBeNull();
            expect(widget[0].getAttribute(METADATA_NAME)).toEqual(METADATA_VALUE);
            expect(widget[0].getAttribute(DATA_NAME)).toEqual(DATA_VALUE);
        }
    }

    beforeEach(angular.mock.module("overlook"));

    beforeEach(angular.mock.module("templates"));

    beforeEach(inject(function(_$compile_, _$document_, _$rootScope_){
        $compile = _$compile_;
        $document = _$document_[0];
        scope = _$rootScope_;
    }));

    it("should create text widget", testWidget("text", { value: "ABC" }, "ok-text-widget"));
    it("should create check box widget", testWidget("boolean", { value: true }, "ok-check-box-widget"));
});