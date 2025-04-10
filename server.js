if(process.env.NODE_ENV!="production")
{
    require('dotenv').config();
    
}



const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError.js");
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const cookieParser=require("cookie-parser");
const util = require("util");
util.isArray = Array.isArray;

const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
// Override util.isArray to use Array.isArray

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/reviews.js");
const usersRouter=require("./routes/user.js");
main()
    .then((res)=>
    {
        console.log("Connected to MongoDB");
    })
    .catch((err)=>
    {
        console.log("Error connecting to MongoDB");
    });

// async function main(){
//     await mongoose.connect("mongodb://localhost:27017/wanderlust");
// }

async function main(){
    await mongoose.connect("mongodb+srv://simran_123:RzL3CiYgNhjvkZ7H@main-database.g5foy4n.mongodb.net/?retryWrites=true&w=majority&appName=main-database");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(cookieParser());


const sessionOptions={
    secret:"mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,  
        httpOnly:true, 
    },
};
app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>
{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error")//for saving in locals
  res.locals.curruser=req.user;
  next();

});


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",usersRouter);
app.all("*",(req,res,next)=>
{
    next(new ExpressError(404 ,"Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("listings/error.ejs",{message});
   // res.status(statusCode).send(message);
});
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});
