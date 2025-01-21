import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./Routes/kpiRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import transactionRoutes from "./Routes/transactionRoutes.js";
import KPI from "./Models/kpiModel.js";
import { kpis, products, transactions } from "./Data/data.js";
import Product from "./Models/productModel.js";
import Transaction from "./Models/transactionModel.js";

// Configurations
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" }));
app.use(morgan("comman"));

// Routes as a middleware
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes)

const PORT = process.env.PORT || 9000;

// Connection to mongoDB Database using mongoose library
mongoose.connect(process.env.MONGODB_URL)
.then(async () => {
    
    // Save the data into database only one by using following command
    
    /*
         mongoose.connection.db.dropDatabase();
         KPI.insertMany(kpis);
         Product.insertMany(products);
         Transaction.insertMany(transactions);
    */
    
    
    app.listen(PORT, () => {
        console.log("Server & DB connected on : " + PORT);
    })
}).catch((error) => console.log("Error in connection : " + error));