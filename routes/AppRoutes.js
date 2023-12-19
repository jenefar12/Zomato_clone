const express=require('express');
const router=express.Router();
const UserController=require("../controllers/UsersController");
const RestaurantController=require("../controllers/RestaurantController");
const PaymentController=require("../controllers/PaymentController");

router.get('/',UserController.homePage);
router.get('/get-location-list',UserController.getLocationList);
router.get('/get-restaurant-list-by-location-id/:loc_id',RestaurantController.getRestaurantList);
router.get('/get-restaurant-details-by-id/:id',RestaurantController.getRestaurantDetailById);
router.get('/get-meal-type-list',RestaurantController.getMealTypeList);
router.get('/get-menu-items-by-restaurant-id/:r_id',RestaurantController.getMenuItemByRestaurantId);

router.post("/filter",RestaurantController.filter);
router.post("/create-user-account",UserController.createUserAccont);
router.post("/user-Login",UserController.userLogin);
router.post("/create-order-id",PaymentController.createOrderId);
router.post("/verify-payment",PaymentController.verifyPayment);

module.exports=router;
