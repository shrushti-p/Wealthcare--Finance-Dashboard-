import express from "express";
import Product from "../Models/productModel.js";

const router = express.Router();

// Creating API endpoints
router.get("/products", async (req, res) => {
    try
    {
        // Retrieving data from mongoDB database
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(404).json({ messaage : error.message });
    }
});

export default router;
