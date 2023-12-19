
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const menuItemSchema=new schema({
        name: {type: String},
        description: {type: String},
        ingridients: {type: String},
        restaurantId: {type: schema.Types.ObjectId},
        image: {type: String},
        qty: {type: Number},
        price: {type: String}   
})

const MenuItemModel=mongoose.model('menu_item',menuItemSchema,"menu_items")

module.exports=MenuItemModel;