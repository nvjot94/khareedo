const express = require("express");
const mongoose = require("../../db/connection");
const otpModel=require("../../db/schema/clients/otpSave");
const model = require("../../db/schema/clients/clientsSchema");
const adminModel = require("../../db/schema/clients/adminschema");
const passport = require("passport");
var jsSHA = require("jssha");
const companydetailsmodel = require("../../models/companydetailsModel/companydetails");
var bcrypt = require('bcrypt');
var router = express.Router();
const config = require('../../db/config');
const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
const querystring = require('querystring');
const configuration = require("./../../db/config");
let serverpath = configuration.serverurl;
//******************************************************************************************************************** 
//Routing for index page(index.html) and it's spa 
//********************************************************************************************************************
//check website is registered or not and if not registered, then redirect to superuser registration page
router.post("/websitecheck", (request, response) => {
    console.log("Inside router.post /websitecheck method");
    console.log(request.body);
    const checkWebsiteRegistration = require('./../../helper/commonhelper/index/checkWebsiteRegistrationHelper');
    checkWebsiteRegistration(response);
});
//********************************************************************************************************************



//********************************************************************************************************************
//********************************************************************************************************************
//Routing for superuseregistartion page(demo.html) and it's spa 
//********************************************************************************************************************
//check login details of superuser and change password and submit details of superuser in db


router.post("/register", (request, response) => {
    let name = request.body.name;
    let userid = request.body.userid;
    let registrationuserid = request.body.registrationuserid;
    let oldpassword = request.body.oldpassword;
    // let password = request.body.password;
    let password = bcrypt.hashSync(request.body.password, 10);
    let phoneno = request.body.phoneno;
    let dob = request.body.dob;


    // const companydetailsmodel = require("../../models/companydetailsModel/companydetails");
    let companydetailsObject = new companydetailsmodel();
    companydetailsObject.superusersetter(name, userid, password, phoneno, dob, false);

    const updatesuperuser = require('./../../helper/commonhelper/superuserregistration/superuserregistrationhelper');
    updatesuperuser(companydetailsObject, registrationuserid, oldpassword, response);

});


//********************************************************************************************************************
//submit company details of website in db


router.post("/companydetails", (request, response) => {
    console.log("Inside router.post method with request object :")
    console.log(request.body);
    let companyname = request.body.companyname;
    let description = request.body.description;
    let tagline = request.body.tagline;
    let logo = request.body.logo;
    let address = request.body.address;
    let line1 = request.body.line1;
    let city = request.body.city;
    let state = request.body.state;
    let country = request.body.country;
    let zipcode = request.body.zipcode;
    let maplink = "maplink";
    let longitude = request.body.longitude;
    let latitude = request.body.latitude;
    let phoneno = request.body.phoneno;
    let officeno = request.body.officeno;
    let emailid = request.body.emailid;
    let fax = request.body.fax;
    let userid = request.body.userid;
    let password = request.body.password;
    console.log("Inside router.post" + companyname + "" + description + "" + phoneno);
    let companydetailsobject = new companydetailsmodel();
    companydetailsobject.setCompanyDetails(companyname, description, tagline, logo, line1, city, state, country, zipcode, maplink, longitude, latitude, phoneno, officeno, emailid, fax);
    console.log("Inside router.post");
    console.log(companydetailsobject);

    // const adminOperations = require('../../db/crud/admin/adminCrud');
    // adminOperations.companydetails(companydetailsobject, response);

    const companyDetailsUpdate = require('../../helper/commonhelper/superuserregistration/companydetailsupdate');
    companyDetailsUpdate(companydetailsobject, response, userid, password);
});


// router.post("/companydetails", (request, response) => {
//   const companydetails = require("../../models/admin/companydetails");
//   var companyname = request.body.companyname;
//   var description = request.body.description;
//   var tagline = request.body.tagline;
//   var logo = request.body.logo;
//   var line1 = request.body.line1;
//   var line2 = request.body.line2;
//   var city = request.body.city;
//   var state = request.body.state;
//   var country = request.body.country;
//   var zipcode = request.body.zipcode;
//   var longitude = request.body.longitude;
//   var latitude = request.body.latitude;
//   var phoneno = request.body.phoneno;
//   var officeno = request.body.officeno;
//   var emailid = request.body.emailid;
//   var fax = request.body.fax;
//   console.log("Inside router.post" + companyname + "" + description + "" + emailid);
//   var companydetailsobject = new companydetails(companyname, description, tagline, logo, line1, line2, city, state, country, zipcode, longitude, latitude, phoneno, officeno, emailid, fax)
//   console.log("Inside router.post");
//   console.log(companydetailsobject);
// });
//********************************************************************************************************************
//submit financial details of company in db


router.post("/financialdetails", (request, response) => {
    let accountno = request.body.accountno;
    let accounttype = request.body.accounttype;
    let holdername = request.body.holdername;
    let bankname = request.body.bankname;
    let branch = request.body.branch;
    let ifsc = request.body.ifsc;
    let userid = request.body.userid;
    let password = request.body.password;
    let financialdetailsobject = new companydetailsmodel();
    financialdetailsobject.setFinancialDetails(accountno, accounttype, holdername, bankname, branch, ifsc);
    console.log("Inside router.post");
    console.log(financialdetailsobject);
    const updateFinancialDetails = require('../../helper/commonhelper/superuserregistration/financialdetailsupdate');
    updateFinancialDetails(response, financialdetailsobject, userid, password);
});


// router.post("/financialdetails", (request, response) => {
//   const financialdetails = require("../../models/admin/financialdetails");
//   var accountno = request.body.accountno;
//   var accounttype = request.body.accounttype;
//   var holdername = request.body.holdername;
//   var bankname = request.body.bankname;
//   var branch = request.body.branch;
//   var ifsc = request.body.ifsc;
//   var financialdetailsobject = new financialdetails(accountno, accounttype, holdername, bankname, branch, ifsc);
//   console.log("Inside router.post");
//   console.log(financialdetailsobject);
// });
//********************************************************************************************************************
//submit card details of company in db


router.post("/cardDetails", (request, response) => {
    let cardno = request.body.cardno;
    let cardholdername = request.body.cardholdername;
    let cvv = request.body.cvv;
    let cardtype = request.body.cardtype;
    let expirydate = request.body.expirydate;
    let cardprovider = request.body.cardprovider;
    console
    let bank = request.body.bank;
    let branch = request.body.branch;
    let ifsc = request.body.ifsc;
    let userid = request.body.userid;
    let password = request.body.password;
    let cardDetailsObject = new companydetailsmodel();
    cardDetailsObject.setCardDetails(cardno, cardholdername, cvv, cardtype, expirydate, cardprovider, bank, branch, ifsc);
    // const adminOperations = require('../../db/crud/admin/adminCrud');
    // adminOperations.cardDetails(cardDetailsObject, response);
    console.log("Inside router.post");
    console.log(cardDetailsObject);
    const updateCardDetails = require('../../helper/commonhelper/superuserregistration/cardDetailsUpdate');
    updateCardDetails(response, cardDetailsObject, userid, password);

});
//********************************************************************************************************************

// //Image File upload code here for carousel images
router.post('/imageuploadlogo', function (req, res) {


    const imagepath = config.logoimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});


router.post('/imageuploadcarousel', function (req, res) {

    //const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
    // let serverpath = "http://localhost:1234";
    const imagepath = config.carouselimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});


router.post('/finishregistration', function (req, res) {
    console.log("Object is :", req.body);
    let userid = req.body.userid;
    let password = bcrypt.hashSync(req.body.password, 10);
    let carouselimagefilepath = req.body.carouselimagefilepath;
    let finishRegistration = require('../../helper/commonhelper/superuserregistration/finishRegistration');
    finishRegistration(res, userid, password, carouselimagefilepath);
    //res.json({ result: true });
})

//********************************************************************************************************************
//********************************************************************************************************************
//Routing for admindashboard page(admindashboard.html) and it's spa 
//********************************************************************************************************************
router.post('/imageuploadadmins', function (req, res) {

    //const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
    // let serverpath = "http://localhost:1234";
    const imagepath = config.adminsimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});


router.post('/imageuploadproduct', function (req, res) {

    //const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
    // let serverpath = "http://localhost:1234";
    const imagepath = config.productimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});
router.post('/imageuploadcategories', function (req, res) {

    // const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
    // let serverpath = "http://localhost:1234";
    const imagepath = config.categoriesimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});
router.post('/imageuploadsubcategories', function (req, res) {

    // const imageUploadMethod = require('./../../helper/commonhelper/imageupload/imageUploadHelper');
    // let serverpath = "http://localhost:1234";
    const imagepath = config.subcategoriesimagepath;
    imageUploadMethod(router, serverpath, req, res, imagepath);
});

router.post('/saveCategories', function (req, res) {
    let categoriesData = req.body;
    console.log("Inside savecategories with object ", categoriesData);

    const saveCategoriesMethod = require('../../helper/commonhelper/categoriesHelper/saveCategories');
    saveCategoriesMethod(categoriesData, res);
});
router.post('/fetchCategories', function (req, res) {
    console.log("Inside fetchcategories with object ", req.body);

    const fetchCategoriesMethod = require('../../helper/commonhelper/categoriesHelper/fetchCategories');
    fetchCategoriesMethod(res);
});


router.post('/addProduct', function (req, res) {
    let product = req.body;
    console.log("Inside /addProduct with product ", product);
    const addProductMethod = require('../../helper/commonhelper/productsHelper/addProductHelper');
    addProductMethod(product, res);

});

router.post('/fetchProductsList', function (req, res) {
    console.log("Inside /fetchProductsList ");
    const fetchProductsListMethod = require('../../helper/commonhelper/productsHelper/fetchProductsListHelper');
    fetchProductsListMethod(res);

});

//index routes navjot  
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
router.post("/addtocart", (req, res) => {

    console.log("m here in cart POST");
    if (req.isAuthenticated()) {

        let obj ={productId: req.body.productId,subCategory:req.body.subCategory};

        // console.log("m here in cart POST",obj,req.user);
        model.findOne({
            _id: req.user
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                let length=  data.cart.filter((element)=>
              {
                 return element.productId==req.body.productId;
              }).length;
              if(length==0)
              {
                   // console.log("22222222222222222222",data);
                   data.cart = [...data.cart, obj];
                   data.save();
              }
                 
  
              }
        });

    } else

        res.send("please login to add to cart");

});
router.post("/addtofav", (req, res) => {

    console.log("m here in fav POST",req.body);
    if (req.isAuthenticated()) {

        let obj ={productId: req.body.productId,subCategory:req.body.subCategory};

        // console.log("m here in cart POST",obj,req.user);
        model.findOne({
            _id: req.user
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
              let length=  data.wishlist.filter((element)=>
            {
               return element.productId==req.body.productId;
            }).length;
            if(length==0)
            {
                 // console.log("22222222222222222222",data);
                 data.wishlist = [...data.wishlist, obj];
                 data.save();
            }
               

            }
        });

    } else

        res.json({ msg: "please login to add to wishlist" });

});

router.post("/deleteProduct",(req,res)=>
{
    if(req.isAuthenticated())
    {
        model.findOne({_id:req.user},(err,data)=>
    {
        if (err) {
            console.log(err)
        } else if (data) 
        {
            if(req.body.deleteFrom=="wishlist")
            {
                data.wishlist=data.wishlist.filter(element=>
                    {
                        console.log("......wish.......");
                      return  element.productId!=req.body.productId;
                });
                data.save();
            }
           else if(req.body.deleteFrom=="cart")
            {
                data.cart=data.cart.filter(element=>
                    {
                        console.log(".............");
                      return  element.productId!=req.body.productId;
                });
                data.save();
            }
        }
    })
    }
});
router.get("/cartdata", (req, res) => {

    if (req.isAuthenticated()) {

        model.findOne({
            _id: req.user
        }, (err, data) => {

            if (err) {
                console.log(err)
            } else if (data) {
                if (data.cart.length == 0) {
                    res.json({
                        text: "Your Cart is Empty",
                        imageUrl: "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/empty-cart_ee6141.png  "
                    })
                } else
                    res.json(data.cart);
            }

        })
    } else {
        console.log(req.isAuthenticated());
        res.json({
            text: "Your cart is Empty",
            imageUrl: "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/empty-cart_ee6141.png  "
        });
    }
});
router.post("/signup", (req, res) => {
    console.log("i go her at signup", req.body);
    let clients = {
        "phone": req.body.mobilenumber,
        "name": req.body.username,
        "password": bcrypt.hashSync(req.body.password, 10),
        "confirmPw": req.body.pwagain
    };
    if (clients.phone && clients.name && clients.confirmPw && clients.password) {
        model.create(clients, (err) => {
            if (err)
                console.log("ERROR IS", err);
        });

        res.json({status:true});
    } else {
        res.json({msg:"some credential is wrong/empty"});
    }
});



router.post("/login", (req, res) => {

    if (req.body.mobilenumber && req.body.password) {
        model.findOne({
            phone: req.body.mobilenumber
        }, (err, data) => {
            if (err)
                console.log(err);

            else if (!data) {
                adminModel.findOne({
                    phone: req.body.mobilenumber
                }, (err, data) => {
                    if (err)
                        console.log(err);

                    else if (!data) {
                        res.json({ msg: "Username Or password is wrong" });
                    }
                    else if (data.length != 0) {
                        //  console.log("data is", data);

                        if (bcrypt.compareSync(req.body.password, data.password)) {

                            var userId = data._id;
                            req.login(userId, (err) => {
                                res.json({
                                    uservalid: req.isAuthenticated(),
                                    role: "admin"
                                });

                            });

                        }
                        else
                            res.json({ "pw": "password doesnot match" })
                    }


                });
            }
            else if (data.length != 0) {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    var userId = data._id;
                    req.login(userId, (err) => {
                        res.send({
                            uservalid: req.isAuthenticated(),
                            role: "client"
                        });
                    });

                }
                else
                    res.json({ "pw": "password doesnot match" })
            }


        });



    }

});


router.get("/logout", (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        req.session.destroy();

        res.send({
            uservalid: req.isAuthenticated()
        });
    } else {
        res.send({
            uservalid: req.isAuthenticated()
        });
    }
});

router.post("/checkotp", (request, response) => {
    const SendOtp = require('sendotp');
    const sendOtp = new SendOtp(config.authKey);
    if (request.body.number) {
        let generatedOtp = Math.floor(Math.random() * 100000 + Math.random());
        sendOtp.send("91" + request.body.number, "PRIIND", generatedOtp, function (error, data, response) {
            //save code to db;
            console.log("heeeeeey111",data);
       if(data.type=='success')
            {
                otpModel.create({phone:request.body.number,otp:generatedOtp},(err)=>
            {
                if(err)
                console.log(err);
            })
            }
            else if (error)
             console.log(error);
        });


        //mailing code
        // var nodemailer = require('nodemailer');
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     secure: false,
        //     port: 25,
        //     auth: {
        //         user: config.id,
        //         pass: config.pw,
        //         tls: {
        //             rejectUnauthorised: false
        //         }
        //     }
        // });

        // let mailOptions = {
        //     from: config.id,
        //     to: request.body.number, // list of receivers
        //     subject: 'Passqord change email', // Subject line
        //     text: "ONE TIME PASSWORD IS : " + generatedOtp // plain text body
        //     // html body
        // };


        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        //mailing code
    }
});

router.post("/isotpsame",function(req,res)
{
    console.log("i m in here");
    otpModel.findOne({phone:req.body.mobilenumber},(err,data)=>
{   if(err)
    console.log(err);

    else if(data)
    {
        console.log("i m in here at data");
        if(data.otp==req.body.otp)
        {
            res.json({status:true});
        }
        else
        res.json({status:false});
    }

});
});

passport.serializeUser(function (userId, done) {

    done(null, userId);
});
passport.deserializeUser(function (userId, done) {
    done(null, userId);
});



//********************************************************************************************************************
//admindashboard routes
router.post("/signupadmin", (req, res) => {
    console.log("i go her at signupAdmin", req.body);
    let clients = {
        "name": req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync("123", 10),
        empId: req.body.empId,
        designation: req.body.designation,
        salary: req.body.salary,
        phone: req.body.phone,
        address: req.body.address,
        status: req.body.status
    };
    console.log("heyyy", clients);
    if (clients.phone && clients.name && clients.password && clients.empId && clients.designation && clients.salary && clients.address && clients.status) {
        adminModel.create(clients, (err) => {
            if (err)
                console.log("ERROR IS", err);
        });
        res.json("User is added");
    } else {
        res.json("some credential is wrong/empty");
    }
});

router.get("/getadmins", (req, res) => {
    console.log("in get admins");
    adminModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            res.send(data);

        }

    })
});

router.post("/deleteadmin", (req, res) => {
    console.log(req.body.empId);
    adminModel.findOneAndRemove({
        empId: req.body.empId
    }, (err, res) => {
        if (err) {
            console.log(err);
        }

    })
});

router.post("/checkexistence", (req, response) => {

    model.findOne({
        phone: req.body.mobilenumber
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else if (res) {
            response.json({
                "status": "true"
            })
        } else if (!res) {
            adminModel.findOne({
                phone: req.body.mobilenumber
            }, (error, resp) => {
                if (err) {
                    console.log(error);
                } else if (resp) {
                    response.json({
                        "status": "true"
                    });
                } else (!resp)
                {
                    console.log("qwerty");
                    response.json({
                        "status": "false"
                    });
                }
            });
        }



    })
});

router.post("/changepw",(req,res)=>
{
    console.log("im here 1");
    model.findOne({phone:req.body.mobilenumber},(err,data)=>
{
if(err)
console.log(err);

else if(data)
{
    console.log("im here 1");
    data.password=bcrypt.hashSync(req.body.password, 10);
    data.save();
    res.json({status:true});
}
else
res.json({status:true})
});
})






module.exports = router;
