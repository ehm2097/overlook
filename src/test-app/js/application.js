angular.module("application", ["overlook"])

.config(["okAppContextProvider", function(okAppContextProvider){
    okAppContextProvider.setupPageUrl("/template/app/");
    okAppContextProvider.setupMenuUrl("/template/app/application-menu.html");
}])

.decorator("okData", ["$http", "$q", ServerEmulator]);

function ServerEmulator($http, $q){
    var customers = [
        { code: "CL1", name: "Some Random Customer" },
        { code: "CL2", name: "A Completely Different Customer" },
        { code: "CL3", name: "The Very Last Of Customers" }
    ];
    var features = [
        { customer: "CL1", code: "CL1F1",  name: "Feature #1" },
        { customer: "CL1", code: "CL1F2",  name: "Feature #2" },
        { customer: "CL2", code: "CL2FN",  name: "Just Another Feature" }
    ];

    this.getCustomers = function(){
        return $q(function(resolve){ 
            resolve({
                data: angular.copy(customers)
            }); 
        })
    };

    this.createCustomer = function(){
        return $q(function(resolve, reject){ 
            var found = customers.find(function(item){
                return item.code == customer.code;
            });       
            if(found) reject();
            else {
                customers.push(customer);
                resolve();  
            } 
        })
    }

    this.updateCustomer = function(customer){
        return $q(function(resolve, reject){ 
            if(customer.code == "CL1") reject();
            else resolve();       
        })
    }

    this.deleteCustomers = function(customer){
        return $q(function(resolve, reject){ 
            var found = customers.findIndex(function(item){
                return item.code == customer.code;
            });       
            if(found >= 0) {
                customers.splice(found, 1);
                resolve();
            }
            else reject();       
        })
    }

    this.getFeatures = function(filters) {
        var result = [];
        if(filters.customer == "CL1") result = features.slice(0,2);
        if(filters.customer == "CL2") result = features.slice(2,3);
        return $q(function(resolve){ resolve({ data: result });  })
    }

    return this;
}


