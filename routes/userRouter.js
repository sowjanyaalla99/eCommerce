var express = require('express');
var userrouter = express.Router();
var userService = require('../service/userService');
var resetpwd=require('../service/restingPassowrd');
var userauthentication = require('../configuration/config');
 var products=require('../service/products');

userrouter.post('/tokengeneration', (req,res)=>userauthentication.authen(req, res));
userrouter.post('/insertUserDetails',(req, res) =>userService.userRegistration(req, res));

userrouter.post('/updateUserAddress', async (req, res,next) => {
  let verificationdata = await userauthentication.verification(req,res,next);
  // res.send(verificationdata)
  if(verificationdata.validateddata.userid==req.body.User_Id){
    userService.addAddress(req, res);
  }
  else{
    res.send("You are passing some others token")
  }
});

userrouter.post('/loginAttempts', (req, res) => userService.loginAttempts(req, res));
userrouter.post('/resetpassword',(req,res)=>resetpwd.resettingPassword(req,res));
userrouter.post('/changepassword',(req,res)=>resetpwd.changepassword(req,res));

userrouter.post('/getproducts',(req,res)=>products.getProducts(req,res));
userrouter.post('/orders',(req,res) => products.orders(req,res));

module.exports = userrouter;
