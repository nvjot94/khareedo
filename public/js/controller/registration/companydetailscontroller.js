// app.controller("companydetailscontroller",function($scope,adminFactory,COMPANYDETAILSURL){
app.controller("companydetailscontroller", function ($scope, $location, indexFactory, COMPANYDETAILSURL) {
    if (!localStorage.userid) {
        indexFactory.redirectToRegister('/views/superuserregistration/demo.html');
    }
    //         $scope.next=function(){
    //         var companyname = $scope.companyname;
    //         var description = $scope.description;
    //         var tagline = $scope.tagline;
    //         var logo = $scope.logo;
    //         var line1=$scope.line1;
    //         var line2=$scope.line2;
    //         var city=$scope.city;
    //         var state=$scope.state;
    //         var country=$scope.country;
    //         var zipcode=$scope.zipcode;
    //         var maplink=$scope.maplink;
    //         var longitude=$scope.longitude;
    //         var latitude=$scope.latitude;
    //         var contacts=$scope.contacts;
    //         var officeno=$scope.officeno;
    //         var emailid=$scope.emailid;
    //         var fax=$scope.fax;
    //        // console.log(" ");
    //         const companyDetailsObj = {"companyname":companyname,"description":description,"tagline":tagline,"logo":logo,"line1":line1,"line2":line2,"city":city,
    //         "state":state,"country":country,"zipcode":zipcode,"maplink":maplink,"longitude":longitude,"latitude":latitude,"phoneno":contacts,"officeno":officeno,"emailid":emailid,"fax":fax};
    //         console.log(companyDetailsObj);
    //         var promise = adminFactory.doAjaxCall(COMPANYDETAILSURL,companyDetailsObj);
    //         promise.then(function(data){
    //             $scope.data = data;
    //         },function(error){
    //             $scope.err = "some server problem"+error;

    // });
    // }

    $scope.next = function () {
        let companyname = $scope.companyname;
        let description = $scope.description;
        let tagline = $scope.tagline;
        let logo = localStorage.LOGOIMAGEFILEPATH;
        let line1 = $scope.line1;
        let city = $scope.city;
        let state = $scope.state;
        let country = $scope.country;
        let zipcode = $scope.zipcode;
        let maplink = $scope.maplink;
        let longitude = $scope.longitude;
        let latitude = $scope.latitude;
        let contacts = $scope.contacts;
        let officeno = $scope.officeno;
        let emailid = $scope.emailid;
        let fax = $scope.fax;
        let password = localStorage.password;
        let userid = localStorage.userid;
        // console.log(" ");
        const companyDetailsObj = {
            "userid": userid, "password": password, "companyname": companyname, "description": description, "tagline": tagline, "logo": logo, "line1": line1, "city": city,
            "state": state, "country": country, "zipcode": zipcode, "maplink": maplink, "longitude": longitude, "latitude": latitude, "phoneno": contacts, "officeno": officeno, "emailid": emailid, "fax": fax
        };
        console.log(companyDetailsObj);
        var promise = indexFactory.postAjaxCall(COMPANYDETAILSURL, companyDetailsObj);
        promise.then(function (data) {
            console.log(data);
            if (data.data.result == true) {
                $location.path("/financialdetails");
            }
        }, function (error) {

            //$scope.err = "some server problem" + error;
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
        console.log("Inside validate");
        if (formName.$valid) {
            console.log("Valid Form");
            //$scope.result = "Form is Valid...";
            $scope.next();
        }
        else {
            console.log("invalid Form");
            //$scope.result = "Invaid Form ";
            //$scope.next();
        }
    }
    // $scope.clear=function(){
    //     $scope.companyname="";
    //     $scope.description="";
    //      $scope.tagline="";
    //     $scope.logo="";
    //     $scope.line1="";
    //     $scope.line2="";
    //     $scope.city="";
    //     $scope.state="";
    //     $scope.country="";
    //      $scope.zipcode="";
    //     $scope.longitude="";
    //     $scope.latitude="";
    //     $scope.phoneno="";
    //     $scope.oficeno="";
    //     $scope.emailid="";
    //     $scope.fax="";
    // }

    $scope.contacts = [{ number: "" }]
    $scope.addContact = function () {
        $scope.contacts.push({ number: "" })
    }
});
// app.controller("logoimageuploadcontroller", ['Upload', '$window', function (Upload, $window) {
//     console.log("Image upload controller loaded successfully.......");
//     let IMAGEUPLOADURL = "/imageuploadcarousel";
//     console.log("carousel url is ", IMAGEUPLOADURL)
//     var vm = this;
//     vm.submit = function () { //function to call on form submit
//         console.log("Inside submit method");
//         // if (vm.upload_form.file.$valid & amp;& amp; vm.file) { //check if form is valid
//         if (vm.upload_form.file.$valid && vm.file) { //check if form is valid
//             console.log("will call upload method");
//             vm.upload(vm.file); //call upload function
//         }
//     }
//     vm.upload = function (file) {
//         console.log("inside vm upload method .......")
//         console.log(IMAGEUPLOADURL);

//         Upload.upload({

//             //url: 'http://localhost:1234/imageuploadcarousel', //webAPI exposed to upload the file
//             url: IMAGEUPLOADURL, //webAPI exposed to upload the file
//             data: { file: file } //pass file as data, should be user ng-model
//         }).then(function (resp) { //upload function returns a promise
//             console.log("Received response is : ", resp);
//             if (resp.data.error_code === 0) { //validate success
//                 console.log("inside vm upload method with resp");
//                 $window.alert('Image ' + resp.config.data.file.name + ' uploaded successfully ');
//             } else {
//                 console.log("inside vm upload method with error");
//                 $window.alert('an error occured');
//             }
//         }, function (resp) { //catch error
//             console.log("Received response is : ", resp);
//             console.log('Error status: ' + resp.status);
//             $window.alert('Error status: ' + resp.status);
//         }, function (evt) {
//             console.log(evt);
//             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//             vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
//         });
//     }
// }]);
