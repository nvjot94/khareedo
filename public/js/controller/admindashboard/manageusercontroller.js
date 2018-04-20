app.controller("manageusers", function ($scope, myfactory, indexFactory)

    {

        function getadmins() {
            indexFactory.callToserver("/getadmins").then(function (res) {
                $scope.admins = res.data;
            });
        };
        getadmins();






        $scope.addUser = function () {
            let obj = {
                name: $scope.name,
                empId: $scope.id,
                email: $scope.email,
                designation: $scope.designation,
                salary: $scope.salary,
                phone: $scope.phone,
                address: $scope.address,
                status: $scope.status
            };

            $scope.admins.push(obj);
            indexFactory.postAjaxCall("/signupadmin", obj);

        };

       $scope.getSelectedIndex= function(user)
        {
         $scope.userToBeDeleted= $scope.admins.findIndex((element)=>
        {
           
          return element.empId==user;
        });
    


        };

      
        $scope.view = function () {
           
            $scope.viewObject=$scope.admins[$scope.userToBeDeleted];
            console.log($scope.viewObject);
           
        };
    

        $scope.delete = function () {
            //console.log( $scope.userToBeDeleted);
            indexFactory.postAjaxCall("/deleteadmin",{empId:$scope.admins[$scope.userToBeDeleted].empId});
            $scope.admins.splice($scope.userToBeDeleted, 1);
            window.location.reload();
        };
    });