app.controller("indexController", function ($scope,$rootScope, indexFactory, $localStorage, DATAURL, MENUURL, WEBSITECHECKURL, SERVERURL, CHECKOTPURL,ADMINREDIRECT) {
    $scope.uservalid = $localStorage.uservalid;
    $rootScope.cartCount= $localStorage.products.length;   
    $scope.otpMatch=false; 
    function checkRegistered() {
        console.log("Inside checkRegistered method in indexcontroller");
        const adminObj = {
            "checkregistered": "check"
        };
        let promise = indexFactory.postAjaxCall(WEBSITECHECKURL, adminObj);
        promise.then(function (data) {
            console.log("websitecheckcontroller inside promise.then abcd");
            console.log(data);
            if (data.data.result == false) {
                console.log("Will call register page now with path ");
                console.log(data.data.data.redirectpath);
                indexFactory.redirectToRegister(SERVERURL + data.data.data.redirectpath);

            }
        }, function (error) {
            console.log("some server problem" + error);
        });
    }
    checkRegistered();


    var promiseData = indexFactory.callToserver(DATAURL);
    promiseData.then(function (res) {
        $scope.productdata = res.data;
    }, function (err) {
        $scope.productdata = err;
    });

   if(!$localStorage.uservalid)
   {
    $localStorage.uservalid=false;
   }
   

    

    $scope.userLogin = function () {
        console.log("login console");
        let pro = indexFactory.postAjaxCall("/login", {
            mobilenumber: $scope.mobilenumber,
            password: $scope.password
        });

        pro.then(function (res) {
            if (res.data.uservalid) {
                $localStorage.uservalid = res.data.uservalid;
                $scope.uservalid = $localStorage.uservalid;

                if(res.data.role=="client")
                {
                    setTimeout( reload, 1000);
                }
                if(res.data.role=="admin")
                {
                    setTimeout(redirectToCrud, 1000);
                }
              
             };

             if(res.data.msg)
             {
                 alert(`${res.data.msg}`);
             }
             if(res.data.pw)
             {
                 alert(`${res.data.pw}`);
             }

        }, function (err) {
            console.log(err);
        })
    };

    function reload() {
        location.reload();
    }

    function redirectToCrud()
    {
        window.location.href = ADMINREDIRECT;
    };

    $scope.getCart = function () {
        if ($localStorage.products) {
            console.log($localStorage.products);
        } else {

            var promiseData = indexFactory.callToserver("/cartdata");
            promiseData.then(function (res) {
                console.log(res.data);
            })

        }

    };



    $scope.userLogout = function () {
        let logoutPromise = indexFactory.callToserver("/logout");
        logoutPromise.then(function (res) {    
            $localStorage.uservalid = res.data.uservalid;
            $scope.uservalid = $localStorage.uservalid;
            $localStorage.products=[];
            $localStorage.favProducts=[];
            setTimeout(reload, 1000);

        }, function (err) {
            console.log(err);
        })
    };
    $scope.checkExistence=function()
    {  $scope.isThere=false;
        let pro = indexFactory.postAjaxCall("/checkexistence", {
            mobilenumber: $scope.mob
        });
       
        pro.then(function(res)
    {  console.log(res.data.status);
          if(res.data.status=="true")
        {
            $scope.isThere=true;
          //  console.log("user exist");
        }
        else if(res.data.status=="false")
        {
            $scope.isThere=false;
           // console.log("user does not exist");
        }
       
      
      
     } ,function(err){
        console.log(err);
    })
        
    };

    $scope.signUpUser=function()
    {
        let obj=
        {
            mobilenumber:$scope.mob,
            username:$scope.username,
            password:$scope.password,
            pwagain:$scope.pwagain
        }
        console.log("here at signup",obj);
        let pro = indexFactory.postAjaxCall("/signup",obj).then((response)=>
    {
        if(response.data.status)
        {
            reload();
        }
    });
    }


    $scope.hideModel = function () {
        $('#LoginModal').modal('hide');
    }

    $scope.genOtp = function () {
        console.log("genotp function");
        indexFactory.genOtp(CHECKOTPURL, {
            number: $scope.mob
        });

    };

    $scope.forgetPassword=function()
    {
        let pro = indexFactory.postAjaxCall("/checkexistence", {
            mobilenumber: $scope.mob
        });
        pro.then(function(response)
    {   
        
        if(response.data.status=='true')
        {   
            $scope.otpMatch=false;
            indexFactory.genOtp(CHECKOTPURL, {
                number: $scope.mob
            });
        }
        else if(response.data.status=='false')
        {
            alert("user with this mobile number doesnot exist");
        }
    });
    };
    $scope.changePw=function()
    {
        let pro = indexFactory.postAjaxCall("/changepw", {
            mobilenumber: $scope.mob,
            password:$scope.pass
        });
        pro.then(function(res)
    {
        console.log("im here 1");
        if(res.data.status==true)
        {
            console.log("im here 2");
            reload();
        }
    });
    };

    $scope.verifyOtp = function () {
       
            $scope.otpMatch=false;
            indexFactory.verifyOtp("/isotpsame", {
                mobilenumber:$scope.mob,
                otp: $scope.enteredOtp
            }).then((response)=>
            {
                if(response.data.status)
                {
                    console.log(response.data.status);
                    $scope.otpMatch=true;
                }
               else if(!response.data.status)
                {
                    console.log(response.data.status);
                    $scope.otpMatch=false;
                }
               
              
            });;
        

    };

});