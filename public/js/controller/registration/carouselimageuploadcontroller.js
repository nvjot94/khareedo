// app.controller("imageuploadcontroller", ['Upload', '$window', function (Upload, $window, $scope, $location, adminFactory, IMAGEUPLOADURL) {
app.controller("carouselimageuploadcontroller", ['Upload', '$window', function (Upload, $window) {
    if (!localStorage.userid) {
        window.location.href = '/views/superuserregistration/demo.html';
    }

    console.log("Carousel Image upload controller loaded successfully.......");
    //let IMAGEUPLOADURL = "/imageuploadcarousel";
    let IMAGEUPLOADURL = localStorage.CAROUSELIMAGEUPLOADURL;
    console.log("carousel url is ", IMAGEUPLOADURL)
    var vm = this;
    // if (localStorage.CAROUSELIMAGEFILEPATH) {
    //     vm.file = localStorage.CAROUSELIMAGEFILEPATH;
    // }
    vm.submit = function () { //function to call on form submit
        console.log("Inside submit method");
        // if (vm.upload_form.file.$valid & amp;& amp; vm.file) { //check if form is valid
        if (vm.upload_form.file.$valid && vm.file) { //check if form is valid
            console.log("will call upload method");
            vm.upload(vm.file); //call upload function
        }
    }
    vm.upload = function (file) {
        console.log("inside vm upload method .......")
        console.log(IMAGEUPLOADURL);

        Upload.upload({

            //url: 'http://localhost:1234/imageuploadcarousel', //webAPI exposed to upload the file
            url: IMAGEUPLOADURL, //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            console.log("Received response is : ", resp);
            if (resp.data.error_code === 0) { //validate success
                console.log("inside vm upload method with resp");
                localStorage.CAROUSELIMAGEFILEPATH = localStorage.CAROUSELIMAGEFILEPATH + "," + resp.data.uploadpath;
                //localStorage.CAROUSELIMAGEFILEPATH = [resp.data.uploadpath];
                $window.alert('Image ' + resp.config.data.file.name + ' uploaded successfully ');
            } else {
                console.log("inside vm upload method with error");
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log("Received response is : ", resp);
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    }
}]);