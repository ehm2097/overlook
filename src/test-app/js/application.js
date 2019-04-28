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

    this.getCustomers = function(){
        return $q(function(resolve){ 
            resolve({
                data: angular.copy(customers)
            }); 
        })
    };

    this.createCustomer = function(customer){
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

    return this;
}


