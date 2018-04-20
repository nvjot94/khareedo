app.controller("carouselcontroller", function ($scope, $location, indexFactory, CAROUSELURL, SERVERURL) {
    $scope.finish = function () {
        // window.location.href = SERVERURL;
        let object = {};

        object.userid = localStorage.userid;
        object.password = localStorage.password;
        object.carouselimagefilepath = localStorage.CAROUSELIMAGEFILEPATH.split(",");

        let promise = indexFactory.postAjaxCall(CAROUSELURL, object);
        promise.then(function (data) {
            //$scope.data = data;
            //$location.path("/financialdetails");
            console.log("data is ", data);
            if (data.data.result == true) {
                console.log("Result is ", data.result);
                localStorage.userid = "";
                localStorage.password = "";
                window.location.href = "/";
                delete localStorage.LOGOIMAGEUPLOADURL;
                delete localStorage.CAROUSELIMAGEFILEPATH;
                delete localStorage.CAROUSELIMAGEUPLOADURL;
                delete localStorage.LOGOIMAGEFILEPATH;
                delete localStorage.PRODUCTIMAGEUPLOADURL;
                delete localStorage.userid;
                delete localStorage.password;
            }
        }, function (error) {

            // $scope.err = "some server problem" + error;
            console.log("error ");


        });
    }

});
