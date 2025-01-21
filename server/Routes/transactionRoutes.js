import express from "express";
import Transaction from "../Models/transactionModel.js";

const router = express.Router();

// GET request for transcations
router.get("/transactions", async (req, res) => {
    
    try
    {
        const transactions = await Transaction.find().limit(50).sort({ createdAt : -1 });
        res.status(200).json(transactions);
    }
    catch(error)
    {
        res.status(404).json({ error : error.message });
    }
});

export default router;