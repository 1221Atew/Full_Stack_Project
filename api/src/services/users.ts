import User, { Users } from "../models/Users";

const createUser = async (user: Users): Promise<Users>=>{
    return user.save();
}
const getUserById = async (userId: string): Promise<Users | null>=>{
    const foundUser=  User.findById(userId);
    return foundUser;
}
const findUserByEmail = async (userEmail: string): Promise<Users | null>=>{
    const foundUser=  User.findOne({email: userEmail});
    return foundUser;
}
const updateUser = async (userId: string, update: Partial<Users>): Promise<Users |null>=>{
    return User.findByIdAndUpdate(userId, update);
}
const deleteUser = async (userId: string): Promise<Users | null>=>{
    return User.findByIdAndDelete(userId)
}
export default {createUser, getUserById, findUserByEmail, updateUser,deleteUser}