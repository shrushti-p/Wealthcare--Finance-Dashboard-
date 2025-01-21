import express from "express";
import KPI from "../Models/kpiModel.js";

const router = express.Router();

// Now create some API endpoints.
router.get("/kpis", async (req, res) => {
    try
    {
        // Here write a logic to do data manipulation with database.
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    }
    catch(error)
    {
        res.status(404).json({ message : error.message });
    }
});


export default router;