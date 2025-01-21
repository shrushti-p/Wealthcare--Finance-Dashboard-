import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;

// Pass entire mongoose object to loadType so, it will attach Currency datatype to it's schemaTypes Object
loadType(mongoose);

export const ProductSchema = new Schema(
    {
        price : {
            type : mongoose.Types.Currency,
            currency : "INR",
            get : (v) => v / 100
        },
        expense : {
            type : mongoose.Types.Currency,
            currency : "INR",
            get : (v) => v / 100
        },
        transactions : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Transaction"
            }
        ]
    }, { timestamps : true, toJSON : { getters : true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;