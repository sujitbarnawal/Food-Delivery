import User from "../models/userModel.js";

//Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await User.findById( req.body.userId );
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById( req.body.userId );
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
    }else{
        return res.json({success:false,message:"No item in cart"})
    }
    await User.findByIdAndUpdate(req.body.userId,{cartData})
    return res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await User.findById( req.body.userId );
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
};

export { addToCart, removeFromCart, getCart };
