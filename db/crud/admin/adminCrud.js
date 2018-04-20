const Admin = require("../../schema/companydetails/companydetailsSchema");

var adminOperations = {
    // register(adminObject, response) {
    //     console.log("Inside Register method in adminOperations variable with adminObject : ", adminObject);
    //     Admin.create(adminObject, function (err) {
    //         if (err) {
    //             response.json("Can't Register Some Error occured in DB");
    //             console.log("Can't Register Some Error occured in DB. Error is ", err);
    //         }
    //         else {
    //             console.log("Register done successfully. AdminObject is -->", adminObject);
    //             // response.send("Register Done");
    //             response.json({ registered: true });


    //         }
    //     });
    // },

    // register(object, response) {
    //     console.log("Inside Register.....", object);
    //     Admin.create(object, function (err) {
    //         if (err) {
    //             response.send("Can't Register Error");
    //             console.log("Error is ", err);
    //         }
    //         else {
    //             console.log("Register ", object);
    //             response.json({ result: 'Successfully Registered' });
    //         }
    //     });
    // },
    // update(object, condition, andcondition, orcondition, response, jsonsuccess, jsonfail, jsonerror) {
    //     console.log("Inside Register.....", object);
    //     Admin.update(condition, object, function (err, docs) {
    //         if (err) {
    //             response.json(jsonerror);
    //             console.log("Error is ", jsonerror);
    //         }
    //         else if (docs.nModified > 0) {
    //             console.log("Updated Successfully ", object);
    //             response.json(jsonsuccess);
    //             console.log("Docs : ");
    //             console.log(docs);
    //         }
    //         else {
    //             console.log("Udates were not done ", object);
    //             response.json(jsonfail);
    //             console.log("Docs : ");
    //             console.log(docs);
    //         }
    //     }).and(andcondition);
    //     // .or(orcondition);
    // },


    // /* Company Details************************************/
    // companydetails(adminObject, response) {
    //     console.log("*************Inside companyDetails.....", adminObject);
    //     //response.json({result:'Company Details sent successfully'});
    //     console.log("######################Inside Register.....", adminObject);
    //     //    Admin.create(adminObject,function(err){
    //     //        if(err){
    //     //            response.send("Can't Register Error");
    //     //            console.log("Error is ",err);
    //     //        }
    //     //       else{
    //     //           console.log("Register ",adminObject);
    //     response.json({ result: 'Successfully Registered' });
    //     //       }
    //     //    });

    //     /* Financial Details*********************************** */
    // },
    // financialdetails(adminObject, response) {
    //     console.log("Inside Financial details.....", adminObject);
    //     response.json({ result: 'Financial Details sent successfully' });
    //     //     response.sendFile(URL.url+'/cardDetails.html', { root: "../../../"});
    // },

    // /*Card Details*********************************** */
    // cardDetails(adminObject, response) {
    //     console.log("Inside Financial details.....", adminObject);
    //     response.json({ result: 'Card Details sent successfully' });
    //     //    response.sendFile(URL.url+'/imageupload.html', { root: "../../../"});
    // }



}

module.exports = adminOperations;