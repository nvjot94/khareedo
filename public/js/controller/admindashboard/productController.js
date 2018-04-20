app.controller('productController', function ($scope, $window, myfactory, $localStorage, ADDPRODUCTURL, GETCATEGORIESURL) {

    $scope.categories = [];
    $scope.getCategoriesFromDB = function () {
        let promise = myfactory.postAjaxCall(GETCATEGORIESURL, { KEY: "VALUE" });
        promise.then(function (data) {
            console.log("productcontroller inside promise.then");
            console.log(data);
            if (data.data.result == true) {
                $scope.categories = data.data.categoriesjson.categories;
                console.log("$scope.categories inside getCategories from ProductController is :", $scope.categories);
            }
        }, function (error) {
            console.log("some server problem" + error);
        });
    }
    $scope.getCategoriesFromDB();

    $scope.productList = myfactory.productList;
    $scope.values = {};
    let outer_fields = [];
    outer_fields.push("name", "shortdescription", "description", "purchaseprice", "stock", "tax", "mrp", "sellingprice", "brand", "maximumquantitylimit", "category", "status", "subcategory");

    $scope.getProductsListFromDB = function () {
        let promise = myfactory.postAjaxCall("/fetchProductsList", { key: "value" });
        promise.then(function (data) {
            let productListFromDB = data.data.docs;
            console.log("ProductsList is :", productListFromDB);
            productListFromDB.forEach((product) => {
                product = rearrangeFieldsOfProductForDisplay(product);
                myfactory.add(product);
            });
        });
    };
    $scope.getProductsListFromDB();

    $scope.addSubcategories = function () {
        let category = $scope.selectedCategory;
        if (category) {
            $scope.category = $scope.categories.filter((element) => element.category == category)[0];
            $scope.subCategories = $scope.categories.filter((element) => element.category == category)[0].subcategories;
            $scope.subCategoriesKey = $scope.subCategories.filter((element) => element.subcategory == $scope.selectedSubCategory)[0];
            console.log($scope.subCategories, category);
            console.log($scope.subCategoriesKey, $scope.selectedSubCategory);
        }
    }
    $scope.getValue = function (field) {
        $scope.values[field] = document.getElementById(field).value;
    };
    let rearrangeFieldsOfProductForDbStore = function (product) {
        if (product != null) {
            let new_product = {};
            let arr = [];
            for (var propt in product) {
                //alert(propt + ': ' + product[propt]);
                console.log(propt + ': ' + product[propt]);
                let flag = true;
                //console.log(outer_fields.find(outer_fields, propt));
                outer_fields.forEach((value) => {
                    if (propt == value) {
                        new_product[propt] = product[propt];
                        flag = false;
                        console.log("default key.....");
                    }

                });
                if (flag) {
                    let obj = {
                        keyname: propt,
                        keyvalue: product[propt]
                    };
                    arr.push(obj);
                    console.log("Object is : ", obj);
                    console.log("Array is : ", arr);
                }

            }
            new_product.specifications = arr;
            console.log("new Product during changes inside method is : ", new_product);
            return new_product;
        }
    }
    let rearrangeFieldsOfProductForDisplay = function (product) {
        console.log("Inside rearrangeFieldsOfProductForDisplay method ...................");
        if (product != null) {
            let new_product = {};

            //if (product.specifications != null) {
            for (var propt in product) {
                //alert(propt + ': ' + product[propt]);
                new_product[propt] = product[propt];
            }
            delete new_product.specifications;
            product.specifications.forEach((value) => {
                new_product[value.keyname] = value.keyvalue;
                // console.log("ADDED DETAIL SUCCESSFULLY IN OBJECT");
            });
            // console.log("New Product for display inside method is : ", new_product);
            return new_product;
            //}
        }
    }
    $scope.add = function () {
        let itemproduct = new item($scope.values);
        itemproduct.category = $scope.selectedCategory;
        itemproduct.subcategory = $scope.selectedSubCategory;
        console.log("Item product is : ", itemproduct);
        itemproduct = rearrangeFieldsOfProductForDbStore(itemproduct);
        //prduct after changes
        console.log("Product after changes is : ", itemproduct);
        //will add product to db now
        $scope.saveProductToDB(itemproduct);
        console.log("products list array is :", myfactory.productList);
    };
    $scope.edit = function (id) {
        var index = getSelectedIndex(id);
        var product = $scope.productList[index];
        $scope.eid = product.id;
        $scope.eimgurl = product.img;
    };
    $scope.saveEdit = function () {
        var id = $scope.eid;
        var index = getSelectedIndex(id);
    };
    $scope.viewDetails = function (id) {
        var index = getSelectedIndex(id);
        $scope.viewProduct = $scope.productList[index];
    };
    $scope.delete = function (id) {
        var index = getSelectedIndex(id);
        $scope.productList.splice(index, 1);
    };
    function getSelectedIndex(id) {
        for (var i = 0; i < $scope.productList.length; i++)
            if ($scope.productList[i].id == id)
                return i;
        return -1;
    };
    $scope.saveProductToDB = function (itemproduct) {
        let promise = myfactory.postAjaxCall(ADDPRODUCTURL, itemproduct);

        promise.then(function (data) {
            console.log("productcontroller inside promise.then");
            console.log(data);
            if (data.data.result == true) {
                //console.log("Will call register page now with path ");
                console.log("PROduct added successfully : ", data.data);
                //indexFactory.redirectToRegister(SERVERURL + data.data.data.redirectpath);
                itemproduct = rearrangeFieldsOfProductForDisplay(itemproduct);
                myfactory.add(itemproduct);
                //$scope.values = {};
                console.log("products list array inside promise is :", myfactory.productList);

            }
            else if (data.data.result == false) {
                $window.alert("Product could not be added!!!!!");
            }
        }, function (error) {
            console.log("some server problem" + error);
        });


    };
    $scope.removeProductFromDB = function () {

    };
    $scope.updateProductInDB = function () {

    };

});