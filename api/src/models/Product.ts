// product model here
import mongoose, {Document} from "mongoose";

export type Products = Document & {
    id:number;
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: number,
    countInStock: number,
    quantity: number
}

export const productSchema= new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number
        },
    countInStock: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1
    }
});

export default mongoose.model<Products>("Product", productSchema);