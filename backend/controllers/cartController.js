import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req,res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;
    if (!itemId) {
      return res.json({ success: false, message: "ItemId missing" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }


    let cartData = await userData.cartData || {};
    if(!cartData[itemId]){
      cartData[itemId] = 1;
    }
    else{
      cartData[itemId] += 1;
    }
    
    // save
    await userModel.findByIdAndUpdate(userId,{cartData});
    res.json({success:true,message:"Food Added To Cart"});
  } catch (error) {
      console.log(error);
      res.json({success:false,message: error.message});
  }
}

// remove items from user cart
const removeFromCart = async(req,res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;
    if (!itemId) {
      return res.json({ success: false, message: "ItemId missing" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData;
    if(cartData[itemId]>0){
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId,{cartData});
    res.json({success:true,message:"Removed From Cart"});
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"});
  }
}

// fetch user cart data
const getCart = async(req,res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: "UserId missing" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({success:true,cartData});
  } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"});
  }
}

export {addToCart, removeFromCart, getCart}