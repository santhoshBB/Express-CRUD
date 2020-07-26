const router= require("express").Router();
const mongoose=require("mongoose");
const multer= require("multer");


// importing multerjs
const localStorage=require("../config/multer")
var upload = multer({ storage: localStorage.storage });

// import the schema
require("../model/schema")
const studentSch= mongoose.model("schv");


// get routes

router.get('/home', (req , res) => {
    res.render('home.handlebars');
});

router.get('/signup', (req , res) => {
    res.render('auth/signup.handlebars');
});

router.get('/signin', (req , res) => {
    res.render('auth/signin.handlebars');
});

router.get("/register", (req , res) => {
    res.render('register/add.handlebars');
});

// EDIT
router.get("/edit/:id",(req,res)=>{
    studentSch.findOne({_id:req.params.id}).lean().then((edit)=>{
        res.render("register/edit",{edit});
    }).catch(err=>console.log(err));
   
})


// POST METHOD TO CREATE THE DATA ENTERED INTO DB
router.post("/create",upload.single("student_photo") ,(req,res)=>{
    let {student_id,student_name,student_dob,student_skills,student_email,} = req.body;
    let newStudent= {
        student_id,student_name,
        student_dob,student_skills,student_email,student_photo:req.file,};
    
    // call schema constructor and load newStudent n save in DB 
    // new studentSch(newStudent).save().then().catch(err=>console.log(err))

    new studentSch(newStudent).save().then((data)=>{
        req.flash("success_msg","successfully POSTED")
        res.redirect("/test/home",304,{data:data})

    }).catch(err=>console.log(err))
});

// FETCHING DATA FROM DB
router.get("/allprofiles",(req,res)=>{
    studentSch.find({}).lean().then((dbdata)=>{
        res.render("register/allprofiles",{dbdata});
    }).catch(err=>console.log(err));
});

// fetching single data based on ID
router.get("/details/:id",(req,res)=>{
    studentSch.findOne({_id:req.params.id}).lean().then((detail)=>{
        res.render("register/details",{detail})
    }).catch(err=>console.log(err));
})

//POSTING EDITED OR UPDATED DATA TO DB
router.put("/edit/:id",upload.single("student_photo") ,(req,res)=>{
    studentSch.findOne({_id:req.params.id}).then((update)=>{
        update.student_photo=req.file;
        update.student_id=req.body.student_id;
        update.student_name=req.body.student_name;
        update.student_dob=req.body.student_dob;
        update.student_email=req.body.student_email;
        update.student_skills=req.body.student_skills;
        update.save().then((updated)=>{
            req.flash("success_msg","successfully UPDATED")
            res.redirect("/test/allprofiles",304,{updated})
        }).catch(err=>console.log(err))

       
    }).catch(err=>console.log(err))

});

//DELETE DETAILS
router.delete("/delete/:id",(req,res)=>{
    studentSch.remove({_id:req.params.id}).then(()=>{
        req.flash("success_msg","successfully DELETED")
        res.redirect("/test/allprofiles",304)
    }).catch(err=>console.log(err))
});




module.exports = router;