const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const { deleteMany } = require("../models/listing");
main()
    .then((res)=>
    {
        console.log("Connected to MongoDB");
    })
    .catch((err)=>
    {
        console.log("Error connecting to MongoDB");
    });

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
}
const initDB=async()=>
{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>
   ({
    ...obj,owner:"67c85d06bc186b725450195a"
}));
   await Listing.insertMany(initData.data);
   console.log("data was initialised");
}
initDB();
