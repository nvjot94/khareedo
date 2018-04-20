app.controller('categoryController', function ($scope, $http, $localStorage, myfactory) {

    $scope.saveState = false;

    // $scope.categories = [{
    //     "category": "Electronics",
    //     "desc": "This is electronics category",
    //     fields: [],
    //     "subcategories": [{
    //         "subcategory": "Mobiles",
    //         "sets": [{
    //             "field": "id"
    //         }, {
    //             "field": "img"
    //         }]
    //     }, {
    //         "subcategory": "Television",
    //         "sets": []
    //     }, {
    //         "subcategory": "Remote",
    //         "sets": []
    //     }]
    // },
    // {
    //     "category": "Clothes",
    //     "desc": "This is Clothings category",
    //     "fields": [{
    //         "field": "price"
    //     }, {
    //         "field": "rating"
    //     }],
    //     "subcategories": [{
    //         "subcategory": "Shirt",
    //         "sets": []
    //     },
    //     {
    //         "subcategory": "Jean",
    //         "sets": []
    //     }
    //     ]
    // }
    // ];

    //TO BE REMOVED AND GET CATEGORIES DATA FROM DB
    $scope.categories = [];

    // $localStorage.categories = $scope.categories;
    // if ($localStorage.categories) {
    //     $scope.categories = $localStorage.categories;
    // }

    $scope.activateSave = function () {
        $scope.saveState = true;
    };

    $scope.removeItem = function (index) {
        $scope.categories.splice(index, 1);
        $scope.activateSave();
    };

    $scope.removeSub = function (obj, index) {
        obj.subcategories.splice(index, 1);
        $scope.activateSave();
    };

    $scope.removeField = function (obj, index) {
        obj.fields.splice(index, 1);
        $scope.activateSave();
    }

    $scope.removeSet = function (obj, index) {
        obj.sets.splice(index, 1);
        $scope.activateSave();
    }
    $scope.saveCategoriesToDB = function () {
        //let categoriesList = localStorage.getItem("ngStorage-categories");
        let categoriesList = $scope.categories;
        console.log("Categories inside saveCategories to DB are : ", categoriesList);

        console.log("will make ajax call to db now");
        let promise = myfactory.postAjaxCall("/saveCategories", categoriesList);
        promise.then(function (data) {
            console.log("saveCategoriescontroller inside promise.then abcd");
            console.log(data);
            if (data.data.result == true) {
                console.log("Result inside saveCategoriescontroller:  ");
                console.log(data.data.message);
                // indexFactory.redirectToRegister(SERVERURL + data.data.data.redirectpath);

            }
        }, function (error) {
            console.log("some server problem" + error);
        });
    }
    $scope.saveScope = function () {
        // Ajax Call to save data
        alert('Saved!');
        $scope.saveState = false;
        // $localStorage.categories = $scope.categories;
        $scope.saveCategoriesToDB();

    }
    $scope.getCategoriesFromDB = function () {
        //let categoriesList = localStorage.getItem("ngStorage-categories");
        //let categoriesList = $scope.categories;
        console.log(" inside getCategories from DB ");

        console.log("will make ajax call to db now");
        let promise = myfactory.postAjaxCall("/fetchCategories", { a: 1 });
        promise.then(function (data) {
            console.log("fetchCategoriescontroller inside promise.then abcd");
            console.log(data);
            if (data.data.result == true) {
                console.log("Result :  ");
                console.log(data.data);
                $scope.categories = data.data.categoriesjson.categories;
                console.log("$scope.categories inside getCategories is :", $scope.categories);
                // indexFactory.redirectToRegister(SERVERURL + data.data.data.redirectpath);

            }
        }, function (error) {
            console.log("some server problem" + error);
        });
    }
    $scope.getCategoriesFromDB();
});