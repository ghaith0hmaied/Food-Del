import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    // Validate request body
    if (!req.body.userId || !req.body.itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    // Retrieve user data
    let userData = await userModel.findById(req.body.userId);

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Add or update item quantity
    let itemId = req.body.itemId;
    userData.cartData[itemId] = userData.cartData[itemId] ? userData.cartData[itemId] + 1 : 1;

    // Update user data with modified cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: userData.cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // Validate request body
    if (!req.body.userId || !req.body.itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    // Retrieve user data
    let userData = await userModel.findById(req.body.userId);

    // Handle missing cartData or item
    if (!userData.cartData || !userData.cartData[req.body.itemId]) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    // Decrement or remove item
    let itemId = req.body.itemId;
    userData.cartData[itemId] -= 1;

    if (userData.cartData[itemId] <= 0) {
      delete userData.cartData[itemId];
    }

    // Update user data with modified cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: userData.cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    // Validate request body
    if (!req.body.userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    // Retrieve user data
    let userData = await userModel.findById(req.body.userId);

    // Handle missing cartData
    if (!userData.cartData) {
      return res.json({ success: true, cartData: {} });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
