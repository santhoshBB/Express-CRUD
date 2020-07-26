const mongoose=require("mongoose");
const schema= mongoose.Schema;


const studentsch= new schema(
    {
        student_id:{
            type:String,
            
        },
        student_name:{
            type:String,
            required:true,
        },
        student_dob:{
            type:String,
            required:true,
        },
        student_skills:{
            type:[""],
             required:true,
        },
        student_email:{
            type:String,
            required:true,
        },
        student_photo: {
            type: [""],
            
          },
          date: {
            type: Date,
            default: Date.now(),
          },
    });

    module.exports=mongoose.model("schv",studentsch);