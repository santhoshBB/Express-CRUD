const express=require("express");
const app= express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose= require("mongoose");
const Handlebars=require("handlebars");
const methodOverride = require("method-override");
const flash=require("connect-flash");
const session=require("express-session");
// importing routes
const improute=require("./routing/routes")


// DATABASE CONNECTIVITY
const mongoURL="mongodb+srv://santhosh:12345678ss$@cluster0-qewoj.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURL,{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
},(err)=>{
    if (err) throw err;
    console.log("database connected");
});



// handlebars helper middlewares /EXPRESSIONS
Handlebars.registerHelper("trimString", function (passedString) {
    var theString = [...passedString].splice(6).join("");
    return new Handlebars.SafeString(theString);
  });


// serve static files
app.use(express.static(__dirname+"/node_modules"));
app.use(express.static(__dirname+"/public"));


// handlebar engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// parse req,res objects
app.use(bodyParser.urlencoded( { extended : true }));
app.use(bodyParser.json());

// express session middleware use (browser npm express-session)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
   
  }))
app.use(flash());
app.use((req,res,next)=>{
res.locals.success_msg=req.flash("success_msg");
next()
})

// method override
app.use(methodOverride("_method"))



// routing
app.get('/', (req , res) => {
    res.render('home.handlebars');
});

// using imported routes
app.use("/test",improute);

app.get("**", (req , res) => {
    res.render('pnf.handlebars');
});


app.listen(8000,(err)=>{
    if (err) throw err;
    console.log("running on 6000");
    
} )