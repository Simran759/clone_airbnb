const Listing=require("./models/listing");
const Review=require("./models/reviews");

const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
module.exports.isLoggedIn=(req,res,next)=>
{
    if(!req.isAuthenticated())
    {
        //redirectUrl save
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect('/login');
    }
    next();
}
module.exports.savedRedirectUrl=(req,res,next)=>
{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.owneruser=async (req,res,next)=>
{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!res.locals.curruser._id.equals(listing.owner))
        {
           req.flash("error","you are not the owner of this listing");
           return res.redirect(`/listings/${id}`);
        }
        next();
};
module.exports.validateListing=(req,res,next)=>
    {
        let {error}=listingSchema.validate(req.body);
       
        if(error)
        {
            let errmsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errmsg);
        }
        else
        {
            next();
        }
    };
module.exports.validatereview=(req,res,next)=>
        {
            let {error}=reviewSchema.validate(req.body);
           
            if(error)
            {
                let errmsg=error.details.map((el)=>el.message).join(",");
                throw new ExpressError(400,errmsg);
            }
            else
            {
                next();
            }
        };
        module.exports.isreviewauthor=async (req,res,next)=>
            {
                let {id,reviewId}=req.params;
                let review=await Review.findById(reviewId);
                if(!res.locals.curruser._id.equals(review.author))
                    {
                       req.flash("error","you are not the author of this review");
                       return res.redirect(`/listings/${id}/`);
                    }
                    next();
            };