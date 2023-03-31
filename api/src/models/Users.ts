import mongoose, {Document} from "mongoose";

export type Users = Document & {
    firstName: string;
    lastName: string;
    age: number;
    postCode: string;
    address: string;
    email: string;
    password: string;
}

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    postCode:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
});

export default mongoose.model<Users>("User", userSchema);