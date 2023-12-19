
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const locationSchema=new schema({
        name: {type: String},
        city_id: {type: String},
        location_id: {type: Number},
        city: {type: String},
        country_name: {type: String}
})

const locationModel=mongoose.model("location",locationSchema,"locations");

module.exports=locationModel;