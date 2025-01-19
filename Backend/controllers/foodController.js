import Food from "../models/foodModel.js";
import fs from "fs";



//add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).send({
        success: false,
        message: "All fields are required, including an image.",
      });
    }
    const image_filename = `${req.file.filename}`;
    const food = await new Food({
      name,
      description,
      price,
      image: image_filename,
      category,
    });
    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//list food items from database
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        if (foods.length === 0) {
            return res.json({ success: false, message: "No food items found." });
        }
        res.json({success:true,data:foods});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.json({ success: false, message: "Food ID is required." });
        }

        const food = await Food.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found." });
        }

        
        // Delete the associated image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                return res.json({ success: false, message: err.message });
            }
        });

        // Delete the food item from the database
        await Food.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food item removed successfully." });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export { addFood,listFood,removeFood };
