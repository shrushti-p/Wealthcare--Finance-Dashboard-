import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;

// Pass entire mongoose object to loadType so, it will attach Currency datatype to it's schemaTypes Object
loadType(mongoose);

export const TransactionSchema = new Schema(
    {
        buyer : {
            type : String,
            require : true
        },
        amount : {
            type : mongoose.Types.Currency,
            currency : "INR",
            get : (v) => v / 100
        },
        productIds : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product"
            }
        ]
    }, { timestamps : true, toJSON : { getters : true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;