// app.controller("financecontroller",function($scope,adminFactory,FINANCIALDETAILSURL){
app.controller("financecontroller", function ($scope, $location, indexFactory, FINANCIALDETAILSURL) {
    if (!localStorage.userid) {
        indexFactory.redirectToRegister('/views/superuserregistration/demo.html');
    }
    //         $scope.next=function(){
    //             var accountno = $scope.accountno;
    //             var accounttype = $scope.accounttype;
    //             var holdername = $scope.holdername;
    //             var bankname = $scope.bankname;
    //             var branch=$scope.branch;
    //             var ifsc=$scope.ifsc;

    //            // console.log(" ");
    //             const finacialDetailsObj = {"accountno":accountno,"accounttype":accounttype,"holdername":holdername,"bankname":bankname,"branch":branch,"ifsc":ifsc};
    //             console.log(finacialDetailsObj);
    //             var promise = adminFactory.doAjaxCall(FINANCIALDETAILSURL,finacialDetailsObj);
    //             promise.then(function(data){
    //                 $scope.data = data;
    //             },function(error){
    //                 $scope.err = "some server problem"+error;

    //     });
    // }

    $scope.next = function () {
        let accountno = $scope.accountno;
        let accounttype = $scope.accounttype;
        let holdername = $scope.holdername;
        let bankname = $scope.bankname;
        let branch = $scope.branch;
        let ifsc = $scope.ifsc;
        let userid = localStorage.userid;
        let password = localStorage.password;
        // console.log(" ");
        const financialDetailsObj = { "accountno": accountno, "accounttype": accounttype, "holdername": holdername, "bankname": bankname, "branch": branch, "ifsc": ifsc, "userid": userid, "password": password };
        console.log(financialDetailsObj);
        var promise = indexFactory.postAjaxCall(FINANCIALDETAILSURL, financialDetailsObj);
        promise.then(function (data) {
            //$scope.data = data;
            console.log(data);
            if (data.data.result == true) {
                $location.path("/cardDetails");
            }
        }, function (error) {
            //$scope.err = "some server problem" + error;
            console.log("error");
        });
    }

    // $scope.validate=(formName)=>{
    //     if(formName.$valid){
    //         $scope.result = "Form is Valid..."
    //     } 
    //     else{
    //         $scope.result = "Invaid Form ";
    //     }      
    // }
    $scope.validate = (formName) => {
        if (formName.$valid) {
            $scope.result = "Form is Valid...";
            $scope.next();
        }
        else {
            $scope.result = "Invaid Form ";
            // $scope.next();
        }
    }
    // $scope.clear=function(){
    //     $scope.accountno="";
    //     $scope.accounttype="";
    //      $scope.holdername="";
    //     $scope.bankname="";
    //     $scope.branch="";
    //     $scope.ifsc="";
    //     $scope.bankcity="";
    // }
});
