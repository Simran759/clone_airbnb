const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js");
const Review=require("../models/reviews.js");
const {validatereview,isLoggedIn,isreviewauthor}=require("../middleware.js");
const Listing=require("../models/listing.js");

const reviewcontroller=require("../controllers/reviews.js");
//reviews
//post review route
router.post("/", 
    isLoggedIn,
    validatereview,
    wrapAsync(reviewcontroller.createreview)
);
//delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isreviewauthor,
    wrapAsync(reviewcontroller.destroyreview)
);
module.exports=router;