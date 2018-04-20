// app.controller("cardDetailsController",function($scope,adminFactory,CARDDETAILSURL){
app.controller("cardDetailsController", function ($scope, $location, indexFactory, CARDDETAILSURL) {
    if (!localStorage.userid) {
        indexFactory.redirectToRegister('/views/superuserregistration/demo.html');
    } //         $scope.next=function(){
    //         var cardno = $scope.cardno;
    //         var cardholdername = $scope.cardholdername;
    //         var cvv = $scope.cvv;
    //         var cardtype = $scope.cardtype;
    //         var expirydate=$scope.expirydate;
    //         var cardprovider=$scope.cardprovider;
    //         var bank=$scope.bank;
    //         var branch=$scope.branch;

    //        // console.log(" ");
    //         const cardDetailsObject = {"cardno":cardno,"cardholdername":cardholdername,"cvv":cvv,"cardtype":cardtype,"expirydate":expirydate,"bank":bank,"branch":branch};
    //         console.log(cardDetailsObject);
    //         var promise = adminFactory.doAjaxCall(CARDDETAILSURL,cardDetailsObject);
    //         promise.then(function(data){
    //             $scope.data = data;
    //         },function(error){
    //             $scope.err = "some server problem"+error;

    // });
    // }

    $scope.next = function () {
        let cardno = $scope.cardno;
        let cardholdername = $scope.cardholdername;
        let cvv = $scope.cvv;
        let cardtype = $scope.cardtype;
        let expirydate = $scope.expirydate;
        let cardprovider = $scope.cardprovider;
        let bank = $scope.bank;
        let branch = $scope.branch;
        // let ifsc = $scope.ifsc;
        let ifsc = "cvfbnhmj";
        let userid = localStorage.userid;
        let password = localStorage.password;

        const cardDetailsObject = { "cardno": cardno, "cardprovider": cardprovider, "cardholdername": cardholdername, "cvv": cvv, "cardtype": cardtype, "expirydate": expirydate, "bank": bank, "branch": branch, "userid": userid, "password": password, "ifsc": ifsc };
        console.log(cardDetailsObject);
        var promise = indexFactory.postAjaxCall(CARDDETAILSURL, cardDetailsObject);
        promise.then(function (data) {
            if (data.data.result == true) {
                // $scope.data = data;
                $location.path("/imageupload");
                console.log("done");
            }
        }, function (error) {
            // $scope.err = "some server problem" + error;
            console.log("error");
        });
    }

    // $scope.validate=(formName)=>{
    // if(formName.$valid){
    //     $scope.result = "Form is Valid..."
    // } 
    // else{
    //     $scope.result = "Invaid Form ";
    // }      
    // }
    $scope.validate = (formName) => {
        if (formName.$valid) {
            $scope.result = "Form is Valid...";
            $scope.next();
        }
        else {
            $scope.result = "Invaid Form ";
            //$scope.next();
        }
    }
});