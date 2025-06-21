let express=require("express");
let path = require("path");
let db=require("../db.js");
let bodyParser=require("body-parser");
require("dotenv").config();
let router=require("./routes/route.js");

let app=express();
app.set("view engine","ejs");
//app.set("views", path.join(__dirname, "../views"));  // Fix: views are in root /miniprojapp/views
//app.use('/js', express.static(path.join(__dirname, 'src/validation')));
app.use(express.static("public")); // ✅ This makes public/js/ajax.js accessible at /js/ajax.js


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/",router);


module.exports=app;