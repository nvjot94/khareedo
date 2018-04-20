app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        Create_Account: 'Create Account',
        Name: 'Name',
        Email: 'Email',
        Password:'Password',
        ReenterPassword:'Re-enter Password',
        Phoneno:'Phone no',
        DOB:'DOB',
        Photo:'Photo',
        UploadPhoto:'Photo',
        Signature:'Signature',
        UploadSignature:'Signature',
        Submit: 'Submit',
        Reset: 'Reset',
        Login: 'Login'
       
    });
    $translateProvider.translations('en', {
        Create_Account: 'खाता बनाएं',
        Name: 'नाम',
        Email: 'ईमेल',
        Password:'पासवर्ड',
        ReenterPassword:'पासवर्ड फिर से दर्ज करें',
        Phoneno:'फोन नंबर',
        DOB:'जन्म तिथि',
        Photo:'फ़ोटो',
        UploadPhoto:'फोटो अपलोड करें',
        Signature:'हस्ताक्षर',
        UploadSignature:'हस्ताक्षर अपलोड करें',
        Submit: 'सब्मिट',
        Reset: 'रीसेट',
        Login: 'लॉग इन'
    });  $translateProvider.preferredLanguage('hi');
});
app.controller("Ctrl", function ($scope, $translate) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
});







//app.config(function ($translateProvider) {
    //     $translateProvider.translations('en', {
    //         /*register.html--------------*/
    //         Create_Account: 'Create Account',
    //         Name: 'Name',
    //         Userid: 'Email',
    //         RegistrationUserid:'Registration Userid',
    //         OldPassword:'Old Password',
    //         Password:'New Password',
    //         ReenterPassword:'Re-enter Password',
    //         Phoneno:'Phone no',
    //         DOB:'DOB',
    //         Submit: 'Submit',
    //         Reset: 'Reset',
    
    //         /*financialdetails.html-----------------*/
    //         FinancialDetails:'Financial Details',
    //         AccountNo:'Account No',
    //         AccountType:'Account Type',
    //         AccountHolderName:'Account Holder Name',
    //         BankName:'Bank Name',
    //         Branch:'Branch',
    //         IFSCCode:'IFSC Code',
    
    //         /*companydetails----------------*/
    //         CompanyDetails:'Company Details',
    //         NameOfCompany:"Name Of Company",
    //         Description:"Description",
    //         Tagline:'Tagline',
    //         CompanyLogo:'Company Logo',
    //         UploadPhoto:'Upload Photo',
    //         AddressOfCompany:'Address of Company',
    //         AddressLine1:'Street Address',
    //         City:'City',
    //         State:'State',
    //         Country:'Country',
    //         ZipCode:'ZipCode',
    //         Longitude:'Longitude',
    //         Latitude:'Latitude',
    //         Phoneno:'Phone no',
    //         Officeno:'Office no',
    //         Emailid:'Email id',
    //         Fax:'Fax',
    
    //         /*cardDetails.html------------------*/
    //         CardNo:'Card no',
    //         cardHolderName:'Card Holder Name',
    //         CVV:'CVV',
    //         CardType:'Card Type',
    //         ExpiryDate:'Expiry Date',
    //         CardProvider:'Card Provider',
    //         Bank:'Bank',
    //         Branch:'Branch'
    
    //     });
    //     $translateProvider.translations('hi', {
    //        /* register.html------------------*/
    //         Create_Account: 'खाता बनाएं',
    //         Name: 'नाम',
    //         Userid: 'यूज़र आईडी',
    //         RegistrationUserid:'Registration Userid',
    //         OldPassword:'Old Password',
    //         Password:'पासवर्ड',
    //         ReenterPassword:'पासवर्ड फिर से दर्ज करें',
    //         Phoneno:'फोन नंबर',
    //         DOB:'जन्म तिथि',
    //         Submit: 'सब्मिट',
    //         Reset: 'रीसेट',
    
    //       /*financialdetails.html-----------------*/
    //         FinancialDetails:'वित्तीय विवरण',
    //         AccountNo:'खाता क्रमांक',
    //         AccountType:'खाते का प्रकार',
    //         AccountHolderName:'खाताधारक का नाम',
    //         BankName:'बैंक का नाम',
    //         Branch:'शाखा',
    //         IFSCCode:'आईएफएससी कोड',
    
    //         /*companydetails.html-----------------*/
    //         CompanyDetails:' संस्थान के विवरण',
    //         NameOfCompany:"कंपनी का नाम",
    //         Description:"विवरण",
    //         Tagline:'टैगलाइन',
    //         CompanyLogo:'कंपनी का लोगो',
    //         UploadPhoto:'फोटो अपलोड करें',
    //         AddressOfCompany:'Address of Company',
    //         AddressLine1:'Address Line1',
    //         AddressLine2:'Address Line2',
    //         City:'City',
    //         State:'State',
    //         Country:'Country',
    //         ZipCode:'ZipCode',
    //         Longitude:'Longitude',
    //         Latitude:'Latitude',
    //         Phoneno:'Phone no',
    //         Officeno:'Office no',
    //         Emailid:'Email id',
    //         Fax:'Fax',
    
    //         /*cardDetails.html------------------*/
    //         CardNo:'Card no',
    //         CardHolderName:'Card Holder Name',
    //         CVV:'CVV',
    //         CardType:'Card Type',
    //         ExpiryDate:'Expiry Date',
    //         CardProvider:'Card Provider',
    //         Bank:'Bank',
    //         Branch:'Branch'
    //     });  
    //     $translateProvider.preferredLanguage('en');
    // });
    // app.controller("Ctrl", function ($scope, $translate) {
    //     $scope.changeLanguage = function (key) {
    //         $translate.use(key);
    //     };
    // });