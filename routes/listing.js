const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapasync.js");
const {isLoggedIn}=require("../middleware.js");
const {owneruser,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });
//const { index,newroute } = require("../controllers/listing.js");
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    
    wrapAsync(listingController.createlisting)
);

//new route
router.get("/new",
    isLoggedIn,
    listingController.rendernewform
);

router.route("/:id")
.get(wrapAsync(listingController.showlisting))
.put(
    isLoggedIn,
    owneruser,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updatelisting)
)
.delete(
    isLoggedIn,
    owneruser,
    wrapAsync(listingController.destroylisting)
);

 //edit route
router.get("/:id/edit",
    isLoggedIn,
    owneruser,
    wrapAsync(listingController.editlisting)
);

 module.exports=router;