app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/", {
        templateUrl: "./../../views/superuserregistration/register.html",
        controller: "registercontroller"
    }).when("/companydetails", {
        templateUrl: "./../../views/superuserregistration/companydetails.html",
        controller: "companydetailscontroller"
    }).when("/financialdetails", {
        templateUrl: "../../views/superuserregistration/financialdetails.html",
        controller: "financecontroller"
    }).when("/cardDetails", {
        templateUrl: "../../views/superuserregistration/cardDetails.html",
        controller: "cardDetailsController"
    }).when("/imageupload", {
        templateUrl: "../../views/superuserregistration/imageupload.html",
        // controller: "imageuploadcontroller"
    })
        .otherwise({ template: "Error Page , No Match Found" });


    // $routeProvider.when("/register",{
    //     templateUrl:"../../views/admin/register.html",
    //     controller:"registercontroller"
    // }).when("/demo",{
    //     templateUrl:"../../views/admin/demo.html",
    //     controller:"demoCtrl"
    // }).when("/financialdetails",{
    //     templateUrl:"../../views/admin/financialdetails.html",
    //     controller:"financecontroller"
    // }).when("/companydetails",{
    //     templateUrl:"../../views/admin/companydetails.html",
    //     controller:"companydetailscontroller"
    // }).when("/",{
    //     templateUrl:"../../views/home.html"

    // })
    // .otherwise({template:"Error Page , No Match Found"});
});