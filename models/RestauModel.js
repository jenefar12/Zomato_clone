const mongoose=require('mongoose');
const schema=mongoose.Schema;

const ResSchema=new schema({
        name: {type: String},
        city: {type: String},
        location_id: {type: Number},
        city_id: {type: Number},
        locality: {type: String},
        thumb: {type: Array},
        aggregate_rating: {type: Number},
        rating_text: {type: String},
        min_price: {type: Number},
        contact_number: {type: String},
        cuisine_id: {type: Object},
        cuisine: {type: Object},
        image: {type: String},
        mealtype_id: {type: Number}
})

const RestModel=mongoose.model('restaurant',ResSchema,'restaurants');

module.exports=RestModel;