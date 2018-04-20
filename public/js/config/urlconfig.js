app.constant("DATAURL", "https://raw.githubusercontent.com/nvjot94/jsonData/master/fake.json");
app.constant("MENUURL", "http://localhost:3000/json/menu.json");
app.constant("PRODUCTURL", "https://raw.githubusercontent.com/nvjot94/jsonData/master/mobiles.json");


//krishan
const serverurl = "http://localhost:1234";
localStorage.SERVERURL = serverurl;
app.value("SERVERURL", serverurl);
app.value("REGISTERURL", "/register");
app.value("FINANCIALDETAILSURL", "/financialdetails");
app.value("COMPANYDETAILSURL", "/companydetails");
app.value("CARDDETAILSURL", "/cardDetails")
app.value("WEBSITECHECKURL", "/websitecheck");
app.value("GOOGLEMAPURL", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.863338632153!2d77.2888127439148!3d28.623292668741943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4ae2432f233%3A0x5b32c73d97685357!2sVinod+Nagar%2C+Block+B%2C+Block+D%2C+West+Vinod+Nagar%2C+Delhi%2C+110092!5e0!3m2!1sen!2sin!4v1502618627486");
app.value("CAROUSELURL", "/finishregistration");
app.value("CAROUSELIMAGEUPLOADURL", "/imageuploadcarousel");
localStorage.CAROUSELIMAGEUPLOADURL = "/imageuploadcarousel";

app.value("CHECKOTPURL", serverurl + "/checkotp/");

app.value("ADMINREDIRECT","../../views/admin/admindashboard.html");
app.value("LOGOIMAGEUPLOADURL", "/imageuploadlogo");
localStorage.LOGOIMAGEUPLOADURL = "/imageuploadlogo";


app.value("ADDPRODUCTURL", "/addProduct");
app.value("PRODUCTIMAGEUPLOADURL", "/imageuploadproduct");
localStorage.PRODUCTIMAGEUPLOADURL = "/imageuploadproduct";

app.value("GETCATEGORIESURL", "/fetchCategories");