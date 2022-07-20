const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://donhub:test1234@nodetuts.yalha.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});

const itemsSchema = {
    name:String
}

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
    name:"Welcome to The Don Hub Community"
});

const item2 = new Item({
    name:"hit on the + button to add item"
});

const item3 = new Item({
    name:"hit on the checked box to delete item"
});

const defaultItems = [item1,item2,item3]

const listSchema= {
    name:String,
    items:[itemsSchema]
}

const List = mongoose.model("List",listSchema);


app.get("/",(req,res)=>{
    Item.find({},(err,foundItem)=>{
        if(foundItem.length===0){
            Item.insertMany(defaultItems,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved!");
                }
                res.redirect('/');
            })
        }else{
            res.render("index",{listTitle:"Today",newListItems:foundItem.reverse()});
        }
    })
});

app.post("/",(req,res)=>{
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name:itemName
    });
    item.save((err)=>{
        if(!err){
            console.log("Save!");
            res.redirect("/");
        }
    })
});

app.post("/delete",(req,res)=>{
    const checkedbox = req.body.checkbox;

    Item.findByIdAndDelete(checkedbox,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted!");
            res.redirect("/");
        }
    })
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.listen(3000,()=>{
    console.log("App is running on port 3000");
});