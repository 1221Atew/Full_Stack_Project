import mongoose, {Document} from "mongoose";

import { productSchema } from "./Product";
import User from "./Users";

export type Orders = Document & {
    date: Date;
    userId: string;
    productOrder: [];
}

const orderSchema= new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    productOrder:[ {
        type: productSchema
    },]
});

export default mongoose.model<Orders>("Order", orderSchema);