app.controller("registercontroller", function ($scope, $location, indexFactory, REGISTERURL, SERVERURL) {
    function checkRegistered() {
        console.log("Inside checkRegistered method in Registercontroller");
        const adminObj = { "checkregistered": "check" };
        let promise = indexFactory.postAjaxCall("/websitecheck", adminObj);
        console.log("made db backend call waiting for response");
        promise.then(function (data) {
            console.log("websitecheckcontroller inside promise.then abcd");
            console.log(data);
            if (data.data.result == true) {
                console.log("Will call index page now with path ");
                console.log(SERVERURL);
                indexFactory.redirectToRegister(SERVERURL);

            }
        }, function (error) {
            console.log("some server problem" + error);
        });
    }
    checkRegistered();
    $scope.register = function () {
        let name = $scope.name;
        let userid = $scope.userid;
        let registrationuserid = $scope.registrationuserid;
        let oldpassword = $scope.oldpassword;
        let password = "";
        if ($scope.password === $scope.repass)
            password = $scope.password;
        let phoneno = $scope.phoneno;
        let dob = $scope.dob;

        console.log(phoneno + "" + dob);
        const adminObj = { "name": name, "userid": userid, "registrationuserid": registrationuserid, "oldpassword": oldpassword, "password": password, "phoneno": phoneno, "dob": dob };
        console.log(adminObj);
        let promise = indexFactory.postAjaxCall(REGISTERURL, adminObj);
        promise.then(function (data) {
            console.log(data);
            //$scope.data=data;
            if (data.data.result == true) {
                localStorage.userid = $scope.userid;
                localStorage.password = $scope.password;
                $location.path("/companydetails");
            }
        }, function (error) {
            $scope.err = "some server problem" + error;
        });
    }

    $scope.validate = (formName) => {
        if (formName.$valid) {
            if ($scope.password === $scope.repass) {
                console.log("Form is valid");
                $scope.result = "Form is Valid...";
                $scope.register();
            }
        }
        else {
            console.log("Form is invalid");
            $scope.result = "Invalid Form ";
            //$scope.register();
        }
    }
});

