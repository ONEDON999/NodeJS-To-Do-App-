const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/about",(req,res)=>{
    res.render("about");
})

app.listen(3000,()=>{
    console.log("App is running on port 3000");
});