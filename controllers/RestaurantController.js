const MealTypeModel = require('../models/MealType');
const MenuItemModel = require('../models/MenuItemModel');
const RestaurantList=require('../models/RestauModel');

module.exports.getRestaurantList=async(req,res)=>{
    let {loc_id}=req.params;
    let result= await RestaurantList.find({location_id:loc_id},{
        name:1,
        city:1,
        locality:1,
        image:1
    });
    res.send({
        status:true,
        result
    })
}

module.exports.getRestaurantDetailById=async(req,res)=>{
    let {id}=req.params;
    let result= await RestaurantList.findById(id);
    res.send({
        status:true,
        result
    })
}

module.exports.getMealTypeList=async(req,res)=>{
    let result= await MealTypeModel.find();
    res.send({
        status:true,
        result
    })
}

module.exports.getMenuItemByRestaurantId=async(req,res)=>{
    let {r_id}=req.params;
    let result= await MenuItemModel.find({restaurantId: r_id});
    res.send({
        status:true,
        result
    })
}

module.exports.filter = async (req, res) => {
    let { meal_type,location,sort,cuisine_id,cost,cost_values} = req.body;
    let filter = {};
    sort = sort === undefined ? 1 : sort;
  if (location !== undefined) filter["location_id"] = location;
  if (meal_type !== undefined) filter["mealtype_id"] = meal_type;
  if(cuisine_id !== undefined) filter["cuisine_id"] = {$in: cuisine_id};

  

  if(cost === 500){
    filter["min_price"] = { $in: cost_values.filter(ele => ele < cost) };
        
}else if(cost === 1000){
    filter["min_price"] = { $in: cost_values.filter(ele => ele > 500 && ele < 1000) };
};
  
  
  let result = await RestaurantList.find(filter, {
    name: 1,
    city: 1,
    cuisine: 1,
    cuisine_id: 1,
    locality: 1,
    image: 1,
    mealtype_id: 1,
    min_price: 1,
  }).sort({
    min_price: sort
  });
  res.send({
    status: true,
    result,
  });
};