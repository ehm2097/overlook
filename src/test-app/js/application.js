angular.module("application", ["overlook"])

.config(["okAppContextProvider", function(okAppContextProvider){
    okAppContextProvider.setupPageUrl("/template/");
    okAppContextProvider.setupMenuUrl("/template/application-menu.html");
}])

.decorator("okData", ["$http", "$q", ServerEmulator]);

function ServerEmulator($http, $q){
    var customers = [
        { code: "CL1", name: "Some Random Customer", unblocked: true, since: "2010-01-13" },
        { code: "CL2", name: "A Completely Different Customer", unblocked: true, since: "2015-06-30" },
        { code: "CL3", name: "The Very Last Of Customers", unblocked: false }
    ];

    var features = [
        { customer: "CL1", code: "CL1F1",  name: "Feature #1" },
        { customer: "CL1", code: "CL1F2",  name: "Feature #2" },
        { customer: "CL2", code: "CL2FN",  name: "Just Another Feature" }
    ];

    var holidays = [
        { person_code: "GDU", person_fullName: "Gigi Duru", fromDate: "2019-06-03", toDate: "2019-06-04",  description: "Chiul" },
        { person_code: "TSU", person_fullName: "Titi Suru", fromDate: "2019-06-05", toDate: "2019-06-06",  description: "Concediu" }
    ];

    this.getCustomers = [function(){
        return $q(function(resolve){ 
            resolve({
                data: angular.copy(customers)
            }); 
        })
    }];

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
            else {
                for(i in customers){
                    if(customers[i].code == customer.code) customers[i] = customer;
                }
                resolve();  
            }     
        })
    }

    this.deleteCustomer = function(customer){
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

    this.getFeatures = ["customer", function(args) {
        var result = [];
        if(args.customer == "CL1") result = features.slice(0,2);
        if(args.customer == "CL2") result = features.slice(2,3);
        return $q(function(resolve){ resolve({ data: result });  })
    }];

    this.getPeople = [function(){
        return $q(function(resolve){ 
            resolve({
                data: []
            }); 
        })
    }];

    this.getHolidays = [function(){
        return $q(function(resolve){ 
            resolve({
                data: angular.copy(holidays)
            }); 
        })
    }];

    return this;
}


